"use client";

import { Suspense } from "react";
import { Card, CardHeader, CardTitle } from "@/components/ui/Card";
import { ResetPasswordForm } from "./ResetPasswordForm";

export default function ResetPasswordPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-50 via-white to-gray-50">
          <div className="max-w-md w-full">
            <Card className="shadow-lg">
              <CardHeader className="p-4 sm:p-6">
                <CardTitle className="text-center text-lg sm:text-xl">
                  Loading...
                </CardTitle>
              </CardHeader>
            </Card>
          </div>
        </div>
      }
    >
      <ResetPasswordForm />
    </Suspense>
  );
}
