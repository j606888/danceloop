-- AlterTable
ALTER TABLE "public"."Video" ADD COLUMN     "danceStyle" TEXT,
ADD COLUMN     "location" TEXT,
ADD COLUMN     "recordType" TEXT;

-- CreateTable
CREATE TABLE "public"."Dancer" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Dancer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."VideoDancer" (
    "id" SERIAL NOT NULL,
    "videoId" INTEGER NOT NULL,
    "dancerId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "VideoDancer_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Dancer_name_key" ON "public"."Dancer"("name");

-- CreateIndex
CREATE UNIQUE INDEX "VideoDancer_videoId_dancerId_key" ON "public"."VideoDancer"("videoId", "dancerId");

-- AddForeignKey
ALTER TABLE "public"."VideoDancer" ADD CONSTRAINT "VideoDancer_videoId_fkey" FOREIGN KEY ("videoId") REFERENCES "public"."Video"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."VideoDancer" ADD CONSTRAINT "VideoDancer_dancerId_fkey" FOREIGN KEY ("dancerId") REFERENCES "public"."Dancer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
