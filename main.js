// main.js

// Modules to control application life and create native browser window
const { app, BrowserWindow, ipcMain } = require("electron/main");
const path = require("node:path");

const createWindow = () => {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    backgroundColor: "white",
    x: 50,
    y: 100,
    width: 800,
    height: 400,
    show: false,
    icon: "123.jpg",
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
    },
  });

  ipcMain.on("set-title", (event, title) => {
    const webContents = event.sender;
    const win = BrowserWindow.fromWebContents(webContents);
    win.setTitle(title);
  });
  // 加载 index.html
  mainWindow.loadFile("index.html");
  mainWindow.on("ready-to-show", () => {
    mainWindow.show();
  });
  // 打开开发工具
  // mainWindow.webContents.openDevTools();
  // console.log("Hello from Electron");
};

// 这段程序将会在 Electron 结束初始化
// 和创建浏览器窗口的时候调用
// 部分 API 在 ready 事件触发后才能使用。
function handleSetTitle(event, title) {
  const webContents = event.sender;
  const win = BrowserWindow.fromWebContents(webContents);
  win.setTitle(title);
}

// 模仿写一个可以新建窗口的
function yyu() {
  // 创建浏览器窗口。
  let ass = new BrowserWindow({
    width: 100,
    height: 100,
    webPreferences: {
      nodeIntegration: true, // 根据需要启用或禁用 Node.js 集成
      contextIsolation: false, // 启用或禁用上下文隔离
    },
  });

  // 加载index.html的文件
  ass.loadFile("test.html");

  // 打开开发者工具
  ass.webContents.openDevTools();

  // 设置窗口的 IPC 监听器
  ass.webContents.on("did-finish-load", () => {
    ass.webContents.send(
      "window-created",
      "Window is ready for IPC communication"
    );
  });

  // 监听来自渲染进程的消息
  ass.webContents.on("message", (event, message) => {
    console.log("Message from renderer:", message);
    // 可以在这里处理消息，并发送响应
    ass.webContents.send("reply", "Received your message: " + message);
  });
}

app.whenReady().then(() => {
  // 监听主进程中的 IPC 消息
  createWindow();
  ipcMain.on("yyu", () => {
    yyu();
  });

  ipcMain.on("set-title", handleSetTitle);
  ipcMain.handle("ping", () => "pong");
  app.on("activate", () => {
    // 在 macOS 系统内, 如果没有已开启的应用窗口
    // 点击托盘图标时通常会重新创建一个新窗口
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

// 除了 macOS 外，当所有窗口都被关闭的时候退出程序。 因此, 通常
// 对应用程序和它们的菜单栏来说应该时刻保持激活状态,
// 直到用户使用 Cmd + Q 明确退出
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});

// 在当前文件中你可以引入所有的主进程代码
// 也可以拆分成几个文件，然后用 require 导入。
