"use client";

import { useState } from "react";
import { WorldMap } from "@/components/landing/world-map";
import { Onboarding } from "@/components/landing/onboarding";

export default function Home() {
  const [showOnboarding, setShowOnboarding] = useState(false);

  return (
    <>
      <WorldMap onBeginMission={() => setShowOnboarding(true)} />
      {showOnboarding && (
        <Onboarding onClose={() => setShowOnboarding(false)} />
      )}
    </>
  );
}
