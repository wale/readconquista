-- CreateExtension
CREATE EXTENSION IF NOT EXISTS "postgis";

-- CreateTable
CREATE TABLE "LocalGovernmentArea" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "libraryServiceId" TEXT NOT NULL,

    CONSTRAINT "LocalGovernmentArea_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LibraryService" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "LibraryService_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Library" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "suburb" TEXT NOT NULL,
    "libraryServiceId" TEXT NOT NULL,

    CONSTRAINT "Library_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "LocalGovernmentArea" ADD CONSTRAINT "LocalGovernmentArea_libraryServiceId_fkey" FOREIGN KEY ("libraryServiceId") REFERENCES "LibraryService"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Library" ADD CONSTRAINT "Library_libraryServiceId_fkey" FOREIGN KEY ("libraryServiceId") REFERENCES "LibraryService"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
