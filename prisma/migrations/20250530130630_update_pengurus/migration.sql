/*
  Warnings:

  - Added the required column `jabatan` to the `Pengurus` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `pengurus` ADD COLUMN `jabatan` VARCHAR(191) NOT NULL;
