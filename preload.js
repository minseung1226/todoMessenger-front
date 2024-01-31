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
    },
    minimize:()=>{
        ipcRenderer.send("minimize-window",window.id)
    },
    maximize:()=>{
        ipcRenderer.send("maximize-window",window.id)
    },
    unmaximize:()=>{
        ipcRenderer.send("unmaximize-window",window.id);
    },
    isMaximized:async()=>{
        ipcRenderer.invoke("is-maximized",window.id)
        return await ipcRenderer.invoke("is-maximized", window.id);
    }

});




