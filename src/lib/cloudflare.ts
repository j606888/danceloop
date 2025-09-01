
const CLOUDFLARE_API_TOKEN = process.env.CLOUDFLARE_API_TOKEN;
const CLOUDFLARE_ACCOUNT_ID = process.env.CLOUDFLARE_ACCOUNT_ID;
const CLOUDFLARE_HOST = "https://api.cloudflare.com";
const CLOUDFLARE_API_PREFIX = `${CLOUDFLARE_HOST}/client/v4/accounts/${CLOUDFLARE_ACCOUNT_ID}/stream`

export async function getDirectUploadURL() {
  const apiPath = `${CLOUDFLARE_API_PREFIX}/direct_upload`;

  const response = await fetch(apiPath, {
    headers: {
      Authorization: `Bearer ${CLOUDFLARE_API_TOKEN}`,
    },
    method: "POST",
    body: JSON.stringify({
      maxDurationSeconds: 1200,
    }),
  });

  const { result } = await response.json();
  return {
    uploadURL: result.uploadURL,
    uid: result.uid,
  }
}

export async function getVideoDetail(uid: string) {
  const apiPath = `${CLOUDFLARE_API_PREFIX}/${uid}`

  const response = await fetch(apiPath, {
    headers: {
      Authorization: `Bearer ${CLOUDFLARE_API_TOKEN}`,
    },
  });

  const { result } = await response.json();
  return result
}