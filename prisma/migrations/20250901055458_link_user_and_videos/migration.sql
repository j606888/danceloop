-- AlterTable
ALTER TABLE "public"."Video" ADD COLUMN     "userId" INTEGER;

-- AddForeignKey
ALTER TABLE "public"."Video" ADD CONSTRAINT "Video_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
