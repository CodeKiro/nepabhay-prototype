import { NextRequest } from "next/server";
import { auth } from "@/lib/auth";
import { connectDB } from "@/lib/database";
import { User } from "@/lib/database/models";
import { ApiResponseBuilder } from "@/lib/api";
import { emailService } from "@/lib/email/service";
import { z } from "zod";

const DeleteAccountSchema = z.object({
  reason: z.string().optional(),
  confirmDelete: z.boolean().refine((val) => val === true, {
    message: "Please confirm account deletion",
  }),
});

export async function POST(request: NextRequest) {
  try {
    const session = await auth();

    if (!session) {
      return ApiResponseBuilder.unauthorized("Authentication required");
    }

    const body = await request.json();
    const validatedData = DeleteAccountSchema.parse(body);

    await connectDB();

    const user = await User.findById(session.user.id);

    if (!user) {
      return ApiResponseBuilder.notFound("User not found");
    }

    // If user is admin, check if there are other admins
    if (user.role === "admin") {
      const adminCount = await User.countDocuments({ role: "admin" });
      if (adminCount <= 1) {
        return ApiResponseBuilder.error(
          "Cannot delete account. You are the last admin user.",
          400
        );
      }
    }

    // For immediate deletion, remove the user
    if (validatedData.confirmDelete) {
      await User.findByIdAndDelete(session.user.id);
      return ApiResponseBuilder.success(
        { message: "Account deleted successfully" },
        "Account deleted successfully"
      );
    }

    // Otherwise, mark for deletion (soft delete)
    const deletionRequestedAt = new Date();
    const deletionDate = new Date(deletionRequestedAt);
    deletionDate.setDate(deletionDate.getDate() + 30); // 30 days from now

    await User.findByIdAndUpdate(session.user.id, {
      deletionRequested: true,
      deletionReason: validatedData.reason,
      deletionRequestedAt,
    });

    // Send deletion scheduled email
    try {
      await emailService.sendAccountDeletionScheduledEmail(
        user.email,
        user.name || "User",
        deletionDate
      );
    } catch (emailError) {
      console.error("Failed to send deletion scheduled email:", emailError);
      // Don't fail the request if email sending fails
    }

    return ApiResponseBuilder.success(
      { message: "Account marked for deletion" },
      "Account deletion requested"
    );
  } catch (error) {
    if (error instanceof z.ZodError) {
      return ApiResponseBuilder.error("Validation failed", 400);
    }

    console.error("Delete account error:", error);
    return ApiResponseBuilder.serverError("Failed to process account deletion");
  }
}
