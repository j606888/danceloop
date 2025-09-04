/*
  Warnings:

  - A unique constraint covering the columns `[provider,providerId]` on the table `ThirdPartyAccount` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "ThirdPartyAccount_provider_providerId_key" ON "public"."ThirdPartyAccount"("provider", "providerId");
