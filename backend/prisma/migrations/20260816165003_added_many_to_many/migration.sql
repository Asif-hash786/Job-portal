/*
  Warnings:

  - You are about to drop the column `created_by` on the `Job` table. All the data in the column will be lost.
  - Added the required column `userId` to the `Job` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Job" DROP CONSTRAINT "Job_created_by_fkey";

-- DropIndex
DROP INDEX "Company_userId_key";

-- DropIndex
DROP INDEX "Job_created_by_key";

-- AlterTable
ALTER TABLE "Job" DROP COLUMN "created_by",
ADD COLUMN     "userId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Job" ADD CONSTRAINT "Job_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
