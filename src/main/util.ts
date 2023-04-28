/* eslint import/prefer-default-export: off */
import path from "path";
import * as process from "process";
import { URL } from "url";

export function resolveHtmlPath(htmlFileName: string) {
  if (process.env.NODE_ENV === 'development') {
    const basePort = process.env.PORT && process.env.PORT.length > 0 ? parseInt(process.env.PORT!) : 1212;
    const port = htmlFileName === 'main' ? basePort : basePort + 1;
    const url = new URL(`http://localhost:${port}`);
    return url.href;
  }

  switch (htmlFileName) {
    case 'chat':
      return `file://${path.resolve(__dirname, '../renderer')}/main/index.html`;
    case 'main':
    default:
      return `file://${path.resolve(__dirname, '../renderer')}/chat/index.html`;
  }
}
