// Import SQLite, path and URL modules
import sqlite3 from "sqlite3";
import path from "path";
import { fileURLToPath } from "url";

// Get the current database folder path
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Enable detailed SQLite error messages
const sqlite = sqlite3.verbose();

// Create or open the AquaVerse database file
export const db = new sqlite.Database(path.join(__dirname, "site.db"));

// Get multiple rows from the database
export function all(sql, params = []) {
  return new Promise((resolve, reject) => {
    db.all(sql, params, (err, rows) => err ? reject(err) : resolve(rows));
  });
}

// Get one row from the database
export function get(sql, params = []) {
  return new Promise((resolve, reject) => {
    db.get(sql, params, (err, row) => err ? reject(err) : resolve(row));
  });
}

// Run a database command such as INSERT or CREATE TABLE
export function run(sql, params = []) {
  return new Promise((resolve, reject) => {
    db.run(sql, params, function (err) {
      err ? reject(err) : resolve({ lastID: this.lastID });
    });
  });
}
