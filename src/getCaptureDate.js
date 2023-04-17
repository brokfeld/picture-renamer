import fs from 'node:fs/promises';
import path from 'node:path';
import exif from 'jpeg-exif';

export default async function getCaptureDate(file) {
  const buffer = await fs.readFile(file, { encoding: null });
  const data = exif.fromBuffer(buffer);

  let full = null;
  // read capture date from exif
  if (data.SubExif && data.SubExif.DateTimeOriginal) {
    const captureDateRaw = data.SubExif.DateTimeOriginal;
    const captureDateValues = captureDateRaw.replace(` `, `:`).split(`:`);

    const YYYY = captureDateValues[0];
    const MM = captureDateValues[1];
    const DD = captureDateValues[2];
    const hh = captureDateValues[3];
    const mm = captureDateValues[4];
    const ss = captureDateValues[5];

    full = `${YYYY}${MM}${DD}_${hh}${mm}${ss}`;
  } else {
    // read capture date from filename
    const parsed = path.parse(file);
    const match = parsed.base.match(/[0-9]{8}[\_][0-9]{6}/);
    if (match) {
      full = match[0];
    }
  }

  return full;
}

