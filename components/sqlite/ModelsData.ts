import * as SQLite from "expo-sqlite";

export async function setupDatabase() {
  const db = await SQLite.openDatabaseAsync("freeflow-ai");

  await db.execAsync(`
    PRAGMA journal_mode = WAL;
    CREATE TABLE IF NOT EXISTS "ModelsData" (
	"Id"	INTEGER,
	"uniqueId"	TEXT,
	"name"	TEXT,
	"description"	TEXT,
	"baseModel"	TEXT,
	"modelType"	TEXT,
	"imagePath"	TEXT,
	"projectName"	TEXT,
	"triggerWords"	TEXT,
	PRIMARY KEY("Id" AUTOINCREMENT)
);`);

return db;
}

export async function DB_NewModelData() {
	console.log("INSERTING NEW REQUEST...");
  
	const db = await setupDatabase();
  
	const result = await db.runAsync(
	  "INSERT INTO ModelsData (Id,uniqueId,name,description,baseModel,modelType,imagePath,projectName,triggerWords) VALUES (NULL,?,?,?,?,?,?,?,?);",
	  
	);
	console.log(result.lastInsertRowId, result.changes);
  }