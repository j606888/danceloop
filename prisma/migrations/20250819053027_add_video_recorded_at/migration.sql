/*
  Warnings:

  - Added the required column `recordedAt` to the `Video` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."Video" ADD COLUMN     "recordedAt" TIMESTAMP(3) NOT NULL;
