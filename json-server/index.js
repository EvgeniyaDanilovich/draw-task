const fs = require('fs');
const path = require('path');
const jsonServer = require('json-server');
const http = require('http');
const WebSocket = require('ws');

const server = jsonServer.create();
const wss = new WebSocket.Server({ server });

const clients = [];

wss.on('connection', (ws) => {
    console.log('WebSocket connected');

    ws.on('message', (message) => {
        message = JSON.parse(message);
        console.log(`Received message: ${message}`);
        switch (message.method) {
            case 'connection':
                connectionHandler(ws, message);
                break;
            case 'draw':
                broadcastConnection(ws, message);
                break;
        }
    });

    ws.on('close', () => {
        console.log('WebSocket disconnected');
    });
});

const router = jsonServer.router(path.resolve(__dirname, 'db.json'));

server.use(jsonServer.defaults({}));
server.use(jsonServer.bodyParser);

server.use('/socket', (req, res, next) => {
    wss.handleUpgrade(req, req.socket, Buffer.alloc(0), (ws) => {
        wss.emit('connection', ws, req);
    });
});

server.use(router);

// запуск сервера
server.listen(8000, () => {
    console.log('server is running on 8000 port');
});

const connectionHandler = (ws, msg) => {
    clients.push(ws);
    ws.id = msg.id;
    broadcastConnection(ws, msg);
};

const broadcastConnection = (ws, msg) => {
    clients.forEach((client) => {
        client.send(JSON.stringify(msg));
        // if (client.id === msg.id) {
        // }
    });
};
