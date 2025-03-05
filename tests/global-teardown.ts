import * as fs from 'fs';
import * as path from 'path';

const reportsDir = 'playwright-reports';

export default function cleanupReports() {
  fs.readdirSync(reportsDir)
    .filter((file) => fs.statSync(path.join(reportsDir, file)).isDirectory())
    .sort((a, b) => fs.statSync(path.join(reportsDir, b)).mtimeMs - fs.statSync(path.join(reportsDir, a)).mtimeMs)
    .slice(4) 
    .forEach((folder) => {
      const folderPath = path.join(reportsDir, folder);
      fs.rmSync(folderPath, { recursive: true });
      console.log(`Deleted folder: ${folderPath}`);
    });
}