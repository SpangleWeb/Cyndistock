-- AlterTable
ALTER TABLE "User" ADD COLUMN     "cyndiGroupId" INTEGER;

-- CreateTable
CREATE TABLE "CyndiGroup" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "watchList" TEXT[],

    CONSTRAINT "CyndiGroup_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_cyndiGroupId_fkey" FOREIGN KEY ("cyndiGroupId") REFERENCES "CyndiGroup"("id") ON DELETE SET NULL ON UPDATE CASCADE;
