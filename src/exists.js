import fs from 'node:fs/promises';

export default async function exists(fileOrDir) {
  try {
    await fs.access(fileOrDir);
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
}