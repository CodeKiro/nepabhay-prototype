// Email templates with Nepa:Bhay brand colors (red, black, blue) and responsive design

export interface EmailTemplateProps {
  title: string;
  content: string;
  buttonText?: string;
  buttonUrl?: string;
  footerText?: string;
}

// Brand colors based on Nepa:Bhay theme
const BRAND_COLORS = {
  primary: "#2563eb", // Blue
  secondary: "#ef3b2d", // Red
  black: "#0f172a", // Black
  white: "#ffffff",
  gray: {
    50: "#f8fafc",
    100: "#f1f5f9",
    200: "#e2e8f0",
    600: "#64748b",
    700: "#334155",
    900: "#0f172a",
  },
};

// Base email template with responsive design
export const createEmailTemplate = ({
  title,
  content,
  buttonText,
  buttonUrl,
  footerText,
}: EmailTemplateProps): string => {
  return `
    <!DOCTYPE html>
    <html lang="en" xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <meta http-equiv="X-UA-Compatible" content="IE=edge">
      <meta name="x-apple-disable-message-reformatting">
      <title>${title}</title>
      
      <!--[if mso]>
      <noscript>
        <xml>
          <o:OfficeDocumentSettings>
            <o:PixelsPerInch>96</o:PixelsPerInch>
          </o:OfficeDocumentSettings>
        </xml>
      </noscript>
      <![endif]-->
      
      <style>
        /* Reset and base styles */
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }
        
        body, table, td, p, a, li, blockquote {
          -webkit-text-size-adjust: 100%;
          -ms-text-size-adjust: 100%;
        }
        
        table, td {
          mso-table-lspace: 0pt;
          mso-table-rspace: 0pt;
        }
        
        img {
          max-width: 100%;
          height: auto;
          border: 0;
          outline: none;
          text-decoration: none;
          -ms-interpolation-mode: bicubic;
        }
        
        /* Container styles */
        .email-container {
          max-width: 600px;
          margin: 0 auto;
          background-color: ${BRAND_COLORS.white};
          border-radius: 12px;
          overflow: hidden;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        }
        
        /* Header styles */
        .email-header {
          background: linear-gradient(135deg, ${BRAND_COLORS.primary} 0%, ${
    BRAND_COLORS.secondary
  } 100%);
          padding: 40px 30px;
          text-align: center;
          color: ${BRAND_COLORS.white};
        }
        
        .logo {
          font-size: 28px;
          font-weight: bold;
          margin-bottom: 8px;
          letter-spacing: -0.5px;
        }
        
        .logo .nepa {
          color: ${BRAND_COLORS.white};
        }
        
        .logo .bhay {
          color: ${BRAND_COLORS.white};
        }
        
        .tagline {
          font-size: 14px;
          opacity: 0.9;
          margin-bottom: 0;
        }
        
        /* Content styles */
        .email-content {
          padding: 40px 30px;
        }
        
        .content-title {
          font-size: 24px;
          font-weight: bold;
          color: ${BRAND_COLORS.black};
          margin-bottom: 20px;
          line-height: 1.3;
        }
        
        .content-text {
          font-size: 16px;
          line-height: 1.6;
          color: ${BRAND_COLORS.gray[700]};
          margin-bottom: 16px;
        }
        
        .content-text:last-child {
          margin-bottom: 0;
        }
        
        /* Button styles */
        .email-button {
          display: inline-block;
          background: linear-gradient(135deg, ${BRAND_COLORS.primary} 0%, ${
    BRAND_COLORS.secondary
  } 100%);
          color: ${BRAND_COLORS.white} !important;
          text-decoration: none;
          padding: 16px 32px;
          border-radius: 8px;
          font-weight: 600;
          font-size: 16px;
          margin: 25px 0;
          transition: all 0.3s ease;
          box-shadow: 0 4px 12px rgba(37, 99, 235, 0.3);
        }
        
        .email-button:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(37, 99, 235, 0.4);
        }
        
        /* Footer styles */
        .email-footer {
          background-color: ${BRAND_COLORS.gray[50]};
          padding: 30px;
          text-align: center;
          border-top: 1px solid ${BRAND_COLORS.gray[200]};
        }
        
        .footer-text {
          font-size: 14px;
          color: ${BRAND_COLORS.gray[600]};
          line-height: 1.5;
          margin-bottom: 12px;
        }
        
        .footer-links {
          margin: 16px 0;
        }
        
        .footer-link {
          color: ${BRAND_COLORS.primary};
          text-decoration: none;
          font-size: 14px;
          margin: 0 12px;
        }
        
        .footer-link:hover {
          text-decoration: underline;
        }
        
        /* Responsive design */
        @media only screen and (max-width: 600px) {
          .email-container {
            width: 100% !important;
            margin: 0 !important;
            border-radius: 0 !important;
          }
          
          .email-header,
          .email-content,
          .email-footer {
            padding: 20px !important;
          }
          
          .logo {
            font-size: 24px !important;
          }
          
          .content-title {
            font-size: 20px !important;
          }
          
          .content-text {
            font-size: 15px !important;
          }
          
          .email-button {
            display: block !important;
            text-align: center !important;
            padding: 14px 24px !important;
            font-size: 15px !important;
          }
        }
        
        /* Dark mode support */
        @media (prefers-color-scheme: dark) {
          .email-container {
            background-color: ${BRAND_COLORS.gray[900]} !important;
          }
          
          .content-title {
            color: ${BRAND_COLORS.white} !important;
          }
          
          .content-text {
            color: ${BRAND_COLORS.gray[200]} !important;
          }
          
          .email-footer {
            background-color: ${BRAND_COLORS.black} !important;
            border-top-color: ${BRAND_COLORS.gray[700]} !important;
          }
        }
      </style>
    </head>
    
    <body style="margin: 0; padding: 20px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif; background-color: ${
      BRAND_COLORS.gray[100]
    }; line-height: 1.6;">
      
      <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
        <tr>
          <td>
            
            <div class="email-container">
              
              <!-- Header -->
              <div class="email-header">
                <div class="logo">
                  <span class="nepa">Nepa</span><span class="bhay">:Bhay</span>
                </div>
                <p class="tagline">Preserving Heritage, Building Community</p>
              </div>
              
              <!-- Content -->
              <div class="email-content">
                <h1 class="content-title">${title}</h1>
                ${content}
                
                ${
                  buttonText && buttonUrl
                    ? `
                  <div style="text-align: center;">
                    <a href="${buttonUrl}" class="email-button">${buttonText}</a>
                  </div>
                `
                    : ""
                }
              </div>
              
              <!-- Footer -->
              <div class="email-footer">
                <p class="footer-text">
                  ${
                    footerText ||
                    "Thank you for being part of the Nepa:Bhay community!"
                  }
                </p>
                <div class="footer-links">
                  <a href="${
                    process.env.NEXTAUTH_URL || "https://nepabhay.com"
                  }" class="footer-link">Visit Website</a>
                  <a href="${
                    process.env.NEXTAUTH_URL || "https://nepabhay.com"
                  }/legal/privacy" class="footer-link">Privacy Policy</a>
                  <a href="${
                    process.env.NEXTAUTH_URL || "https://nepabhay.com"
                  }/legal/terms" class="footer-link">Terms of Service</a>
                </div>
                <p class="footer-text" style="font-size: 12px; margin-top: 16px; color: ${
                  BRAND_COLORS.gray[600]
                };">
                  Every language tells a story. Help us tell ours.
                </p>
              </div>
              
            </div>
            
          </td>
        </tr>
      </table>
      
    </body>
    </html>
  `;
};

// Email verification template
export const createVerificationEmailTemplate = (
  verificationUrl: string
): string => {
  return createEmailTemplate({
    title: "Verify Your Email Address",
    content: `
      <p class="content-text">
        <strong>लसकुस! (Welcome!)</strong> Thank you for joining Nepa:Bhay, the community dedicated to preserving and learning Nepali languages and culture.
      </p>
      
      <p class="content-text">
        To get started and access all features of Nepa:Bhay, please verify your email address by clicking the button below:
      </p>
      
      <div style="background-color: ${BRAND_COLORS.gray[50]}; padding: 20px; border-radius: 8px; margin: 25px 0;">
        <p style="margin: 0; font-size: 14px; color: ${BRAND_COLORS.gray[600]};">
          <strong>⚡ Quick verification:</strong> This link will expire in 24 hours for your account security.
        </p>
      </div>
      
      <p class="content-text">
        Once verified, you'll be able to read articles, engage with our community, and explore the rich heritage of Nepali culture and languages.
      </p>
      
      <p class="content-text">
        If you didn't create an account with Nepa:Bhay, you can safely ignore this email and no account will be created.
      </p>
    `,
    buttonText: "Verify My Email",
    buttonUrl: verificationUrl,
    footerText:
      "Ready to start your language learning journey? We're excited to have you!",
  });
};

// Unified welcome email template for all new users (both email verification success and OAuth users)
export const createWelcomeEmailTemplate = (
  userName: string,
): string => {
  return createEmailTemplate({
    title: `Welcome to Nepa:Bhay, ${userName}!`,
    content: `
      <p class="content-text">
        <strong>लसकुस! (Welcome!)</strong> We're thrilled to have you join our vibrant community dedicated to preserving and celebrating Nepali languages and culture.
      </p>
      
      <p class="content-text">
        You're now part of a movement that keeps our beautiful heritage alive for future generations. Every story shared, every lesson learned, and every connection made helps preserve the rich tapestry of our culture.
      </p>
      
      <div style="background-color: ${BRAND_COLORS.gray[50]}; padding: 20px; border-radius: 8px; margin: 25px 0;">
        <h3 style="margin: 0 0 15px 0; color: ${BRAND_COLORS.black}; font-size: 18px;">🚀 Your Journey Starts Here:</h3>
        <ul style="margin: 0; padding-left: 20px; color: ${BRAND_COLORS.gray[700]};">
          <li style="margin-bottom: 8px;"><strong>📚 Read Articles</strong> - Discover fascinating stories, traditions, and language insights</li>
          <li style="margin-bottom: 8px;"><strong>🎓 Interactive Lessons</strong> - Coming soon - structured learning experiences</li>
          <li style="margin-bottom: 8px;"><strong>🧠 Test Your Knowledge</strong> - Coming soon - engaging quizzes and challenges</li>
          <li style="margin-bottom: 0;"><strong>🤝 Join the Community</strong> - Connect, contribute, and learn together</li>
        </ul>
      </div>
      
      <p class="content-text">
        Ready to explore? Start your journey today and discover the stories that make our heritage unique.
      </p>
      
      <p class="content-text">
        Thank you for helping us preserve and celebrate our heritage together!
      </p>
    `,
    buttonText: "Start Exploring",
    buttonUrl: process.env.NEXTAUTH_URL || "https://nepabhay.com",
    footerText: "Every language tells a story. Help us tell ours.",
  });
};

// Password reset email template
export const createPasswordResetEmailTemplate = (resetUrl: string): string => {
  return createEmailTemplate({
    title: "Reset Your Password",
    content: `
      <p class="content-text">
        We received a request to reset the password for your Nepa:Bhay account.
      </p>
      
      <p class="content-text">
        If you requested this password reset, please click the button below to create a new password:
      </p>
      
      <div style="background-color: ${BRAND_COLORS.gray[50]}; padding: 20px; border-radius: 8px; margin: 25px 0;">
        <h3 style="margin: 0 0 10px 0; color: ${BRAND_COLORS.black}; font-size: 16px;">🔒 Important Security Information:</h3>
        <ul style="margin: 0; padding-left: 20px; color: ${BRAND_COLORS.gray[700]}; font-size: 14px;">
          <li style="margin-bottom: 5px;">This reset link will expire in <strong>1 hour</strong> for security</li>
          <li style="margin-bottom: 5px;">If you didn't request this reset, you can safely ignore this email</li>
          <li style="margin-bottom: 0;">Your current password will remain unchanged until you complete the reset</li>
        </ul>
      </div>
      
      <p class="content-text">
        For your security, this link can only be used once. If you need another reset link, please visit our forgot password page again.
      </p>
    `,
    buttonText: "Reset My Password",
    buttonUrl: resetUrl,
    footerText:
      "Need help? Contact our support team if you continue to have issues.",
  });
};

// Password reset success confirmation template
export const createPasswordResetSuccessTemplate = (): string => {
  return createEmailTemplate({
    title: "Password Reset Successful!",
    content: `
      <div style="text-align: center; margin: 20px 0;">
        <div style="display: inline-block; background-color: #10b981; color: white; padding: 12px 20px; border-radius: 50px; font-size: 16px; font-weight: 600;">
          ✅ Password Updated Successfully!
        </div>
      </div>
      
      <p class="content-text">
        Your Nepa:Bhay account password has been successfully updated. You can now sign in with your new password.
      </p>
      
      <div style="background-color: ${BRAND_COLORS.gray[50]}; padding: 20px; border-radius: 8px; margin: 25px 0;">
        <h3 style="margin: 0 0 10px 0; color: ${BRAND_COLORS.black}; font-size: 16px;">🛡️ Security Tips:</h3>
        <ul style="margin: 0; padding-left: 20px; color: ${BRAND_COLORS.gray[700]}; font-size: 14px;">
          <li style="margin-bottom: 5px;">Keep your password secure and don't share it with anyone</li>
          <li style="margin-bottom: 5px;">Use a unique password that you don't use elsewhere</li>
          <li style="margin-bottom: 0;">Consider using a password manager for better security</li>
        </ul>
      </div>
      
      <p class="content-text">
        If you didn't make this change or have concerns about your account security, please contact our support team immediately.
      </p>
      
      <p class="content-text">
        Thank you for being part of the Nepa:Bhay community!
      </p>
    `,
    buttonText: "Sign In to Your Account",
    buttonUrl: `${
      process.env.NEXTAUTH_URL || "https://nepabhay.com"
    }/auth/signin`,
    footerText: "Your account security is important to us.",
  });
};

// Account deactivation success template
export const createAccountDeactivationSuccessTemplate = (
  userName: string
): string => {
  return createEmailTemplate({
    title: "Account Deactivated Successfully",
    content: `
      <p class="content-text">
        Dear <strong>${userName}</strong>,
      </p>
      
      <p class="content-text">
        Your Nepa:Bhay account has been successfully deactivated as requested.
      </p>
      
      <div style="background-color: ${BRAND_COLORS.gray[50]}; padding: 20px; border-radius: 8px; margin: 25px 0;">
        <h3 style="margin: 0 0 15px 0; color: ${BRAND_COLORS.black}; font-size: 18px;">What this means:</h3>
        <ul style="margin: 0; padding-left: 20px; color: ${BRAND_COLORS.gray[700]};">
          <li style="margin-bottom: 8px;">Your account is temporarily suspended</li>
          <li style="margin-bottom: 8px;">Your data is safely preserved</li>
          <li style="margin-bottom: 8px;">You can reactivate anytime by signing in</li>
          <li style="margin-bottom: 0;">No content or progress will be lost</li>
        </ul>
      </div>
      
      <p class="content-text">
        To reactivate your account, simply sign in with your credentials at any time. Your account will be automatically reactivated upon successful login.
      </p>
      
      <p class="content-text">
        If you need assistance or have questions, please contact our support team.
      </p>
      
      <p class="content-text">
        Thank you for being part of our community. We hope to see you back soon!
      </p>
    `,
    buttonText: "Reactivate Account",
    buttonUrl: `${
      process.env.NEXTAUTH_URL || "https://nepabhay.com"
    }/auth/signin`,
    footerText: "We're always here when you're ready to return.",
  });
};

// Account deletion scheduled template
export const createAccountDeletionScheduledTemplate = (
  userName: string,
  deletionDate: Date
): string => {
  const formattedDate = deletionDate.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return createEmailTemplate({
    title: "Account Deletion Scheduled",
    content: `
      <p class="content-text">
        Dear <strong>${userName}</strong>,
      </p>
      
      <p class="content-text">
        We've received your request to delete your Nepa:Bhay account.
      </p>
      
      <div style="background-color: #fef3c7; border-left: 4px solid #f59e0b; padding: 20px; margin: 25px 0;">
        <h3 style="margin: 0 0 10px 0; color: #92400e; font-size: 16px;">⚠️ Your account is scheduled for permanent deletion on:</h3>
        <p style="margin: 0; font-size: 18px; font-weight: 600; color: #92400e;">${formattedDate}</p>
      </div>
      
      <div style="background-color: ${BRAND_COLORS.gray[50]}; padding: 20px; border-radius: 8px; margin: 25px 0;">
        <h3 style="margin: 0 0 15px 0; color: ${BRAND_COLORS.black}; font-size: 18px;">Important Information:</h3>
        <ul style="margin: 0; padding-left: 20px; color: ${BRAND_COLORS.gray[700]};">
          <li style="margin-bottom: 8px;">You have until <strong>${formattedDate}</strong> to cancel this request</li>
          <li style="margin-bottom: 8px;">After deletion, all your data will be <strong>permanently removed</strong></li>
          <li style="margin-bottom: 8px;">This action <strong>cannot be undone</strong> after the deletion date</li>
          <li style="margin-bottom: 0;">You can cancel by signing into your account anytime before deletion</li>
        </ul>
      </div>
      
      <div style="background-color: #dbeafe; padding: 20px; border-radius: 8px; margin: 25px 0;">
        <h3 style="margin: 0 0 10px 0; color: ${BRAND_COLORS.primary}; font-size: 16px;">To cancel this deletion request:</h3>
        <ol style="margin: 0; padding-left: 20px; color: ${BRAND_COLORS.gray[700]};">
          <li style="margin-bottom: 5px;">Sign in to your account</li>
          <li style="margin-bottom: 5px;">Go to your profile settings</li>
          <li style="margin-bottom: 0;">Click "Cancel Deletion Request"</li>
        </ol>
      </div>
      
      <p class="content-text">
        If you need assistance, please contact our support team immediately.
      </p>
      
      <p class="content-text">
        We're sad to see you go and hope you'll reconsider. The Nepa:Bhay community won't be the same without you.
      </p>
    `,
    buttonText: "Cancel Deletion",
    buttonUrl: `${process.env.NEXTAUTH_URL || "https://nepabhay.com"}/profile`,
    footerText: "We hope you'll change your mind and stay with us.",
  });
};
