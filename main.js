const { app, BrowserWindow,ipcMain,dialog,Menu } = require('electron');
 const {default:installExtension,REACT_DEVELOPER_TOOLS}=require("electron-devtools-installer");
const path=require("path");

let win;
let profileUpdate=null;
function createWindow() {

    win = new BrowserWindow({
        width: 650,
        height: 800,
        webPreferences: {
            preload:path.join(__dirname,"preload.js"),
            contextIsolation:true,
            devTools: true, // 개발자 도구 활성화
        }
    });
    win.webContents.once('dom-ready', () => {
        win.webContents.executeJavaScript(`window.electron.setWindowId(${win.id})`);

    });
    win.loadURL('http://localhost:3000'); // React 개발 서버 주소
}

ipcMain.on("profile-update",(event)=>{
    if(profileUpdate){
        profileUpdate.focus();
        return;
    }
    profileUpdate=new BrowserWindow({
        width:350,
        height:500,
        webPreferences:{
            preload:path.join(__dirname,"preload.js"),
            contextIsolation:true,
            devTools: true, // 개발자 도구 활성화
        }
    });
    profileUpdate.on('closed', () => {
        profileUpdate = null; // 창이 닫힐 때 null로 설정
    });

    profileUpdate.webContents.once('dom-ready', () => {
        profileUpdate.webContents.executeJavaScript(`window.electron.setWindowId(${profileUpdate.id})`);

    });
    profileUpdate.loadURL(`http://localhost:3000/user/update`);
})


//채팅방
ipcMain.on("open-chat-room",(event,roomId)=>{
    
    let chatWin=new BrowserWindow({
        width:600,
        height:700,
        webPreferences:{
            preload:path.join(__dirname,"preload.js"),
            contextIsolation:true,
            devTools: true, // 개발자 도구 활성화
        }
    });
    chatWin.webContents.once('dom-ready', () => {
        chatWin.webContents.executeJavaScript(`window.electron.setWindowId(${chatWin.id})`);

    });
    chatWin.loadURL(`http://localhost:3000/room/${roomId}`);
})

ipcMain.on('close-window',(event,windowId)=>{
    const window=BrowserWindow.fromId(windowId);
    if(window){
        window.close();
    }
})

app.whenReady().then(()=>{
    createWindow();
    //Menu.setApplicationMenu(null);
});

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


