"use client";

import { useState } from "react";
import { WorldMap } from "@/components/landing/world-map";
import { Onboarding } from "@/components/landing/onboarding";
import { Assessment } from "@/components/landing/assessment";

export default function Home() {
  const [screen, setScreen] = useState<"map" | "onboarding" | "assessment">("map");

  return (
    <>
      <WorldMap onBeginMission={() => setScreen("onboarding")} />
      {screen === "onboarding" && (
        <Onboarding
          onClose={() => setScreen("map")}
          onComplete={() => setScreen("assessment")}
        />
      )}
      {screen === "assessment" && <Assessment />}
    </>
  );
}
