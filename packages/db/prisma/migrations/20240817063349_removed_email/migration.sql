/*
  Warnings:

  - You are about to drop the column `email` on the `Merchant` table. All the data in the column will be lost.
  - You are about to drop the column `email` on the `User` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "Merchant_email_key";

-- DropIndex
DROP INDEX "User_email_key";

-- AlterTable
ALTER TABLE "Merchant" DROP COLUMN "email";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "email";
