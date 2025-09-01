import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import prisma from "@/lib/prisma";
import { createAuthSession } from "@/lib/auth";

export async function POST(request: Request) {
  const { name, email, password} = await request.json()

  const existingUser = await prisma.user.findUnique({
    where: { email },
  })
  if (existingUser) {
    return NextResponse.json({ error: "User already exists" }, { status: 400 });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await prisma.user.create({
    data: {
      name,
      email,
      encryptedPassword: hashedPassword,
    },
  })

  await createAuthSession(user.id);

  return NextResponse.json({ success: true });
}