import { Metadata } from "next";
import { ComingSoon } from "@/components/ui/ComingSoon";

export const metadata: Metadata = {
  title: "Lessons - Nepa:Bhay",
  description:
    "Interactive Newa language lessons to help you learn Nepal Bhasa",
};

export default function LessonsPage() {
  const features = [
    "Progressive difficulty levels with structured learning paths",
    "Interactive exercises with native speaker audio guides",
    "Cultural context integration for deeper understanding",
  ];

  return (
    <ComingSoon
      title="Lessons"
      description="Master the beautiful Newa language with our comprehensive interactive lessons designed for learners of all levels. Experience immersive learning with cultural context and native pronunciation."
      features={features}
      illustration="/stickers/schoolkids.webp"
      primaryColor="blue"
    />
  );
}
