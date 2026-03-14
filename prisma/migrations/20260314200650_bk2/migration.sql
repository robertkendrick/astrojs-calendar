/*
  Warnings:

  - A unique constraint covering the columns `[day]` on the table `memberDays` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "memberDays_day_key" ON "memberDays"("day");
