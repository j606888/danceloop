import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import prisma from "@/lib/prisma";
import { createAuthSession } from "@/lib/auth";

export async function POST(request: Request) {
  const { email, password } = await request.json();

  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 400 });
  }

  const isValidPassword = await bcrypt.compare(
    password,
    user.encryptedPassword
  );
  if (!isValidPassword) {
    return NextResponse.json({ error: "Invalid password" }, { status: 400 });
  }

  await createAuthSession(user.id);

  return NextResponse.json({ success: true });
}
