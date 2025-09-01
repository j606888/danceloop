import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

const STATE_WITH_ORDER = ['DRAFT', 'UPLOADING', 'PROCESSING', 'READY', 'FAILED'];

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ uid: string }> }
) {
  const { uid } = await params;
  const { state } = await request.json();

  const video = await prisma.video.findUnique({
    where: { uid },
  })

  if (!video) {
    return NextResponse.json({ error: "Video not found" }, { status: 404 });
  }

  checkStateValid({ currentState: video.state, newState: state })
  await prisma.video.update({
    where: { uid },
    data: { state },
  });

  return NextResponse.json({ success: true });
}

function checkStateValid({ currentState, newState }: { currentState: string, newState: string }) {
  const currentStateIndex = STATE_WITH_ORDER.indexOf(currentState);
  const newStateIndex = STATE_WITH_ORDER.indexOf(newState);

  if (currentStateIndex === -1 || newStateIndex === -1) {
    throw new Error(`Invalid state: ${currentState} or ${newState}`);
  }

  if (newStateIndex < currentStateIndex) {
    throw new Error(`Invalid state transition: ${currentState} -> ${newState}`);
  }
  
  return true
}
