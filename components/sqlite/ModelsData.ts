import * as SQLite from "expo-sqlite";
import { checkModelData } from "../api/demo";

export interface ModelDataProps {
  uniqueId: string;
  name: string;
  desc?: string;
  baseModel: string;
  modelType: string;
  imagePath: string;
  projectName: string;
  triggerWords?: string;
}

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

export async function DB_NewModelData(modelId: string) {
  const data = await checkModelData(modelId);
  console.log(JSON.stringify(data, null, 4));

  if (data !== null) {
    const db = await setupDatabase();

    const uniqueId = data.id;
    const name = data.name;
    const description = data.description;
    const baseModel = data.baseModel;
    const modelType = data.modelType;
    const imagePath = data.showcaseImageUrls[0];
    const projectName = data.projectName;
    const triggerWords = data.triggerWords;

    await db.runAsync(
      "INSERT INTO ModelsData (Id, uniqueId, name, description, baseModel, modelType, imagePath, projectName, triggerWords) VALUES (NULL, ?, ?, ?, ?, ?, ?, ?, ?);",
      uniqueId,
      name,
      description,
      baseModel,
      modelType,
      imagePath,
      projectName,
      triggerWords
    );

    return true;
  } else {
    return false;
  }
}

export async function DB_GetAllModelsData() {
  console.log("GETTING ALL ROWS...");
  const db = await setupDatabase();
  const allRows = await db.getAllAsync("SELECT * FROM ModelsData");
  return allRows as ModelDataProps[];
}

export async function DB_GetModelsDataByUniqueId(uniqueId: string) {
  console.log(`GETTING ROWS FOR uniqueId: ${uniqueId}...`);
  const db = await setupDatabase();
  const rows = await db.getAllAsync(
    "SELECT * FROM ModelsData WHERE uniqueId = ?",
    uniqueId
  );
  return rows as ModelDataProps[];
}

export async function DB_GetAllCheckpoints() {
  console.log(`GETTING ALL CHECKPOINTS...`);
  const db = await setupDatabase();
  const rows = await db.getAllAsync(
    "SELECT * FROM ModelsData WHERE modelType = \"CHECKPOINT\";");
  return rows as ModelDataProps[];
}

export async function DB_DeleteAllModelsData() {
  console.log(`ERASING ALL MODELS...`);
  const db = await setupDatabase();
  await db.runAsync("DELETE FROM ModelsData;");
}
