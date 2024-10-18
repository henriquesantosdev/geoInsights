-- CreateTable
CREATE TABLE "Concorrence" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "contractStarted" DATETIME NOT NULL,
    "ContractEnd" DATETIME NOT NULL,
    "value" INTEGER NOT NULL,
    "service" TEXT NOT NULL,
    "municipalityId" TEXT NOT NULL,
    CONSTRAINT "Concorrence_municipalityId_fkey" FOREIGN KEY ("municipalityId") REFERENCES "Municipality" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Municipality" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "stateId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "present" BOOLEAN NOT NULL DEFAULT false,
    "concorrencePresent" BOOLEAN NOT NULL DEFAULT false,
    CONSTRAINT "Municipality_stateId_fkey" FOREIGN KEY ("stateId") REFERENCES "State" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Municipality" ("id", "name", "present", "stateId") SELECT "id", "name", "present", "stateId" FROM "Municipality";
DROP TABLE "Municipality";
ALTER TABLE "new_Municipality" RENAME TO "Municipality";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

-- CreateIndex
CREATE UNIQUE INDEX "Concorrence_municipalityId_key" ON "Concorrence"("municipalityId");
