import * as SQLite from "expo-sqlite";
import { Txt2imgData } from "../api/demo";

export async function setupDatabase() {
  const db = await SQLite.openDatabaseAsync("freeflow-ai");

  await db.execAsync(`
    PRAGMA journal_mode = WAL;
    CREATE TABLE IF NOT EXISTS "Txt2ImgRequests" (
	  "Id"	INTEGER UNIQUE,
	  "seed"	INTEGER NOT NULL,
	  "count"	INTEGER NOT NULL,
	  "width"	INTEGER NOT NULL,
	  "height"	INTEGER NOT NULL,
	  "positive_prompt"	TEXT,
	  "negative_prompt"	TEXT,
	  "sdModel"	TEXT,
	  "sdVae"	INTEGER,
	  "steps"	INTEGER,
	  "cfgScale"	INTEGER,
	  "clipSkip"	INTEGER,
	  "ENSD"	INTEGER,
	  PRIMARY KEY("Id" AUTOINCREMENT)
)
  `);
  return db;
}

export async function DB_NewTxt2ImgRequest(data: Txt2imgData) {
  console.log("INSERTING NEW REQUEST...");

  const db = await setupDatabase();

  const result = await db.runAsync(
    "INSERT INTO Txt2ImgRequests (Id,seed,count,width,height,positive_prompt,negative_prompt,sdModel,sdVae,steps,cfgScale,clipSkip,ENSD) VALUES (NULL,?,?,?,?,?,?,?,?,?,?,?,?);",
    data.stages[0].inputInitialize.seed,
    data.stages[0].inputInitialize.count,
    data.stages[1].diffusion.width,
    data.stages[1].diffusion.height,
    data.stages[1].diffusion.prompts[0].text,
    data.stages[1].diffusion.negativePrompts[0].text,
    data.stages[1].diffusion.sdModel,
    data.stages[1].diffusion.sdVae,
    data.stages[1].diffusion.steps,
    data.stages[1].diffusion.cfgScale,
    data.stages[1].diffusion.clipSkip,
    data.stages[1].diffusion.etaNoiseSeedDelta
  );
  console.log(result.lastInsertRowId, result.changes);
}

export async function DB_GetAllTxt2ImgRequests() {
  console.log("GETTING ALL ROWS...");
  const db = await setupDatabase();
  const allRows = await db.getAllAsync("SELECT * FROM Txt2ImgRequests");
  return allRows;
}
export async function DB_GetLastTxt2ImgRequests() {
  console.log("GETTING ALL ROWS...");
  const db = await setupDatabase();
  const allRows = await db.getFirstAsync(
    "SELECT * FROM Txt2ImgRequests ORDER BY Id DESC LIMIT 1;"
  );
  console.log(allRows);
}
