

const { contextBridge, ipcRenderer } = require('electron')


contextBridge.exposeInMainWorld('electronAPI', {
    traffic: (callback) => ipcRenderer.on('traffic', callback),
    signal: (callback) => ipcRenderer.on('signal', callback),
    status: (callback) => ipcRenderer.on('status', callback),
    deviceInfo: (callback) => ipcRenderer.on('deviceInfo', callback),
})
