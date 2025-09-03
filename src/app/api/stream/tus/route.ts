// app/api/stream/tus/route.ts
import { NextResponse } from "next/server";

const ACCOUNT_ID = process.env.CLOUDFLARE_ACCOUNT_ID!;
const API_TOKEN  = process.env.CLOUDFLARE_API_TOKEN!;

export async function POST(req: Request) {
  // Forward TUS create headers to Cloudflare Stream
  const endpoint = `https://api.cloudflare.com/client/v4/accounts/${ACCOUNT_ID}/stream?direct_user=true`;

  const cfResp = await fetch(endpoint, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${API_TOKEN}`,
      "Tus-Resumable": "1.0.0",
      "Upload-Length": req.headers.get("Upload-Length") ?? "",
      "Upload-Metadata": req.headers.get("Upload-Metadata") ?? "",
    },
  });

  const destination = cfResp.headers.get("Location") ?? "";

  const res = new NextResponse(null, { 
    headers: {
      "Access-Control-Expose-Headers": "Location",
      "Access-Control-Allow-Headers": "*",
      "Access-Control-Allow-Origin": "*",
      Location: destination,
    },
  });

  return res;
}
