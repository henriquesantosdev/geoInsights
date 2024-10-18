/*
  Warnings:

  - You are about to alter the column `secretaryContact` on the `MunicipalityDetails` table. The data in that column could be lost. The data in that column will be cast from `Int` to `BigInt`.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_MunicipalityDetails" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "ubs_quantity" INTEGER NOT NULL,
    "populationQuantity" INTEGER NOT NULL,
    "secretaryName" TEXT NOT NULL,
    "secretaryContact" BIGINT NOT NULL,
    "municipalityId" TEXT NOT NULL,
    CONSTRAINT "MunicipalityDetails_municipalityId_fkey" FOREIGN KEY ("municipalityId") REFERENCES "Municipality" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_MunicipalityDetails" ("id", "municipalityId", "populationQuantity", "secretaryContact", "secretaryName", "ubs_quantity") SELECT "id", "municipalityId", "populationQuantity", "secretaryContact", "secretaryName", "ubs_quantity" FROM "MunicipalityDetails";
DROP TABLE "MunicipalityDetails";
ALTER TABLE "new_MunicipalityDetails" RENAME TO "MunicipalityDetails";
CREATE UNIQUE INDEX "MunicipalityDetails_municipalityId_key" ON "MunicipalityDetails"("municipalityId");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
