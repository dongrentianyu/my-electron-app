//实现node环境
let fs = require("fs");

console.log("fs");

let newFile = document.getElementById("newFile");
let i = 0;
newFile.onclick = function () {
    i++;
    fs.writeFile(`input-${i}.txt`, "写入一些文本文凭", (err) => {
        if (err) {
            console.log(err);
        } else {
            console.log("写入完毕");
            console.log(i);
        }
    });
};

//实现拖动文件并显示
let holder = document.querySelector("#holder");
let readList = document.querySelector("#readList");
holder.addEventListener("drop", (e) => {
    e.preventDefault(); // 取消默认
    e.stopPropagation(); // 防止冒泡
    console.log(e);
    let files = e.dataTransfer ? e.dataTransfer.files : e.target.files;
    for (let file of files) {
        console.log(file);
        console.log("文件名", file.name);
        console.log("文件大小", file.size);
        console.log("文件路径", file.path);
        fs.readFile(file.path, (err, data) => {
            if (err) {
                console.log(err);
            } else {
                let newDIV = document.createElement("div");
                newDIV.className = "readFile";
                newDIV.innerHTML = `
                <h3>文件名称：${file.name}</h3>
                <h3>文件路径：${file.path}</h3>
                <h3>文件内容如下</h3>
                <pre>
                ${data}
                </pre>
                `;
                readList.appendChild(newDIV);
            }
        });
    }
});
holder.addEventListener("dragover", (e) => {
    e.preventDefault(); // 取消默认
    e.stopPropagation(); // 防止冒泡
});

// webview的操控与使用

const webview = document.querySelector("webview");

webview.addEventListener("did-start-loading", () => {
    console.log("正在加载当中");
});

webview.addEventListener("did-stop-loading", () => {
    console.log("加载完毕");
    console.log([webview]);
    webview.insertCSS(`$su{
        background:red!important;}`);
});
