-- CreateTable
CREATE TABLE "MunicipalityDetails" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "ubs_quantity" INTEGER NOT NULL,
    "populationQuantity" INTEGER NOT NULL,
    "secretaryName" TEXT NOT NULL,
    "secretaryContact" INTEGER NOT NULL,
    "municipalityId" TEXT NOT NULL,
    CONSTRAINT "MunicipalityDetails_municipalityId_fkey" FOREIGN KEY ("municipalityId") REFERENCES "Municipality" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "MunicipalityDetails_municipalityId_key" ON "MunicipalityDetails"("municipalityId");
