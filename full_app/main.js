/* eslint strict: 0*/
'use strict';
// Electron module provided by electron-prebuil
const electron = require('electron'); // eslint-disable-line import/no-unresolved
const BrowserWindow = electron.BrowserWindow;
const Menu = electron.Menu;
const app = electron.app;
// const crashReporter = electron.crashReporter;
let menu = null;
let mainWindow = null;
// crashReporter.start({
//   productName: 'YourName',
//   companyName: 'YourCompany',
//   submitURL: 'https://your-domain.com/url-to-submit',
//   autoSubmit: true
// });

const template = [
  {
    label: 'Edit',
    submenu: [
      {
        label: 'Undo',
        accelerator: 'CmdOrCtrl+Z',
        role: 'undo'
      },
      {
        label: 'Redo',
        accelerator: 'Shift+CmdOrCtrl+Z',
        role: 'redo'
      },
      {
        type: 'separator'
      },
      {
        label: 'Cut',
        accelerator: 'CmdOrCtrl+X',
        role: 'cut'
      },
      {
        label: 'Copy',
        accelerator: 'CmdOrCtrl+C',
        role: 'copy'
      },
      {
        label: 'Paste',
        accelerator: 'CmdOrCtrl+V',
        role: 'paste'
      },
      {
        label: 'Select All',
        accelerator: 'CmdOrCtrl+A',
        role: 'selectall'
      },
    ]
  },
  {
    label: 'View',
    submenu: [
      {
        label: 'Reload',
        accelerator: 'CmdOrCtrl+R',
        click(item, focusedWindow) {
          if (focusedWindow) focusedWindow.reload();
        }
      },
      {
        label: 'Developer',
        submenu: [
          {
            label: 'Toggle Full Screen',
            accelerator: process.platform === 'darwin' ? 'Ctrl+Command+F' : 'F11',
            click(item, focusedWindow) {
              if (focusedWindow) {
                focusedWindow.setFullScreen(!focusedWindow.isFullScreen());
              }
            }
          },
          // development implementation only remove from distributed application
          {
            label: 'Toggle Developer Tools',
            accelerator: process.platform === 'darwin' ? 'Alt+Command+I' : 'Ctrl+Shift+I',
            click(item, focusedWindow) {
              if (focusedWindow) {
                focusedWindow.webContents.toggleDevTools();
              }
            },
          }
        ]
      },
    ]
  }, // end of view menu section
  {
    label: 'Window',
    role: 'window',
    submenu: [
      {
        label: 'Minimize',
        accelerator: 'CmdOrCtrl+M',
        role: 'minimize'
      },
      {
        label: 'Close',
        accelerator: 'CmdOrCtrl+W',
        role: 'close'
      },
    ]
  },
  {
    label: 'Help',
    role: 'help',
    submenu: [
      {
        label: 'Learn More',
        click() { electron.shell.openExternal('http://electron.atom.io'); }
      },
    ]
  },
];
if (process.platform === 'darwin') {
  const name = electron.app.getName();
  template.unshift({
    label: name,
    submenu: [
      {
        label: `About ${name}`,
        role: 'about'
      },
      {
        type: 'separator'
      },
      {
        label: 'Services',
        role: 'services',
        submenu: []
      },
      {
        type: 'separator'
      },
      {
        label: `Hide  + ${name}`,
        accelerator: 'Command+H',
        role: 'hide'
      },
      {
        label: 'Hide Others',
        accelerator: 'Command+Alt+H',
        role: 'hideothers'
      },
      {
        label: 'Show All',
        role: 'unhide'
      },
      {
        type: 'separator'
      },
      {
        label: 'Quit',
        accelerator: 'Command+Q',
        click() { app.quit(); }
      },
    ]
  });
  // Window menu.
  template[3].submenu.push(
    {
      type: 'separator'
    },
    {
      label: 'Bring All to Front',
      role: 'front'
    }
  );
}

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('ready', () => {
  mainWindow = new BrowserWindow({ width: 800, height: 600, title: 'Electron Workshop' });
  const systemPath = 'file://';
  const index = '/index.html';

  mainWindow.loadURL(systemPath + __dirname + index);

  mainWindow.on('closed', () => {
    mainWindow = null;
  });

  // Handle Menu code here and only run when menu is not built
  if (menu === null) {
    menu = Menu.buildFromTemplate(template);
    Menu.setApplicationMenu(menu);
  }
});

app.on('activate', () => {
  if (mainWindow === null) {
    mainWindow = new BrowserWindow({ width: 800, height: 600 });
    const systemPath = 'file://';
    const index = '/index.html';

    mainWindow.loadURL(systemPath + __dirname + index);

    mainWindow.on('closed', () => {
      mainWindow = null;
    });

    // Handle Menu code here
    menu = Menu.buildFromTemplate(template);
    Menu.setApplicationMenu(menu);
  }
});
