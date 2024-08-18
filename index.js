// const { BrowserWindow } = require("electron");

window.addEventListener("DOMContentLoaded", () => {
  //设立新窗口
  const tt = document.getElementById("ttt");
  tt.addEventListener("click", () => {
    // 尝试通信
    let indexWIN = new BrowserWindow({
      width: 100,
      height: 100,
    });
  });
  indexWIN.loadFile("test.html");
  indexWIN.on("close", () => {
    indexWIN = "null";
  });
});
