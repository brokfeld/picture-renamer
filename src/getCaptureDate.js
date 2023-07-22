import fs from 'node:fs/promises';
import path from 'node:path';
import exif from 'jpeg-exif';

/**
 * 
 * @param {string} file 
 * @param {object} options 
 * @param {number} options.addHours Add or subtract hours 
 * @param {number} options.addMinutes Add or subtract minutes 
 * @returns 
 */
export default async function getCaptureDate(file, options) {
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


  // add or remove hours and minutes
  const fullString = `${full.substring(0, 4)}-${full.substring(4, 6)}-${full.substring(6, 8)}T${full.substring(9, 11)}:${full.substring(11, 13)}:${full.substring(13, 15)}`;
  const d = new Date(fullString);
  d.setHours(d.getHours() + options.addHours);
  d.setMinutes(d.getMinutes() + options.addMinutes);
  full = `${d.getFullYear()}${(d.getMonth() + 1).toString().padStart(2, '0')}${(d.getDate()).toString().padStart(2, '0')}_${(d.getHours()).toString().padStart(2, '0')}${(d.getMinutes()).toString().padStart(2, '0')}${(d.getSeconds()).toString().padStart(2, '0')}`;

  return full;

}

