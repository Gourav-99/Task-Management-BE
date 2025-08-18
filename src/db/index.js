import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DATA_FILE = path.resolve(__dirname, 'tasks.json');

async function ensureFile() {
  try {
    await fs.access(DATA_FILE);
  } catch {
    await fs.mkdir(path.dirname(DATA_FILE), { recursive: true });
    await fs.writeFile(DATA_FILE, '[]', 'utf-8');
  }
}

async function readTasks() {
  await ensureFile();
  const data = await fs.readFile(DATA_FILE, 'utf-8');
  try {
    return JSON.parse(data);
  } catch {
    const backup = DATA_FILE.replace(/tasks\.json$/, `tasks.backup.${Date.now()}.json`);
    await fs.writeFile(backup, data, 'utf-8');
    await fs.writeFile(DATA_FILE, '[]', 'utf-8');
    return [];
  }
}

async function writeTasks(tasks) {
  await ensureFile();
  const json = JSON.stringify(tasks, null, 2);
  await fs.writeFile(DATA_FILE, json, 'utf-8');
}

export default { readTasks, writeTasks };