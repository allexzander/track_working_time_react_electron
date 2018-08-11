import { app, BrowserWindow, ipcMain, screen as screenElectron} from 'electron';

import MenuBuilder from './menu';
import { MENU_ACTION_TOGGLE_TIMETRACKER } from './menuactions';

import { 
  TIMER_WIDGET_NAME, 
  IPC_EVENT_TIMER_WIDGET_OPEN,
  IPC_EVENT_TIMER_WIDGET_CLOSE,
  IPC_EVENT_TIMER_WIDGET_REQUEST_CLOSE,
} from "./constants/common";

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

const toggleTimeTrackerWidget = () => {
  if (timeTrackerWindow) {
    timeTrackerWindow.close();
  }
  else {
    mainWindow.webContents.send(IPC_EVENT_TIMER_WIDGET_OPEN);
  }
}

MenuActionsMap[MENU_ACTION_TOGGLE_TIMETRACKER] = function MENU_ACTION_TOGGLE_TIMETRACKER () {
  toggleTimeTrackerWidget();
}

ipcMain.on(IPC_EVENT_TIMER_WIDGET_REQUEST_CLOSE, (event) => {
  if (timeTrackerWindow) {
    toggleTimeTrackerWidget();
  }
});

const initCustomBrowserWindowOpenLogic = (mainWindow) => {
  mainWindow.webContents.on('new-window', (event, url, frameName, disposition, options, additionalFeatures) => {
    if (frameName === TIMER_WIDGET_NAME) {
      
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
        mainWindow.webContents.send(IPC_EVENT_TIMER_WIDGET_CLOSE);
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
    webPreferences: {
      nativeWindowOpen: true
    }
  });

  initCustomBrowserWindowOpenLogic(mainWindow);

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

  const menuBuilder = new MenuBuilder(mainWindow, MenuActionsMap);
  menuBuilder.buildMenu();
});
