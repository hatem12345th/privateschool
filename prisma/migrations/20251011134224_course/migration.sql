/*
  Warnings:

  - You are about to drop the column `classId` on the `Course` table. All the data in the column will be lost.
  - Added the required column `teacher` to the `Course` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Course" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "credits" INTEGER NOT NULL,
    "teacherId" INTEGER NOT NULL,
    "teacher" TEXT NOT NULL
);
INSERT INTO "new_Course" ("credits", "id", "name", "teacherId") SELECT "credits", "id", "name", "teacherId" FROM "Course";
DROP TABLE "Course";
ALTER TABLE "new_Course" RENAME TO "Course";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
