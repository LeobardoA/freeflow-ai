import * as SQLite from "expo-sqlite";

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

export function setupDatabase() {
  let db: SQLite.SQLiteDatabase | null = null;
  try {
    db = SQLite.openDatabaseSync("freeflow-ai");
    db.execSync(`
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
      PRIMARY KEY("Id" AUTOINCREMENT));`);
  } finally {
    if (db) {
      db.closeSync();
    }
  }
}

export async function DB_NewModelData(data: ModelDataProps) {
  if (data !== null) {
    let db: SQLite.SQLiteDatabase | null = null;
    try {
      db = SQLite.openDatabaseSync("freeflow-ai");

      const uniqueId = data.uniqueId;
      const name = data.name;
      const description = data.desc? data.desc : "";
      const baseModel = data.baseModel;
      const modelType = data.modelType;
      const imagePath = data.imagePath;
      const projectName = data.projectName;
      const triggerWords = data.triggerWords? data.triggerWords : "";

      db.runSync(
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
    } finally {
      if (db) {
        db.closeSync();
      }
    }
  }
}

export function DB_GetAllModelsData() {
  let db: SQLite.SQLiteDatabase | null = null;
  try {
    console.log("GETTING ALL ROWS...");
    db = SQLite.openDatabaseSync("freeflow-ai");
    const allRows = db.getAllSync("SELECT * FROM ModelsData");
    return allRows as ModelDataProps[];
  } finally {
    if (db) {
      db.closeSync();
    }
  }
}

export function DB_GetAllLorasData() {
  let db: SQLite.SQLiteDatabase | null = null;
  try {
    console.log("GETTING ALL ROWS...");
    db = SQLite.openDatabaseSync("freeflow-ai");
    const allRows = db.getAllSync("SELECT * FROM ModelsData WHERE modelType = 'LORA'");
    return allRows as ModelDataProps[];
  } finally {
    if (db) {
      db.closeSync();
    }
  }
}

export function DB_GetModelsDataByUniqueId(uniqueId: string) {
  let db: SQLite.SQLiteDatabase | null = null;
  try {
    console.log(`GETTING ROWS FOR uniqueId: ${uniqueId}...`);
    db = SQLite.openDatabaseSync("freeflow-ai");
    const rows = db.getAllSync(
      "SELECT * FROM ModelsData WHERE uniqueId = ?",
      uniqueId
    );
    return rows as ModelDataProps[];
  } finally {
    if (db) {
      db.closeSync();
    }
  }
}

export function DB_GetAllCheckpoints() {
  let db: SQLite.SQLiteDatabase | null = null;
  try {
    console.log(`GETTING ALL CHECKPOINTS...`);
    db = SQLite.openDatabaseSync("freeflow-ai");
    const rows = db.getAllSync(
      'SELECT * FROM ModelsData WHERE modelType = "CHECKPOINT";'
    );
    return rows as ModelDataProps[];
  } finally {
    if (db) {
      db.closeSync();
    }
  }
}

export async function DB_DeleteAllModelsData() {
  let db: SQLite.SQLiteDatabase | null = null;
  try {
    console.log(`ERASING ALL MODELS...`);
    db = await SQLite.openDatabaseAsync("freeflow-ai");
    await db.runAsync("DELETE FROM ModelsData;");
  } finally {
    if (db) {
      db.closeSync();
    }
  }
}
