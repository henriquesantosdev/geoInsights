/*
  Warnings:

  - You are about to drop the column `ContractEnd` on the `Concorrence` table. All the data in the column will be lost.
  - Added the required column `contractEnd` to the `Concorrence` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Concorrence" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "contractStarted" DATETIME NOT NULL,
    "contractEnd" DATETIME NOT NULL,
    "value" INTEGER NOT NULL,
    "service" TEXT NOT NULL,
    "municipalityId" TEXT NOT NULL,
    CONSTRAINT "Concorrence_municipalityId_fkey" FOREIGN KEY ("municipalityId") REFERENCES "Municipality" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Concorrence" ("contractStarted", "id", "municipalityId", "name", "service", "value") SELECT "contractStarted", "id", "municipalityId", "name", "service", "value" FROM "Concorrence";
DROP TABLE "Concorrence";
ALTER TABLE "new_Concorrence" RENAME TO "Concorrence";
CREATE UNIQUE INDEX "Concorrence_municipalityId_key" ON "Concorrence"("municipalityId");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
