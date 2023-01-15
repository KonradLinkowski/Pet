const { app, BrowserWindow, screen, Tray, Menu } = require('electron')
const { join } = require('path')

const createWindow = (random = false) => {
  const display = screen.getPrimaryDisplay()

  const width = 300
  const height = 300

  const defaultX = display.bounds.width - width - 100
  const defaultY = display.bounds.height - height - 100

  const x = random ? Math.floor(Math.random() * (display.bounds.width - width)) : defaultX
  const y = random ? Math.floor(Math.random() * (display.bounds.height - height)) : defaultY

  const window = new BrowserWindow({
    width,
    height,
    x,
    y,
    transparent: true,
    frame: false,
    alwaysOnTop: true,
    movable: true,
    minimizable: false,
    skipTaskbar: true,
    closable: false,
    resizable: false,
  })

  window.loadFile('index.html')
}


app.whenReady().then(() => {
  createWindow()

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })

  const tray = new Tray(join(__dirname, 'pepe.png'))

  tray.addListener('click', () => {
    createWindow(true)
  })

  const contextMenu = Menu.buildFromTemplate([
    {
      label: 'Quit', type: 'normal', click: () => {
        app.exit()
      }
    }
  ])

  tray.setContextMenu(contextMenu)
}).catch(error => {
  console.error(error)
})

app.on('window-all-closed', () => {
  return false
})

app.on('before-quit', () => {
  for (const window of BrowserWindow.getAllWindows()) {
    window.removeAllListeners('close');
    window.close();
  }
});

