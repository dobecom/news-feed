/*
  Warnings:

  - You are about to drop the `_SchoolToUser` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_SchoolToUser" DROP CONSTRAINT "_SchoolToUser_A_fkey";

-- DropForeignKey
ALTER TABLE "_SchoolToUser" DROP CONSTRAINT "_SchoolToUser_B_fkey";

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "subsSchoolIds" INTEGER[];

-- DropTable
DROP TABLE "_SchoolToUser";
