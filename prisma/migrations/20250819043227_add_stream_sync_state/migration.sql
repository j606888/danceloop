-- CreateTable
CREATE TABLE "public"."StreamSyncState" (
    "id" SERIAL NOT NULL,
    "lastSyncedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "StreamSyncState_pkey" PRIMARY KEY ("id")
);
