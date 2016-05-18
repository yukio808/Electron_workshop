# Using Electron API's

In this portion we will be going over one the electron API's in a front end application to capture screenshots on our desktop. The example has been modified and referenced from  https://github.com/hokein/electron-sample-apps/tree/master/desktop-capture.

### render process vs main process

Before we get too fancy however, we are going to go over the basic process model for a electron application. Now there are2 parts to the process that electron runs and that is the render process and the main process. To differentiate between the two, I like to think of it as a front-end and back-end. The back end which is the main process model controls the GUI for how the app runs and how the front-end render process is handled. and manages each instance. A render process is created when we create a new `BrowserWindow`. Each Browser Window has its own instance of the render process. So when a Browser Window is exited or destroyed its render process is also terminated. This is all tracked by the Main Process. There are many ways that the render process can communicate to the main process to change the behavior of the application. This is done throughout the IPCRender and IPCMain modules provided by electron that has a bunch of Event listeners that can be created. This style of communication mitigates the risk of source leaking and access to content that you don't want your user or you to be able to access.

### Desktop-Capture
For this example that has been provided to you, we will show you how to use the desktop-capture module provided by electron. The desktop-capture module provides methods to `getUserMedia` sources for capturing audio, video, and images from a microphone, camera, or screen.

In this application we used the `getUserMedia` api to show all the windows you are running.

If you take a look in your app.js file in the js folder of your app you will see we are using node methods in the render process of our application.

```javascript
window.$ = window.jQuery = require('./js/jquery.js');
require('./js/image-picker.js');

const electron = require('electron');
const desktopCapturer = electron.desktopCapturer;
```
This is possible because electron supports the use of node-modules in the render process of the application.

To start the application Replace the contents of the index.html file with the following:
```html
<html>
  <head>
  <link href="./css/image-picker.css" rel="stylesheet">
  <style>
    body {
      background: white;
      display: -webkit-flex;
      -webkit-justify-content: center;
      -webkit-align-items: center;
      -webkit-flex-direction: column;
    }
    video {
      width: 480px;
      height: 360px;
      background: rgba(0,0,0,0.25);
    }
    button {
      display: inline-block;
      background: -webkit-linear-gradient(#F9F9F9 40%, #E3E3E3 70%);
      background: linear-gradient(#F9F9F9 40%, #E3E3E3 70%);
      border: 1px solid #999;
      -webkit-border-radius: 3px;
      border-radius: 3px;
      padding: 5px 8px;
      outline: none;
      white-space: nowrap;
      -webkit-user-select: none;
      user-select: none;
      cursor: pointer;
      text-shadow: 1px 1px #fff;
      font-weight: 700;
      font-size: 10pt;
    }
    button:hover,
    button.active {
      border-color: black;
    }
    button:active,
    button.active {
      background: -webkit-linear-gradient(#E3E3E3 40%, #F9F9F9 70%);
      background: linear-gradient(#E3E3E3 40%, #F9F9F9 70%);
    }
    video {
      background: white url(./assets/desktop.png) center no-repeat;
      border: 1px solid #e2e2e2;
      box-shadow: 0 1px 1px rgba(0,0,0,0.2);
    }
  </style>
  </head>
  <body>
    <select id="picture" class="image-picker show-html">
    </select>
    <video autoplay></video>
    <p><button>Enable Capture</button></p>

  <script src="./js/app.js"></script>
  </body>
</html>
```

Now that you are able too see the application in action lets go ahead and get aquainted with the process thats happenig here.
