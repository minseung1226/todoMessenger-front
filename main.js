const { app, BrowserWindow, ipcMain, dialog, Menu, Notification, screen } = require('electron');
const { default: installExtension, REACT_DEVELOPER_TOOLS } = require("electron-devtools-installer");
const path = require("path");

let win;
let profileUpdate = null;
function createWindow() {

    win = new BrowserWindow({
        width: 900,
        height: 800,
        frame: false,
        webPreferences: {
            preload: path.join(__dirname, "preload.js"),
            contextIsolation: true,
            devTools: true, // 개발자 도구 활성화
        }
    });
    win.webContents.once('dom-ready', () => {
        win.webContents.executeJavaScript(`window.electron.setWindowId(${win.id})`);

    });
    //Menu.setApplicationMenu(null); // 전체 메뉴 비활성화
    win.loadURL('http://localhost:3000'); // React 개발 서버 주소
}



ipcMain.on("profile-update", (event) => {
    if (profileUpdate) {
        profileUpdate.focus();
        return;
    }
    profileUpdate = new BrowserWindow({
        width: 350,
        height: 500,
        frame: false,
        resizable:false,
        webPreferences: {
            preload: path.join(__dirname, "preload.js"),
            contextIsolation: true,
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
ipcMain.on("open-chat-room", (event, roomId) => {

    let chatWin = new BrowserWindow({
        width: 500,
        height: 700,
        webPreferences: {
            preload: path.join(__dirname, "preload.js"),
            contextIsolation: true,
            devTools: true, // 개발자 도구 활성화
        }
    });
    chatWin.webContents.once('dom-ready', () => {
        chatWin.webContents.executeJavaScript(`window.electron.setWindowId(${chatWin.id})`);

    });
    chatWin.loadURL(`http://localhost:3000/room/${roomId}`);
})

ipcMain.on("message-alert", (event, chatId) => {
    const { width, height } = screen.getPrimaryDisplay().workAreaSize;
    let messageWin = new BrowserWindow({
        width: 300,
        height: 80,
        x: width - 300,
        y: height - 80,
        frame: false,
        alwaysOnTop: true,
        skipTaskbar: true,
        transparent: true,
        webPreferences: {
            preload: path.join(__dirname, "preload.js"),
            contextIsolation: true,
            devTools: true, // 개발자 도구 활성화
            contextIsolation: true,
            nodeIntegration: false
        }


    });
    messageWin.webContents.once('dom-ready', () => {
        messageWin.webContents.executeJavaScript(`window.electron.setWindowId(${messageWin.id})`);

    });
    messageWin.loadURL(`http://localhost:3000/message/${chatId}`);
    setTimeout(() => {
        messageWin.hide(); // 5초 후에 창 닫기
    }, 5000);
})
ipcMain.on('close-window', (event, windowId) => {
    const window = BrowserWindow.fromId(windowId);
    if (window) {
        window.close();
    }
})

ipcMain.on('minimize-window', (event, windowId) => {
    const window = BrowserWindow.fromId(windowId);
    if (window) {
        window.minimize();
    }
})

ipcMain.on('maximize-window', (event, windowId) => {
    const window = BrowserWindow.fromId(windowId);
    if (window) {
        window.maximize();
    }
})
ipcMain.on("unmaximize-window",(event,windowId)=>{
    const window=BrowserWindow.fromId(windowId);
    if(window){
        window.unmaximize();
    }
})
ipcMain.handle("is-maximized",async(event,windowId)=>{
    const window=BrowserWindow.fromId(windowId);
    return window ? window.isMaximized() : false;
})
app.whenReady().then(() => {
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


