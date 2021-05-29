// Modules to control application life and create native browser window
const { app, BrowserWindow, Tray, Menu, dialog } = require("electron");
const EventEmitter = require('events')
const axios = require('axios')
const path = require("path");

function createWindow() {

  // *Initialize
  const instance = axios.create();
  const loadingEvents = new EventEmitter()
  // Create the browser window.A
  const mainWindow = new BrowserWindow({
    show: false,
    width: 1355,
    height: 700,
    frame: false,
    resizable: false,
    title: "DropTask"
  });
  // Create the browser window.B
  const mainLoadWindow = new BrowserWindow({
    width: 350,
    height: 500,
    frame: false,
    resizable: false,
    title: "Loading..."
  });

  // *Options
  const dialogOptions = {
    type: 'error',
    buttons: ['Close'],
    defaultId: 1,
  };

  instance.defaults.timeout = 60000; // Axios timeout

  // *Starting
  mainLoadWindow.loadURL("https://droptasks.netlify.app/loading");

  loadingEvents.on("finished", () => {
    mainWindow.show(true)
    mainWindow.loadURL("https://droptasks.netlify.app/")
    mainLoadWindow.close()
  })

  const appReady = () => {
    instance.post(" https://dropdeads-mysql.herokuapp.com/ready").then(res => {
      if (res.status === 200) {
        loadingEvents.emit("finished")
      } else {
        dialog.showMessageBox(null, {
          ...dialogOptions,
          title: 'Error',
          message: 'We cant connect with the database.',
          detail: 'Bad Response',
        }).then(res => {
          mainLoadWindow.close()
          if (res) {
            app.quit()
          }
        })
      }
    }).catch(err => {
      if (err) {
        dialog.showMessageBox(null, {
          ...dialogOptions,
          title: 'Error',
          message: 'We cant connect with the database.',
          detail: 'Time Out',
        }).then(res => {
          mainLoadWindow.close()
          if (res) {
            app.quit()
          }
        })
      }
    })
  }

  appReady()
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.

app.whenReady().then(createWindow);

// Quit when all windows are closed.
app.on("window-all-closed", function () {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== "darwin") app.quit();
});

app.on("activate", function () {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) createWindow();
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.