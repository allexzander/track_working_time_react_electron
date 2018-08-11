/* eslint global-require: 0, flowtype-errors/show-errors: 0 */

/**
 * This module executes inside of electron's main process. You can start
 * electron renderer process from here and communicate with the other processes
 * through IPC.
 *
 * When running `yarn build` or `yarn build-main`, this file is compiled to
 * `./app/main.prod.js` using webpack. This gives us some performance wins.
 *
 * @flow
 */
import { app, BrowserWindow, screen as screenElectron, ipcMain} from 'electron';
import MenuBuilder from './menu';

import { MENU_ACTION_TOGGLE_TIMETRACKER } from './menuactions';
import TimerWidget from './components/TimerWidget';

let mainWindow = null;
let timeTrackerWindow = null;

const SizeMainWindow = {
  width: 1024,
  height: 768,
}

const SizeTimeTracker = {
  width: 250,
  height: 100,
}

const TimeTrackerWidgetPositionOffset = 10;

const MenuActionsMap = {};

MenuActionsMap[MENU_ACTION_TOGGLE_TIMETRACKER] = function MENU_ACTION_TOGGLE_TIMETRACKER () {
  console.log("MENU_ACTION_TOGGLE_TIMETRACKER");
  if (timeTrackerWindow) {
    timeTrackerWindow.close();
  }
  else {
    mainWindow.webContents.send('timer-widget-open', null);
  }
}

ipcMain.on("request_timer_widget_close", (event) => {
  console.log("request_timer_widget_close");
  if (timeTrackerWindow) {
    timeTrackerWindow.close();
  }
})

if (process.env.NODE_ENV === 'production') {
  const sourceMapSupport = require('source-map-support');
  sourceMapSupport.install();
}

if (
  process.env.NODE_ENV === 'development' ||
  process.env.DEBUG_PROD === 'true'
) {
  require('electron-debug')();
  const path = require('path');
  const p = path.join(__dirname, '..', 'app', 'node_modules');
  require('module').globalPaths.push(p);
}

const installExtensions = async () => {
  const installer = require('electron-devtools-installer');
  const forceDownload = !!process.env.UPGRADE_EXTENSIONS;
  const extensions = ['REACT_DEVELOPER_TOOLS', 'REDUX_DEVTOOLS'];

  return Promise.all(
    extensions.map(name => installer.default(installer[name], forceDownload))
  ).catch(console.log);
};

/**
 * Add event listeners...
 */

app.on('window-all-closed', () => {
  // Respect the OSX convention of having the application in memory even
  // after all windows have been closed
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('ready', async () => {
  if (
    process.env.NODE_ENV === 'development' ||
    process.env.DEBUG_PROD === 'true'
  ) {
    await installExtensions();
  }

  mainWindow = new BrowserWindow({
    show: false,
    width: SizeMainWindow.width,
    height: SizeMainWindow.height,
    webPreferences: {
      nativeWindowOpen: true
    }
  });

  mainWindow.webContents.on('new-window', (event, url, frameName, disposition, options, additionalFeatures) => {
    if (frameName === 'timer-widget-window') {
      
      const primaryDisplay = screenElectron.getPrimaryDisplay();

      const positionX = primaryDisplay.size.width - SizeTimeTracker.width - TimeTrackerWidgetPositionOffset;
      const positionY = primaryDisplay.size.height - SizeTimeTracker.height - TimeTrackerWidgetPositionOffset;

      event.preventDefault()
      Object.assign(options, {
        x: positionX,
        y: positionY,
        width: SizeTimeTracker.width,
        height: SizeTimeTracker.height,
        alwaysOnTop: true,
        resizable: false,
        frame: false,
        parent: mainWindow,
      })
      event.newGuest = new BrowserWindow(options);

      timeTrackerWindow = event.newGuest;

      timeTrackerWindow.on('closed', () => {
        mainWindow.webContents.send('timer-widget-close', null);
        timeTrackerWindow = null;
      });
    }
  })

  mainWindow.loadURL(`file://${__dirname}/app.html`);

  // @TODO: Use 'ready-to-show' event
  //        https://github.com/electron/electron/blob/master/docs/api/browser-window.md#using-ready-to-show-event
  mainWindow.webContents.on('did-finish-load', () => {
    if (!mainWindow) {
      throw new Error('"mainWindow" is not defined');
    }
    mainWindow.show();
    mainWindow.focus();
  });

  mainWindow.on('closed', () => {
    mainWindow = null;
  });

  const menuBuilder = new MenuBuilder(mainWindow, MenuActionsMap);
  menuBuilder.buildMenu();
});
