const { app, BrowserWindow,ipcMain,dialog } = require('electron');
 const {default:installExtension,REACT_DEVELOPER_TOOLS}=require("electron-devtools-installer");
const path=require("path");

let win;
function createWindow() {
     installExtension(REACT_DEVELOPER_TOOLS)
     .then((name)=>console.log(`Added Extension:${name}`))
     .catch((err)=>console.log(`An error occurred :`,err));
    win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            preload:path.join(__dirname,"preload.js"),
            contextIsolation:true,
            devTools: true, // 개발자 도구 활성화
        }
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


