/*
  Warnings:

  - You are about to drop the column `cyndiGroupId` on the `User` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_cyndiGroupId_fkey";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "cyndiGroupId";

-- CreateTable
CREATE TABLE "_CyndiGroupToUser" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_CyndiGroupToUser_AB_unique" ON "_CyndiGroupToUser"("A", "B");

-- CreateIndex
CREATE INDEX "_CyndiGroupToUser_B_index" ON "_CyndiGroupToUser"("B");

-- AddForeignKey
ALTER TABLE "_CyndiGroupToUser" ADD CONSTRAINT "_CyndiGroupToUser_A_fkey" FOREIGN KEY ("A") REFERENCES "CyndiGroup"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CyndiGroupToUser" ADD CONSTRAINT "_CyndiGroupToUser_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
