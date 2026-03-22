-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_memberDays" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "day" INTEGER NOT NULL,
    "member" INTEGER NOT NULL DEFAULT 5,
    CONSTRAINT "memberDays_member_fkey" FOREIGN KEY ("member") REFERENCES "users" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_memberDays" ("day", "id", "member") SELECT "day", "id", "member" FROM "memberDays";
DROP TABLE "memberDays";
ALTER TABLE "new_memberDays" RENAME TO "memberDays";
CREATE UNIQUE INDEX "memberDays_day_key" ON "memberDays"("day");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
