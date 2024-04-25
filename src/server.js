const express = require('express');
const http = require('http');
const socketIO = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

// Serve static files from the 'public' directory
app.use(express.static('public'));

// WebSocket connection handler
io.on('connection', (socket) => {
    console.log('A new user has connected to DungeonNotes');

    // Event listener for edits from clients
    socket.on('edit-note', (content) => {
        // Broadcast changes to all other connected clients except the sender
        socket.broadcast.emit('update-note', content);
    });

    // Handle user disconnection
    socket.on('disconnect', () => {
        console.log('A user has disconnected from DungeonNotes');
    });
});

// Start the server on port 3000
server.listen(3000, () => {
    console.log('DungeonNotes server is running on http://localhost:3000');
});