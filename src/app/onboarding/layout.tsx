// src/app/(onboarding)/layout.tsx
import { ReactNode } from "react";
import Template from "../template";

export default function OnboardingLayout({
  children,
}: {
  children: ReactNode;
}) {
  return <>{children}</>;
}
