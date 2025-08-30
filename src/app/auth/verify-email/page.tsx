"use client";

import { Suspense } from "react";
import { Card, CardHeader, CardTitle } from "@/components/ui/Card";
import { Loader2 } from "lucide-react";
import { VerifyEmailForm } from "./VerifyEmailForm";

export default function VerifyEmailPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-50 via-white to-gray-50">
          <div className="max-w-md w-full">
            <Card className="shadow-lg">
              <CardHeader className="text-center p-4 sm:p-6">
                <div className="mx-auto w-14 h-14 sm:w-16 sm:h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                  <Loader2 className="w-6 h-6 sm:w-8 sm:h-8 text-blue-600 animate-spin" />
                </div>
                <CardTitle className="text-lg sm:text-xl">Loading...</CardTitle>
              </CardHeader>
            </Card>
          </div>
        </div>
      }
    >
      <VerifyEmailForm />
    </Suspense>
  );
}
