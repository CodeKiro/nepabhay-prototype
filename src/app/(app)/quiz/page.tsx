import { Metadata } from "next";
import { ComingSoon } from "@/components/ui/ComingSoon";

export const metadata: Metadata = {
  title: "Quiz - Nepa:Bhay",
  description: "Test your Newa language knowledge with interactive quizzes",
};

export default function QuizPage() {
  const features = [
    "Adaptive questions that evolve with your learning level",
    "Real-time feedback with detailed explanations provided",
    "Gamified experience with achievements & progress tracking",
  ];

  return (
    <ComingSoon
      title="Quiz"
      description="Test your Newa language knowledge with fun and interactive quizzes that adapt to your learning pace. Challenge yourself and track your progress with our intelligent assessment system."
      features={features}
      illustration="/stickers/playingkids.webp"
      primaryColor="red"
      imageSize="normal"
    />
  );
}
