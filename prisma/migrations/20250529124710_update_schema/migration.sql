/*
  Warnings:

  - You are about to drop the column `image` on the `programkerja` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `programkerja` DROP COLUMN `image`,
    ADD COLUMN `thumbnail` VARCHAR(191) NULL;
