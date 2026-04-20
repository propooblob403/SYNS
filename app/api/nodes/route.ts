import { NextResponse } from "next/server";

import { synapticNodes } from "@/lib/syns/scenarios";

export function GET() {
  return NextResponse.json({
    items: synapticNodes
  });
}
