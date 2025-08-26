import { NextResponse } from "next/server";

const CLOUDFLARE_API_TOKEN = process.env.CLOUDFLARE_API_TOKEN;
const CLOUDFLARE_ACCOUNT_ID = process.env.CLOUDFLARE_ACCOUNT_ID;
const CLOUDFLARE_HOST = "https://api.cloudflare.com";

export async function POST() {
  const uploadUrl = `${CLOUDFLARE_HOST}/client/v4/accounts/${CLOUDFLARE_ACCOUNT_ID}/stream/direct_upload`;

  const response = await fetch(uploadUrl, {
    headers: {
      Authorization: `Bearer ${CLOUDFLARE_API_TOKEN}`,
    },
    method: "POST",
    body: JSON.stringify({
      maxDurationSeconds: 1200,
    }),
  });

  const data = await response.json();
  return NextResponse.json({ uploadURL: data.result.uploadURL });
}
