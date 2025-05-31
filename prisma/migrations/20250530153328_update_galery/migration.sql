/*
  Warnings:

  - You are about to alter the column `images` on the `galery` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Json`.

*/
-- AlterTable
ALTER TABLE `galery` MODIFY `images` JSON NOT NULL;
