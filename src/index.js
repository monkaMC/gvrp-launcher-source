const { app, BrowserWindow } = require('electron');
const path = require('path');
const { ipcMain } = require('electron')

const Store = require('electron-store');
const { autoUpdater } = require("electron-updater");


/*
const server = "https://gvrp.to/launcher"
const feed = `${server}/update/${process.platform}/${app.getVersion()}`
autoUpdater.setFeedURL(feed)

setInterval(() => {
  autoUpdater.checkForUpdates()
}, 60000)

autoUpdater.on('update-downloaded', (event, releaseNotes, releaseName) => {
  const dialogOpts = {
      type: 'info',
      buttons: ['Neustarten', 'Nicht jetzt!'],
      title: 'Update',
      message: process.platform === 'win32' ? releaseNotes : releaseName,
      detail: 'Neue Launcher Version verfügbar!'
  }

  dialog.showMessageBox(dialogOpts).then((returnValue) => {
      if (returnValue.response === 0) autoUpdater.quitAndInstall()
  })
})

autoUpdater.on('error', message => {
  console.error('Fehler beim installieren! -> Code:')
  console.error(message)
})*/

let mainWindow
let LoginWindow
ipcMain.on('hideMainxd', _ => {
  win = null;
  if (process.platform !== 'darwin') {
    mainWindow.hide();
  }
});
const store = new Store();
// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) { // eslint-disable-line global-require
  app.quit();
}

const createWindow = () => {
  // Create the browser window.
   LoginWindow = new BrowserWindow({
    width: 300,
    height: 500,
    titleBarStyle: 'hidden',
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      enableRemoteModule: true,
    }

  });

  // and load the index.html of the app.
  LoginWindow.loadFile(path.join(__dirname, 'login.html'));

  // Open the DevTools.
 // mainWindow.webContents.openDevTools();
};

ipcMain.on('closed', _ => {
  win = null;
  if (process.platform !== 'darwin') {
    app.quit();
    console.log("FORTNITE")
  }
});

ipcMain.on('openMainWindow', _ => {
  win = null;
  if (process.platform !== 'darwin') {
    app.quit();
    createMainWindow();
  }
});


ipcMain.on('openAccountWindow', _ => {
  win = null;
  if (process.platform !== 'darwin') {
    app.quit();
    createAccountWindow();
  }
});




ipcMain.on('openSettings', _ => {
  win = null;
  if (process.platform !== 'darwin') {
    createSettings();
  }
});
ipcMain.on('closeall', _ => {
  win = null;
  if (process.platform !== 'darwin') {
    app.quit();
  }
});




const createMainWindow = () => {
  // Create the browser window.
   mainWindow = new BrowserWindow({
    width: 1400,
    height: 650,
    titleBarStyle: 'hidden',
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      enableRemoteModule: true,
      preload: path.join(__dirname, 'preload.js'),



        }
  });

  // and load the index.html of the app.
  mainWindow.loadFile(path.join(__dirname, 'index.html'));

  // Open the DevTools.
//  mainWindow.webContents.openDevTools();
};
let settingsWindow
const createSettings = () => {
  // Create the browser window.
   settingsWindow = new BrowserWindow({
    width: 600,
    height: 600,
    titleBarStyle: 'hidden',
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      enableRemoteModule: true,



        }
  });

  // and load the index.html of the app.
  settingsWindow.loadFile(path.join(__dirname, 'settings.html'));

  // Open the DevTools.
//  mainWindow.webContents.openDevTools();
};
let accountWindow
const createAccountWindow = () => {
  // Create the browser window.
   accountWindow = new BrowserWindow({
    width: 600,
    height: 600,
    titleBarStyle: 'hidden',
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      enableRemoteModule: true,



        }
  });

  // and load the index.html of the app.
  accountWindow.loadFile(path.join(__dirname, 'account.html'));

  // Open the DevTools.
//  mainWindow.webContents.openDevTools();
};
ipcMain.on('hideSettings', _ => {
  win = null;
  if (process.platform !== 'darwin') {
    settingsWindow.hide();
  }
});

ipcMain.on('hideAccounts', _ => {
  win = null;
  if (process.platform !== 'darwin') {
    accountWindow.hide();
  }
});

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.
