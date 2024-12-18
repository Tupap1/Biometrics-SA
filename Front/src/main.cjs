const { app, BrowserWindow } = require('electron')
const path = require('node:path')

function createWindow () {

  const mainWindow = new BrowserWindow({
    width: 1024,
    height: 950,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  })


  mainWindow.loadURL('http://localhost:5173/')


}


app.whenReady().then(() => {
  createWindow()

  app.on('activate', function () {
   
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})


app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})

