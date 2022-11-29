
// expressモジュールを使用する宣言を行います
const express = require("express");
// expressのインスタンスを作成
const app = express();
// httpのインスタンスを作成
const http = require("http");
// HTTPサーバーの作成
const server = http.createServer(app);
// WebSocket技術によるデータの双方向通信のインスタンスを作成します。
// serverのインスタンスを引数に渡します。
const { Server } = require("socket.io");
const io = new Server(server, {
    cors: {
      // アクセスを許可するURL
      origin: ["http://localhost:3000"]
    },
  });


// リッスンを開始するポート番号
const PORT = 8000;




// 双方向通信できるように、socket.ioを使用したコネクションを作成します
// クライアントから接続があった場合、コールバックがコールされます
io.on('connection', (socket) => {
    console.log('a user connected');
    
    // クライアントが切断した時のコールバック
    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
        
    //クライアントから受信
    socket.on("send_message", (data) => {
        console.log(data);
        //クライアントへ返信
        io.emit("received_message", data);
    });
});


// サーバーを指定したポートでリッスン開始します。
server.listen(PORT, () => {
    console.log(`listening on ${PORT}`);
} );

