-- DropForeignKey
ALTER TABLE "School" DROP CONSTRAINT "School_userId_fkey";

-- AlterTable
ALTER TABLE "School" ALTER COLUMN "userId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "School" ADD CONSTRAINT "School_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
