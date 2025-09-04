import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { createAuthSession } from "@/lib/auth";
import cryptoRandomString from "crypto-random-string";

const GOOGLE_USER_INFO_URL = "https://www.googleapis.com/oauth2/v1/userinfo";

export async function POST(request: Request) {
  const { access_token } = await request.json();
  const response = await fetch(GOOGLE_USER_INFO_URL, {
    headers: { Authorization: `Bearer ${access_token}` },
  });

  const googleUserInfo = await response.json();
  const { id, email, name } = googleUserInfo;

  const existingThridPartyAccount = await prisma.thirdPartyAccount.findFirst({
    where: {
      providerId: id,
      provider: "Google",
    },
  });

  if (existingThridPartyAccount) {
    const user = await prisma.user.findUnique({
      where: { id: existingThridPartyAccount.userId },
    });
    if (!user) {
      return NextResponse.json(
        { error: "Linked account not found" },
        { status: 400 }
      );
    }
    await createAuthSession(user.id);
    return NextResponse.json(user);
  }

  const user = await prisma.$transaction(async (tx) => {
    let u = email
      ? await tx.user.findUnique({
          where: { email },
        })
      : null;

    if (!u) {
      u = await tx.user.create({
        data: {
          email,
          name,
          encryptedPassword: cryptoRandomString({ length: 10 }),
        },
      });
    }

    await tx.thirdPartyAccount.create({
      data: {
        providerId: id,
        provider: "Google",
        rawData: googleUserInfo,
        userId: u.id,
      },
    });

    return u;
  });

  await createAuthSession(user.id);
  return NextResponse.json(user);
}
