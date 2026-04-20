import { NextResponse } from "next/server";

import { getScenarioBySlug } from "@/lib/syns/scenarios";
import { simulateScenario } from "@/lib/syns/engine";

export function GET(_: Request, context: { params: Promise<{ slug: string }> }) {
  return context.params.then(({ slug }) => {
    const scenario = getScenarioBySlug(slug);

    if (!scenario) {
      return NextResponse.json({ error: "Scenario not found." }, { status: 404 });
    }

    return NextResponse.json({
      item: scenario,
      simulation: simulateScenario(scenario)
    });
  });
}
