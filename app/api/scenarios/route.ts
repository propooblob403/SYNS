import { NextResponse } from "next/server";

import { listScenarioSnapshots } from "@/lib/syns/engine";

export function GET() {
  return NextResponse.json({
    items: listScenarioSnapshots()
  });
}
