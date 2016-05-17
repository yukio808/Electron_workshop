# Hello Electron

Well first things first. Lets get started with rendering our electronJS application.
In these steps we will go over the bare bones set up of a electronJS application.

### Step 1: Outline
Use the main.js file provided in the `app` directory as your starting point of your application.
In this file we are going to set up the methods for controlling our application
Copy and paste this block code into your main.js file.
```javascript
/* eslint strict: 0*/
'use strict';
/**
 * Electron main application
 * Import required packages
 * @required electron
 */

/**
 * Create contructors
 * Create a constuctor for the window and electron application
 * @implements electron
 * @const BrowserWindow
 * @const app
 */

// keep reference to window to be constructed or else window will automatically close on
// on-ready function when it gets garbage collected.
let mainWindow = null;

app.on('window-all-closed', () => {
   /**
   * Handle window-all-closed event
   *
   * close applicaton when all windows are closed if we are not on a darwin system
   * 		proccess.platform; returns the platform the application is running on
   */

 });
// Most work will be done in the on "ready" handler
app.on('ready', () => {
  /**
   * Construct a new Browser Window
   * @implements mainWindow
   * Store a new Browser window to mainWindow variable.
   *
   * Set the Url of the new window created using the loadURL method
   * 		set the url to the file path of the index.html document
   * @example 'file://${__dirname}/app/app.html'
   * Handle on Close event on the window to set the mainWindow back to null;
   * 		This will remove the windows its saved states but not stop the application
   */
});
app.on('activate', () => {
  /**
   * RE-Cap of on ready:
   * Construct a new Browser Window only when mainWindow = null
   * @implements mainWindow
   * Store a new Browser window to mainWindow variable.
   *
   * Set the Url of the new window created using the loadURL method
   * 		set the url to the file path of the index.html document
   * 		or possibly have a store method to save on darwin the previous view rendered
   * @example 'file://${__dirname}/app/app.html'
   * Handle on Close event on the window to set the mainWindow back to null;
   * 		This will remove the windows its saved states but not stop the application
   */
});

```

### Step 2: Packages and constructors
First were going to require electron
```javascript
/* eslint strict: 0*/
'use strict';
/**
 * Electron main application
 * Import required packages
 * @required electron
 */
 const electron = require('electron'); // eslint-disable-line import/no-unresolved

/**
 * Create contructors
 * Create a constuctor for the window and electron application
 * @implements electron
 * @const BrowserWindow
 * @const app
 */
 const BrowserWindow = electron.BrowserWindow;
 const app = electron.app;
```

The electron package will be provided by the electron-prebuilt package you installed globally on your system.

### Step 3: All windows closed
Here we are going to hanlde the code for when we close the application when all the windows are closed when not running on a darwin based platform.
```javascript
app.on('window-all-closed', () => {
   /**
   * Handle window-all-closed event
   *
   * close application when all windows are closed if we are not on a darwin system
   * 		process.platform; returns the platform the application is running on
   */
   if (process.platform !== 'darwin') {
     app.quit();
   }
 });
```

The reason for this is because on osx the application will most likely still be active until you explicitly quit the application by cmd + Q.

### Step 4: Rendering the application window
There are 2 parts we need to handle in our code for rendering the application. The on 'ready' and 'activate' event handlers.
On the ready portion we are going to construct the browser window and "save" it to mainWindow. The reason we do this is because when the ready function is finished the window will be GC'ed (Garbage Collected) at the end of the on ready function.
```javascript
app.on('ready', () => {
  /**
   * Construct a new Browser Window
   * @implements mainWindow
   * Store a new Browser window to mainWindow variable.
   *
   * Set the Url of the new window created using the loadURL method
   * 		set the url to the file path of the index.html document
   * @example 'file://${__dirname}/app/app.html'
   * Handle on Close event on the window to set the mainWindow back to null;
   * 		This will remove the windows its saved states but not stop the application
   */
   mainWindow = new BrowserWindow({ width: 800, height: 600, title: 'Electron Workshop'});

   const systemPath = 'file://';
   const initialFileOnStart = '/index.html';
   mainWindow.loadURL(systemPath + __dirname + initialFileOnStart);

   mainWindow.on('closed', () => {
     mainWindow = null;
   });
});
```
Next we are going to handle the activate function. This is triggered when someone most likely clicks on the icon for the application.
It will be pretty much a recap of the on ready function but checking if the mainWindow is not null.

```javascript
app.on('activate', () => {
  /**
   * RE-Cap of on ready:
   * Construct a new Browser Window only when mainWindow = null
   * @implements mainWindow
   * Store a new Browser window to mainWindow variable.
   *
   * Set the Url of the new window created using the loadURL method
   * 		set the url to the file path of the index.html document
   * 		or possibly have a store method to save on darwin the previous view rendered
   * @example 'file://${__dirname}/app/app.html'
   * Handle on Close event on the window to set the mainWindow back to null;
   * 		This will remove the windows its saved states but not stop the application
   */
  if (mainWindow === null) {
    mainWindow = new BrowserWindow({ width: 800, height: 600 });
    const systemPath = 'file://';
    const index = '/index.html';

    mainWindow.loadURL(systemPath + __dirname + index);

    mainWindow.on('closed', () => {
      mainWindow = null;
    });

    // Handle Menu code here
    const menu = Menu.buildFromTemplate(template);
    Menu.setApplicationMenu(menu);
  }
});

```

### Step 5: Start your application

Now that we have the bare bones of our application finished lets run it and test it out.

    `electron ./path_to_your_app  || npm run start`

If you've done all the steps correctly you should have a working starter application.

## Move on to: MENU_RENDERING.md
