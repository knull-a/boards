/*
  Warnings:

  - You are about to drop the column `imageFullUrl` on the `Board` table. All the data in the column will be lost.
  - You are about to drop the column `imageLinkHTML` on the `Board` table. All the data in the column will be lost.
  - You are about to drop the column `imageThumbUrl` on the `Board` table. All the data in the column will be lost.
  - You are about to drop the column `imageUserName` on the `Board` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Board" DROP COLUMN "imageFullUrl",
DROP COLUMN "imageLinkHTML",
DROP COLUMN "imageThumbUrl",
DROP COLUMN "imageUserName";

-- CreateTable
CREATE TABLE "Image" (
    "id" TEXT NOT NULL,
    "thumbUrl" TEXT NOT NULL,
    "fullUrl" TEXT NOT NULL,
    "userName" TEXT NOT NULL,
    "linkHTML" TEXT NOT NULL,

    CONSTRAINT "Image_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Board_imageId_idx" ON "Board"("imageId");
