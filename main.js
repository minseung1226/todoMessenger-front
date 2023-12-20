const { app, BrowserWindow,ipcMain,dialog } = require('electron');
const path=require("path");
function createWindow() {
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            preload:path.join(__dirname,"preload.js"),
            contextIsolation:true
        }
    });

    win.loadURL('http://localhost:3000'); // React 개발 서버 주소
}
ipcMain.on("normal-box",(event,title,message)=>{
    console.log("title=",title);
    dialog.showMessageBox({
        type:"info",
        buttons:["확인"],
        title:title,
        message:message
    });
});

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow();
    }
});


