# Packaging/Distributing Electron Applications

This has to be one of the most mind-tearing/frustrating part of electron that has most people on edge. Albeit they have all sorts of packages and boilerplates that make this process a lot easier.

That being said lets go ahead and package our application.

### Step 1: Preparing for build
In order for our application to be built we are going to make use of three npm packages:
`electron-packager` && `electron-builder` && `asar`.

These three packages make the building of the application simple and easy for new users.

After those are loaded we are going to create a builder.json that hosts the configuration of our application to be build and distributed.

In this build file we have to set up some parameters per environment we are building to.
The first portion is the OSX build that requires some fields to be present at the time of distribution and building of the application.

build.json:
```json
{
  "osx" : {
    "title": "Electron-workshop",
    "background": "assets/osx/background.png",
    "icon": "assets/osx/logo.icns",
    "icon-size": 128,
    "contents": [
      { "x": 355, "y": 125, "type": "link", "path": "/Applications" },
      { "x": 155, "y": 125, "type": "file" }
    ]
  },
  "win" : {
    "title" : "Electron-workshop",
    "icon" : "assets/win/logo.ico"
  }
}
```
The build.json will be used when we use the electron-builder that will be passed in with a config flag `--config=build.json`.
Now that we have this build.json now we can set up our tasks to be run for or build.

Now in out package.json we are going to add some scripts. Now we dont have to use npm to run our scripts but it just makes it a lot easier and less set up.

There are three main tasks with configs for an osx and windows environment.

`pack`: This is the command that we run as we build this application that runs `electron-packager` and then the `build` task
`clean`: This script just gets rid of any previous builds incase we need to re-build our application
`build`: This is run after the packager has packaged out application runs our builder inside of our newly created `./dist` file. And compiles the code to be distributed to each environment

```json
"scripts": {
  "clean": "rm -rf ./dist",
  "clean:osx": "rm -rf ./dist/osx",
  "clean:win": "rm -rf ./dist/win",
  "pack": "npm run clean && npm run pack:osx && npm run pack:win",
  "pack:osx": "npm run clean:osx && electron-packager ./app \"Electron-workshop\" --out=dist/osx --platform=darwin --arch=x64 --version=0.36.2 --icon=assets/osx/logo.icns --ignore=dist --ignore=assets --ignore=builder.json --ignore=bower.json --ignore=README.md --ignore=.gitignore --ignore=preview.png",
  "pack:win": "npm run clean:win && electron-packager ./app \"Electron-workshop\" --out=dist/win --platform=win32 --arch=ia32 --version=0.36.2 --icon=assets/win/logo.ico --ignore=dist --ignore=assets --ignore=builder.json --ignore=bower.json --ignore=README.md --ignore=.gitignore --ignore=preview.png",
  "build": "npm run build:osx && npm run build:win",
  "build:osx": "npm run pack:osx && electron-builder \"dist/osx/Electron-workshop-darwin-x64/EA electron-worskop.app\" --platform=osx --out=\"dist/osx\" --config=builder.json",
  "build:win": "npm run pack:win && electron-builder \"dist/win/Electron-workshop-win32-ia32\" --platform=win --out=\"dist/win\" --config=builder.json"
}
```

After we define our script lets go ahead and do a test run. Depending on which environment you are working on:

  npm run pack:osx || npm run pack:win

And now go into your application through your file explorer and try to run it.

If it works:

## Congradulations!!!
