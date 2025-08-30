import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { paths } from "@/config/paths";
import AdminLayoutClient from "./AdminLayoutClient";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  if (!session) {
    redirect(paths.auth.signin);
  }

  if (session.user?.role !== "admin") {
    redirect(paths.home);
  }

  return <AdminLayoutClient>{children}</AdminLayoutClient>;
}
