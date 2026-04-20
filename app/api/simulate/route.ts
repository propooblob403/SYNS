import { NextRequest, NextResponse } from "next/server";

import { getScenarioBySlug } from "@/lib/syns/scenarios";
import { simulateScenario } from "@/lib/syns/engine";

export function GET(request: NextRequest) {
  const scenarioSlug = request.nextUrl.searchParams.get("scenario") ?? "narrative-ignition";
  const maxSignalsParam = request.nextUrl.searchParams.get("maxSignals");
  const maxSignals = maxSignalsParam ? Number(maxSignalsParam) : undefined;
  const scenario = getScenarioBySlug(scenarioSlug);

  if (!scenario) {
    return NextResponse.json({ error: "Scenario not found." }, { status: 404 });
  }

  return NextResponse.json({
    scenario: scenario.slug,
    maxSignals: typeof maxSignals === "number" && Number.isFinite(maxSignals) ? maxSignals : null,
    result: simulateScenario(scenario, {
      maxSignals: typeof maxSignals === "number" && Number.isFinite(maxSignals) ? maxSignals : undefined
    })
  });
}
