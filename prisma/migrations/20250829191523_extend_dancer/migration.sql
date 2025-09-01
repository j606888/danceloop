-- AlterTable
ALTER TABLE "public"."Dancer" ADD COLUMN     "gender" TEXT NOT NULL DEFAULT 'male',
ADD COLUMN     "isTeacher" BOOLEAN NOT NULL DEFAULT false;
