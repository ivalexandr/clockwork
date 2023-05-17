import { app, BrowserWindow, screen } from 'electron';
import * as electronReloader from 'electron-reloader';
import * as electronDebug from 'electron-debug';
import { join } from 'node:path';
import { existsSync } from 'node:fs';

let win = null;
const args = process.argv.slice(1);
const serve = args.some(val => val === '--serve');

const createWindow = () => {
  const size = screen.getPrimaryDisplay().workAreaSize;

  win = new BrowserWindow({ 
    x: 0,
    y: 0,
    width: size.width,
    height: size.height,
    webPreferences: {
      nodeIntegration: true,
      allowRunningInsecureContent: (serve),
      contextIsolation: false,
    }
  });

  if (serve) {
    electronDebug();

    electronReloader(module);
    win.loadURL('http://localhost:4200')
  } else {
    let pathIndex = './index.html';
    if (existsSync(join(__dirname, 'dist/time-tracking/index.html'))) {
      pathIndex = 'dist/time-tracking/index.html';
    }
    win.loadFile(join(__dirname, pathIndex));
  }
};

app.whenReady()
  .then(() => {
    createWindow();
  });
