import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

const CLOUDFLARE_API_TOKEN = process.env.CLOUDFLARE_API_TOKEN;
const CLOUDFLARE_ACCOUNT_ID = process.env.CLOUDFLARE_ACCOUNT_ID;
const CLOUDFLARE_HOST = 'https://api.cloudflare.com'

export async function GET() {
  const videoUrl = `${CLOUDFLARE_HOST}/client/v4/accounts/${CLOUDFLARE_ACCOUNT_ID}/stream`
  const response = await fetch(videoUrl, {
    headers: {
      "Authorization": `Bearer ${CLOUDFLARE_API_TOKEN}`,
    },
  });

  const data = await response.json();
  return NextResponse.json(data);
}
