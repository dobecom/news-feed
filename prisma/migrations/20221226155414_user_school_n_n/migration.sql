/*
  Warnings:

  - You are about to drop the column `userId` on the `School` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "School" DROP CONSTRAINT "School_userId_fkey";

-- AlterTable
ALTER TABLE "School" DROP COLUMN "userId";

-- CreateTable
CREATE TABLE "_SchoolToUser" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_SchoolToUser_AB_unique" ON "_SchoolToUser"("A", "B");

-- CreateIndex
CREATE INDEX "_SchoolToUser_B_index" ON "_SchoolToUser"("B");

-- AddForeignKey
ALTER TABLE "_SchoolToUser" ADD CONSTRAINT "_SchoolToUser_A_fkey" FOREIGN KEY ("A") REFERENCES "School"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_SchoolToUser" ADD CONSTRAINT "_SchoolToUser_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
