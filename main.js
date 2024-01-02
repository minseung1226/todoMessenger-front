const { app, BrowserWindow,ipcMain,dialog } = require('electron');
const path=require("path");

let win;
function createWindow() {
    win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            partition:"persist:myApp",
            preload:path.join(__dirname,"preload.js"),
            contextIsolation:true,
            devTools: true, // 개발자 도구 활성화
        }
    });

    win.loadURL('http://localhost:3000'); // React 개발 서버 주소
}
ipcMain.on("open-chat-room",(event,roomId)=>{
    let chatWin=new BrowserWindow({
        width:500,
        height:700,
        webPreferences:{
            partition:"persist:myApp",
            preload:path.join(__dirname,"preload.js"),
            contextIsolation:true,
            devTools: true, // 개발자 도구 활성화
        }
    });

    chatWin.loadURL(`http://localhost:3000/room/${roomId}`);
})

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


