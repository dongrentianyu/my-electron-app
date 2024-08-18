const information = document.getElementById("info");
information.innerText = `本应用正在使用 Chrome (v${versions.chrome()}), Node.js (v${versions.node()}), 和 Electron (v${versions.electron()})`;

const information9 = document.getElementById("info-2");
information9.innerText = `这是什么东西(v${versions.chrome()}), Node.js (v${versions.node()}), 和 Electron (v${versions.electron()})`;

const func = async () => {
  const response = await window.versions.ping();
  console.log(response); // 打印 'pong'
};

func();

/* const setButton = document.getElementById("btn");
const titleInput = document.getElementById("title");
setButton.addEventListener("click", () => {
  const title = titleInput.value;
  window.electronAPI.setTitle(title);
}); */

//设立新窗口
const tt = document.getElementById("ttt");
tt.addEventListener("click", () => {
  // 尝试通信
  window.electronAPI.yyu();
});
