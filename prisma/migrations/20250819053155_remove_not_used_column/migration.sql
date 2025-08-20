/*
  Warnings:

  - You are about to drop the column `streamCreatedAt` on the `Video` table. All the data in the column will be lost.
  - You are about to drop the column `streamModifiedAt` on the `Video` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "public"."Video" DROP COLUMN "streamCreatedAt",
DROP COLUMN "streamModifiedAt";
