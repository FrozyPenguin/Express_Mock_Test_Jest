import * as fs from 'fs';
import * as path from 'path';

interface RecursiveTreeReaderOptions {
  basePath?: string;
}

const recursiveTreeReader = (
  folderPath: string,
  options?: RecursiveTreeReaderOptions
) => {
  return new Promise<string[]>(async (resolve, reject) => {
    const absoluteFolderPath: string = path.resolve(folderPath);
    let files: string[] = [];
    const pathArray: string[] = [];

    options = options ?? {};
    if (!options.basePath) options.basePath = absoluteFolderPath;
    else options.basePath = path.resolve(options.basePath);

    try {
      files = fs.readdirSync(absoluteFolderPath);
    } catch (error) {
      reject(error);
    }

    for (const file of files) {
      let fileStat: fs.Stats | null = null;
      const filePath: string = path.join(absoluteFolderPath, file);

      try {
        fileStat = fs.statSync(filePath);
      } catch (error) {
        reject(error);
      }

      if (fileStat?.isDirectory()) {
        const recursivePath: string[] = (await recursiveTreeReader(
          filePath,
          { basePath: options?.basePath }
        )) as string[];
        pathArray.push(...recursivePath);
      } else if (fileStat?.isFile() && file.endsWith('.ts')) {
        pathArray.push(path.relative(options.basePath, filePath));
      }
    }

    resolve(pathArray);
  });
};

export default recursiveTreeReader;
