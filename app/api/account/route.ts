import { NextResponse } from "next/server";

import { initialDemoSession } from "@/lib/mock-data";

export function GET() {
  return NextResponse.json(initialDemoSession);
}
