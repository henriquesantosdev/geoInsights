/*
  Warnings:

  - You are about to drop the column `ubs_quantity` on the `MunicipalityDetails` table. All the data in the column will be lost.
  - Added the required column `ubsQuantity` to the `MunicipalityDetails` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_MunicipalityDetails" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "ubsQuantity" INTEGER NOT NULL,
    "populationQuantity" INTEGER NOT NULL,
    "secretaryName" TEXT NOT NULL,
    "secretaryContact" BIGINT NOT NULL,
    "municipalityId" TEXT NOT NULL,
    CONSTRAINT "MunicipalityDetails_municipalityId_fkey" FOREIGN KEY ("municipalityId") REFERENCES "Municipality" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_MunicipalityDetails" ("id", "municipalityId", "populationQuantity", "secretaryContact", "secretaryName") SELECT "id", "municipalityId", "populationQuantity", "secretaryContact", "secretaryName" FROM "MunicipalityDetails";
DROP TABLE "MunicipalityDetails";
ALTER TABLE "new_MunicipalityDetails" RENAME TO "MunicipalityDetails";
CREATE UNIQUE INDEX "MunicipalityDetails_municipalityId_key" ON "MunicipalityDetails"("municipalityId");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
