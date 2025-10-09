/*
  Warnings:

  - You are about to drop the column `endTime` on the `Activity` table. All the data in the column will be lost.
  - You are about to drop the column `placeId` on the `Activity` table. All the data in the column will be lost.
  - You are about to drop the column `startTime` on the `Activity` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Activity" DROP COLUMN "endTime",
DROP COLUMN "placeId",
DROP COLUMN "startTime";
