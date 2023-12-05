/*
  Warnings:

  - You are about to drop the `Image` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "Image";

-- CreateTable
CREATE TABLE "BoardImage" (
    "id" TEXT NOT NULL,
    "thumbUrl" TEXT NOT NULL,
    "fullUrl" TEXT NOT NULL,
    "userName" TEXT NOT NULL,
    "linkHTML" TEXT NOT NULL,

    CONSTRAINT "BoardImage_pkey" PRIMARY KEY ("id")
);
