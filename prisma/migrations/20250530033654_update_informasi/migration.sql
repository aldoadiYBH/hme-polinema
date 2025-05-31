/*
  Warnings:

  - A unique constraint covering the columns `[slug]` on the table `Informasi` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `Informasi_slug_key` ON `Informasi`(`slug`);
