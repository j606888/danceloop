-- CreateEnum
CREATE TYPE "public"."VideoVisibility" AS ENUM ('PRIVATE', 'PUBLIC');

-- AlterTable
ALTER TABLE "public"."Video" ADD COLUMN     "visibility" TEXT;
