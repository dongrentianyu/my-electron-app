window.addEventListener("DOMContentLoaded", () => {
  const replaceText = (selector, text) => {
    const element = document.getElementById(selector);
    if (element) element.innerText = text;
  };

  for (const type of ["chrome", "node", "electron"]) {
    replaceText(`${type}-version`, process.versions[type]);
  }
});

const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("versions", {
  node: () => process.versions.node,
  chrome: () => process.versions.chrome,
  electron: () => process.versions.electron,
  ping: () => ipcRenderer.invoke("ping"),
  // 除函数之外，我们也可以暴露变量
});

contextBridge.exposeInMainWorld("electronAPI", {
  setTitle: (title) => ipcRenderer.send("set-title", title),
});

// 发送消息到主进程请求创建窗口
ipcRenderer.send("");

// 监听主进程的响应
ipcRenderer.on("reply", (event, message) => {
  console.log("Message from main:", message);
});

// 监听窗口创建完成的消息
ipcRenderer.on("window-created", (event, message) => {
  console.log(message);
  // 可以在这里发送消息给主进程
  ipcRenderer.send("renderer-message", "Hello from Renderer!");
});
