import { NextResponse } from "next/server";

import { markets } from "@/lib/mock-data";

export function GET() {
  return NextResponse.json({
    items: markets
  });
}

