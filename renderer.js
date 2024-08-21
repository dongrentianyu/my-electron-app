const information = document.getElementById("info");
information.innerText = `本应用正在使用 Chrome (v${versions.chrome()}), Node.js (v${versions.node()}), 和 Electron (v${versions.electron()})`;

const information9 = document.getElementById("info-2");
information9.innerText = `这是什么东西(v${versions.chrome()}), Node.js (v${versions.node()}), 和 Electron (v${versions.electron()})`;

const func = async () => {
  const response = await window.versions.ping();
  console.log(response); // 打印 'pong'
};

func();

const setButton = document.getElementById("btn");
const titleInput = document.getElementById("info-3");
setButton.addEventListener("click", () => {
  const title = titleInput.value;
  window.testAPI.setTitle(title);
});

// 必须有下面这段才能进行渲染
const tt = document.getElementById("ttt");
tt.addEventListener("click", () => {
  // 尝试通信
  window.myAPI.yyu();
});
