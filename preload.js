const path = require("path");
const os = require("os");
const { contextBridge } = require("electron");

contextBridge.exposeInMainWorld("os", {
  process
  homedir: () => os.homedir(),
});

contextBridge.exposeInMainWorld("path", {
  join: (...argument) => path.join(...argument),
});
