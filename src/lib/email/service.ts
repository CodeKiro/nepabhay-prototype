import nodemailer from "nodemailer";
import {
  createVerificationEmailTemplate,
  createWelcomeEmailTemplate,
  createPasswordResetEmailTemplate,
  createPasswordResetSuccessTemplate,
  createAccountDeactivationSuccessTemplate,
  createAccountDeletionScheduledTemplate,
} from "./templates";

export interface EmailOptions {
  to: string;
  subject: string;
  html?: string;
  text?: string;
}

class EmailService {
  private transporter: nodemailer.Transporter | null = null;

  private getTransporter(): nodemailer.Transporter {
    if (!this.transporter) {
      // Debug: Log configuration being used (remove this in production)
      console.log(
        "🔧 EmailService - Creating transporter with Gmail configuration:"
      );
      console.log(`   MAIL_HOST: ${process.env.MAIL_HOST}`);
      console.log(`   MAIL_PORT: ${process.env.MAIL_PORT}`);
      console.log(`   MAIL_USER: ${process.env.MAIL_USER}`);
      console.log(`   MAIL_FROM: ${process.env.MAIL_FROM}`);
      console.log(
        `   MAIL_PASSWORD: ${
          process.env.MAIL_PASSWORD ? "***SET***" : "NOT SET"
        }`
      );

      this.transporter = nodemailer.createTransport({
        service: "gmail", // Use Gmail service for better compatibility
        host: process.env.MAIL_HOST,
        port: parseInt(process.env.MAIL_PORT || "587"),
        secure: false, // true for 465, false for other ports
        auth: {
          user: process.env.MAIL_USER,
          pass: process.env.MAIL_PASSWORD,
        },
        tls: {
          rejectUnauthorized: false,
        },
      });
    }
    return this.transporter!;
  }

  async sendEmail({ to, subject, html, text }: EmailOptions): Promise<boolean> {
    try {
      const transporter = this.getTransporter();

      const mailOptions = {
        from: {
          name: "Nepa:Bhay",
          address: process.env.MAIL_FROM!,
        },
        to,
        subject,
        html,
        text,
      };

      const result = await transporter.sendMail(mailOptions);
      console.log("Email sent successfully:", result.messageId);
      return true;
    } catch (error) {
      console.error("Email sending failed:", error);
      return false;
    }
  }

  async sendVerificationEmail(
    email: string,
    token: string,
    baseUrl?: string
  ): Promise<boolean> {
    const { paths } = await import("@/config/paths");
    const { getFallbackBaseUrl } = await import("@/lib/utils/url");

    // Use provided baseUrl or fallback to environment
    const verificationUrl = baseUrl
      ? `${baseUrl}${paths.auth.verifyEmail}?token=${token}`
      : `${getFallbackBaseUrl()}${paths.auth.verifyEmail}?token=${token}`;

    const html = createVerificationEmailTemplate(verificationUrl);

    const text = `
      Welcome to Nepa:Bhay!
      
      लसकुस! (Welcome!) Thank you for joining our community dedicated to preserving and learning Nepali languages and culture.
      
      To get started and access all features of Nepa:Bhay, please verify your email address by visiting this link:
      ${verificationUrl}
      
      This verification link will expire in 24 hours for your account security.
      
      If you didn't create an account with Nepa:Bhay, you can safely ignore this email and no account will be created.
      
      Ready to start your language learning journey?
      
      The Nepa:Bhay Team
    `;

    return this.sendEmail({
      to: email,
      subject: "Welcome to Nepa:Bhay - Verify Your Email",
      html,
      text,
    });
  }

  async sendPasswordResetEmail(
    email: string,
    token: string,
    baseUrl?: string
  ): Promise<boolean> {
    const { paths } = await import("@/config/paths");
    const { getFallbackBaseUrl } = await import("@/lib/utils/url");

    // Use provided baseUrl or fallback to environment
    const resetUrl = baseUrl
      ? `${baseUrl}${paths.auth.resetPassword}?token=${token}`
      : `${getFallbackBaseUrl()}${paths.auth.resetPassword}?token=${token}`;

    const html = createPasswordResetEmailTemplate(resetUrl);

    const text = `
      Password Reset Request - Nepa:Bhay
      
      We received a request to reset the password for your Nepa:Bhay account.
      
      If you requested this password reset, please visit this link to create a new password:
      ${resetUrl}
      
      Important Security Information:
      • This reset link will expire in 1 hour for security
      • If you didn't request this reset, you can safely ignore this email
      • Your current password will remain unchanged until you complete the reset
      
      For your security, this link can only be used once. If you need another reset link, please visit our forgot password page again.
      
      Need help? Contact our support team.
      
      The Nepa:Bhay Team
    `;

    return this.sendEmail({
      to: email,
      subject: "Reset Your Password - Nepa:Bhay",
      html,
      text,
    });
  }

  // Unified welcome email for both email verified users and OAuth users
  async sendWelcomeEmail(
    email: string,
    userName: string
  ): Promise<boolean> {
    const html = createWelcomeEmailTemplate(userName);

    const text = `
      Welcome to Nepa:Bhay, ${userName}!
      
      लसकुस! (Welcome!) We're thrilled to have you join our vibrant community dedicated to preserving and celebrating Nepali languages and culture.
      
      You're now part of a movement that keeps our beautiful heritage alive for future generations. Every story shared, every lesson learned, and every connection made helps preserve the rich tapestry of our culture.
      
      🚀 Your Journey Starts Here:
      📚 Read Articles - Discover fascinating stories, traditions, and language insights
      🎓 Interactive Lessons - Coming soon - structured learning experiences
      🧠 Test Your Knowledge - Coming soon - engaging quizzes and challenges
      🤝 Join the Community - Connect, contribute, and learn together
      
      Ready to explore? Start your journey: ${
        process.env.NEXTAUTH_URL || "https://nepabhay.com"
      }
      
      Thank you for helping us preserve and celebrate our heritage together!
      
      The Nepa:Bhay Team
      
      Every language tells a story. Help us tell ours.
    `;

    return this.sendEmail({
      to: email,
      subject: `Welcome to Nepa:Bhay, ${userName}!`,
      html,
      text,
    });
  }

  async sendAccountDeactivationSuccessEmail(
    email: string,
    userName: string
  ): Promise<boolean> {
    const html = createAccountDeactivationSuccessTemplate(userName);

    const text = `
      Account Deactivated Successfully - Nepa:Bhay
      
      Dear ${userName},
      
      Your Nepa:Bhay account has been successfully deactivated as requested.
      
      What this means:
      • Your account is temporarily suspended
      • Your data is safely preserved
      • You can reactivate anytime by signing in
      • No content or progress will be lost
      
      To reactivate your account, simply sign in with your credentials at any time. Your account will be automatically reactivated upon successful login.
      
      If you need assistance or have questions, please contact our support team.
      
      Thank you for being part of our community.
      
      The Nepa:Bhay Team
    `;

    return this.sendEmail({
      to: email,
      subject: "Account Deactivated Successfully - Nepa:Bhay",
      html,
      text,
    });
  }

  async sendAccountDeletionScheduledEmail(
    email: string,
    userName: string,
    deletionDate: Date
  ): Promise<boolean> {
    const html = createAccountDeletionScheduledTemplate(userName, deletionDate);

    const text = `
      Account Deletion Scheduled - Nepa:Bhay
      
      Dear ${userName},
      
      We've received your request to delete your Nepa:Bhay account.
      
      Your account is scheduled for permanent deletion on ${deletionDate.toLocaleDateString()}.
      
      Important Information:
      • You have until ${deletionDate.toLocaleDateString()} to cancel this request
      • After deletion, all your data will be permanently removed
      • This action cannot be undone after the deletion date
      • You can cancel by signing into your account anytime before deletion
      
      To cancel this deletion request:
      1. Sign in to your account
      2. Go to your profile settings
      3. Click "Cancel Deletion Request"
      
      If you need assistance, please contact our support team immediately.
      
      We're sad to see you go and hope you'll reconsider.
      
      The Nepa:Bhay Team
    `;

    return this.sendEmail({
      to: email,
      subject: "Account Deletion Scheduled - Action Required",
      html,
      text,
    });
  }

  async sendPasswordResetSuccessEmail(email: string): Promise<boolean> {
    const html = createPasswordResetSuccessTemplate();

    const text = `
      Password Reset Successful - Nepa:Bhay
      
      ✅ Password Updated Successfully!
      
      Your Nepa:Bhay account password has been successfully updated. You can now sign in with your new password.
      
      Security Tips:
      • Keep your password secure and don't share it with anyone
      • Use a unique password that you don't use elsewhere
      • Consider using a password manager for better security
      
      If you didn't make this change or have concerns about your account security, please contact our support team immediately.
      
      Thank you for being part of the Nepa:Bhay community!
      
      Sign in to your account: ${
        process.env.NEXTAUTH_URL || "https://nepabhay.com"
      }/auth/signin
      
      Your account security is important to us.
      
      The Nepa:Bhay Team
    `;

    return this.sendEmail({
      to: email,
      subject: "Password Reset Successful - Nepa:Bhay",
      html,
      text,
    });
  }

  async testConnection(): Promise<boolean> {
    try {
      const transporter = this.getTransporter();
      await transporter.verify();
      console.log("Email service connection successful");
      return true;
    } catch (error) {
      console.error("Email service connection failed:", error);
      return false;
    }
  }
}

export const emailService = new EmailService();
