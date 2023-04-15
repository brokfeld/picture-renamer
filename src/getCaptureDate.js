import fs from 'node:fs/promises';
import exif from 'jpeg-exif';

export default async function getCaptureDate(file) {
  const buffer = await fs.readFile(file, { encoding: null });
  const data = exif.fromBuffer(buffer);
  const captureDateRaw = data.SubExif.DateTimeOriginal;
  const captureDateValues = captureDateRaw.replace(` `, `:`).split(`:`);

  const YYYY = captureDateValues[0];
  const MM = captureDateValues[1];
  const DD = captureDateValues[2];
  const hh = captureDateValues[3];
  const mm = captureDateValues[4];
  const ss = captureDateValues[5];
  
  const full = `${YYYY}${MM}${DD}_${hh}${mm}${ss}`;

  return full;
}

