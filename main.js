const { app, BrowserWindow, Menu } = require("electron");
const path = require("path");

const isDev = process.env.NODE_DEV !== "production";
const isMac = process.platform === "darwin";

// create the main window
const createMainWindow = () => {
  const mainWindow = new BrowserWindow({
    title: "Image resizer app",
    width: isDev ? 1000 : 500,
    height: 800,
    webPreferences: {
      contextIsolation: true,
      nodeIntegration: true,
      preload: path.join(__dirname, "preload.js"),
    },
  });

  // open dev tools if in dev env
  if (isDev) mainWindow.webContents.openDevTools();

  // renderer inde file
  mainWindow.loadFile(path.join(__dirname, "./renderer/index.html"));
};

// create about window
const createAboutWindow = () => {
  const aboutWindow = new BrowserWindow({
    icon: "./assets/upload.png",
    title: "About - Image resizer",
    width: 300,
    height: 200,
  });

  aboutWindow.loadFile(path.join(__dirname, "./renderer/about.html"));
};

// app is ready
app
  .whenReady()
  .then(() => {
    createMainWindow();

    // menu template implement
    const mainMenu = Menu.buildFromTemplate(menu);
    Menu.setApplicationMenu(mainMenu);

    app.on("activate", () => {
      if (BrowserWindow.getAllWindows().length === 0) createMainWindow();
    });
  })
  .catch((error) => console.log(error));

// menu template
const menu = [
  {
    label: app.name,
    submenu: [
      {
        label: "About us",
        click: () => createAboutWindow(),
        accelerator: "Ctrl+a",
      },
    ],
  },
  {
    label: "File",
    submenu: [
      {
        label: "Quit",
        click: () => app.quit(),
        accelerator: "CmdOrCtrl+w",
      },
    ],
  },
  {
    label: "Reload",
    submenu: [
      {
        label: "Window reload",
        click: () => app.relaunch(),
        accelerator: "CmdOrCtrl+r",
      },
    ],
  },
];

app.on("window-all-closed", () => {
  if (!isMac) app.quit();
});
