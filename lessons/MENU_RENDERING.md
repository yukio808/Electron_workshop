# Custom/Default Menu Rendering
In this lesson we will be going over the menu and how we can customize the menu and make it useful in our application.
Continuing in the main.js file in our app directory, add in these lines and follow the following steps.

### Step 1: Creating a menu template

```javascript
/**
 * Create a template for our Menu
 *
 * This template will be what we define our menu to be, all its methods, and its structor.
 * @type { Array:Objects } Array of objects.
 * @name template w/All Basic sections
 * @example template = [{
 *          	label: "label for first section of menu",
 *          	submenu: [
 *          		{
 *          			label: "label for first sub-menu item",
 *          			accelerator: "KeyBind short Cut i.e: CmdOrCtrl+Z",
 *          			role: "The function it should call/method defined by the system i.e: undo"
 *          		}
 *          	]
 * 					}]
 * Create a basic edit
 */
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
   }, // end of edit menu section
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
   },// end of window menu section
   {
     label: 'Help',
     role: 'help',
     submenu: [
       {
         label: 'Learn More About Electron',
         click() { electron.shell.openExternal('http://electron.atom.io'); }
       },
     ]
   },// end of help menu section
 ]
```
### Step 2: Handling Darwin exceptions

Now that we have our basic template for our menu we can move along. But first we should note that this menu only has the options for windows based platforms. We need to add in some of the basic darwin based menu items. This includes some of the settings and services provided to our app by the operating system.

```javascript
/**
 * Add a new template section to the beginning of the template for the menu
 *
 * Check if platform is a darwin environment and then add the code to get the name of the
 * application we set in our package.json
 * @const name = getName
 * @method getName = electron.app.getName();
 */
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
  // Window menu to bring all windows to the main screen.
  // Only available on osx/Darwin systems
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
```
### Step 3: Appending template to the application menu

Great Now we have created our full menubar. Now we just need to append it to the application. First we need to create a constructor for the menu like we did for the browser window. And then we are going to render it on the on `ready` event handler.

```javascript
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

// ...
// ...

app.on('ready', () => {
  mainWindow = new BrowserWindow({ width: 800, height: 600, title: 'Electron Workshop' });
  const systemPath = 'file://';
  const index = '/index.html';

  mainWindow.loadURL(systemPath + __dirname + index);

  mainWindow.on('closed', () => {
    mainWindow = null;
  });

  // Handle Menu code here and only run when menu is not constructed
  if (menu === null) {
    menu = Menu.buildFromTemplate(template);
    Menu.setApplicationMenu(menu);
  }
});


```

Great now we have a working menu with working methods. The next step is interacting with some of the API's inside of our application. We are going to create a desktop screen-capture application as seen in https://github.com/hokein/electron-sample-apps/tree/master/desktop-capture using the desktop-capture API in electronJS.
