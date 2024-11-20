import { unlink } from "fs";

export function deleteFile(filePath) {
  unlink(filePath, (err) => {
    if (err) {
      console.error(`Error removing file: ${err}`);
      return;
    }
    console.log(`File ${filePath} has been successfully removed.`);
  });
}