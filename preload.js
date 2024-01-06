const { contextBridge, ipcRenderer, BrowserWindow } = require('electron');

contextBridge.exposeInMainWorld('electron', {
    send: (channel, data) => {
        ipcRenderer.send(channel, data);
    },
    receive:(channel,func)=>{
        ipcRenderer.on(channel,(event,...args)=>func(...args))
    },
    setWindowId: (id) => {
        window.id = id;
    },
    closeWindow:()=>{
        ipcRenderer.send('close-window',window.id);
    }

});


