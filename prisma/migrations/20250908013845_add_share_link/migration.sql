-- CreateEnum
CREATE TYPE "public"."ShareLinkType" AS ENUM ('VIDEO', 'PLAYLIST');

-- CreateEnum
CREATE TYPE "public"."ShareLinkRole" AS ENUM ('COLLABORATOR', 'FOLLOWER');

-- CreateTable
CREATE TABLE "public"."ShareLink" (
    "id" SERIAL NOT NULL,
    "publicId" TEXT NOT NULL,
    "type" "public"."ShareLinkType" NOT NULL,
    "userId" INTEGER NOT NULL,
    "playlistId" INTEGER,
    "videoId" INTEGER,
    "role" "public"."ShareLinkRole" NOT NULL DEFAULT 'FOLLOWER',
    "expiredAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ShareLink_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ShareLink_publicId_key" ON "public"."ShareLink"("publicId");

-- AddForeignKey
ALTER TABLE "public"."ShareLink" ADD CONSTRAINT "ShareLink_playlistId_fkey" FOREIGN KEY ("playlistId") REFERENCES "public"."Playlist"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."ShareLink" ADD CONSTRAINT "ShareLink_videoId_fkey" FOREIGN KEY ("videoId") REFERENCES "public"."Video"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."ShareLink" ADD CONSTRAINT "ShareLink_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
