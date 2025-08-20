
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
  const dancers = await prisma.dancer.findMany();

  return NextResponse.json(dancers.map((dancer) => dancer.name));
}
