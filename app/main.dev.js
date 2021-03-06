import { app, BrowserWindow, ipcMain, screen as screenElectron} from 'electron';

import MenuBuilder from './menu';
import { MENU_ACTION_TOGGLE_TIMETRACKER } from './menuactions';

import { 
  TIMER_WIDGET_NAME, 
  IPC_EVENT_TIMER_WIDGET_OPEN,
  IPC_EVENT_TIMER_WIDGET_CLOSE,
} from "./constants/common";

let mainWindow = null;
let timeTrackerWindow = null;

const SizeMainWindow = {
  width: 928,
  height: 384,
}

const SizeTimeTracker = {
  width: 244,
  height: 62,
}

const TimeTrackerWindowPositionOffset = 10;

const toggleTimeTrackerWidget = () => {
  if (timeTrackerWindow) {
    mainWindow.webContents.send(IPC_EVENT_TIMER_WIDGET_CLOSE);
  }
  else {
    mainWindow.webContents.send(IPC_EVENT_TIMER_WIDGET_OPEN);
  }
}

//override default window open logic, for sake of sending the entire BrowserWindow handle to React instead of BrowserWindowProxy
const InitTimeTrackerWindowOpenLogic = (parentWindowHandle) => {
  parentWindowHandle.webContents.on('new-window', (event, url, frameName, disposition, options, additionalFeatures) => {
    if (frameName === TIMER_WIDGET_NAME) {
      
      const primaryDisplay = screenElectron.getPrimaryDisplay();

      //position bottom right corner
      const positionX = primaryDisplay.size.width - SizeTimeTracker.width - TimeTrackerWindowPositionOffset;
      const positionY = primaryDisplay.size.height - SizeTimeTracker.height - TimeTrackerWindowPositionOffset;

      event.preventDefault()
      Object.assign(options, {
        x: positionX,
        y: positionY,
        width: SizeTimeTracker.width,
        height: SizeTimeTracker.height,
        alwaysOnTop: true,
        resizable: false,
        frame: false,
        transparent: true,
        minimizable: false,
        maximizable: false,
      })

      timeTrackerWindow = new BrowserWindow(options);
      event.newGuest = timeTrackerWindow;

      timeTrackerWindow.on('closed', () => {
        timeTrackerWindow = null;
      });
    }
  })
}

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

app.on('window-all-closed', () => {
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
    resizable: false,
    center: true,
    webPreferences: {
      nativeWindowOpen: true
    }
  });

  InitTimeTrackerWindowOpenLogic(mainWindow);

  mainWindow.loadURL(`file://${__dirname}/app.html`);

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

  const MenuActionsMap = {};

  MenuActionsMap[MENU_ACTION_TOGGLE_TIMETRACKER] = function MENU_ACTION_TOGGLE_TIMETRACKER () {
    toggleTimeTrackerWidget();
  }

  const menuBuilder = new MenuBuilder(mainWindow, MenuActionsMap);
  menuBuilder.buildMenu();
});
