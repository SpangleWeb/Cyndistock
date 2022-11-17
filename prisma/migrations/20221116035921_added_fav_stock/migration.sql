/*
  Warnings:

  - Added the required column `favouriteStock` to the `UserDetails` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "UserDetails" ADD COLUMN     "favouriteStock" TEXT NOT NULL;
