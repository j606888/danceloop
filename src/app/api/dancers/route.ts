import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
  const dancers = await prisma.dancer.findMany();

  return NextResponse.json(dancers);
}

export async function POST(request: Request) {
  const { name, gender, isTeacher } = await request.json();

  const dancer = await prisma.dancer.create({
    data: { name, gender, isTeacher },
  });

  return NextResponse.json(dancer);
}
