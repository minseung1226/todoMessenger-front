const { app, BrowserWindow,ipcMain,dialog,Menu } = require('electron');
 const {default:installExtension,REACT_DEVELOPER_TOOLS}=require("electron-devtools-installer");
const path=require("path");

let win;
function createWindow() {

    win = new BrowserWindow({
        width: 800,
        height: 600,
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

//사용자 검색 
ipcMain.on("user-search",(event)=>{
    let userSearchWin=new BrowserWindow({
        width:400,
        height:500,
        webPreferences:{
            preload:path.join(__dirname,"preload.js"),
            contextIsolation:true,
            devTools:true,  
        }
    })
    userSearchWin.webContents.once('dom-ready', () => {
        userSearchWin.webContents.executeJavaScript(`window.electron.setWindowId(${userSearchWin.id})`);

    });
    userSearchWin.loadURL("http://localhost:3000/user/search");
})




//채팅방
ipcMain.on("open-chat-room",(event,roomId)=>{
    
    let chatWin=new BrowserWindow({
        width:500,
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


