-- CreateTable
CREATE TABLE "public"."Video" (
    "id" SERIAL NOT NULL,
    "uid" TEXT NOT NULL,
    "thumbnail" TEXT NOT NULL,
    "duration" DOUBLE PRECISION NOT NULL,
    "filename" TEXT NOT NULL,
    "preview" TEXT NOT NULL,
    "streamCreatedAt" TIMESTAMP(3) NOT NULL,
    "streamModifiedAt" TIMESTAMP(3) NOT NULL,
    "rawData" JSONB NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Video_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Video_uid_key" ON "public"."Video"("uid");
