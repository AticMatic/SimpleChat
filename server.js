require('dotenv').config();
const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

// Create Express app
const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// Set view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

// Store active rooms and users
const chatRooms = new Map();

// Routes
app.get('/', (req, res) => {
    res.render('index');
});

app.get('/chat/new', (req, res) => {
    const roomId = uuidv4();
    chatRooms.set(roomId, { users: [] });
    res.redirect(`/chat/${roomId}`);
});

app.get('/chat/:roomId', (req, res) => {
    const roomId = req.params.roomId;

    // Check if room exists
    if (!chatRooms.has(roomId)) {
        chatRooms.set(roomId, { users: [] });
    }

    res.render('chat', { roomId });
});

// Socket.io connections
io.on('connection', (socket) => {
    let currentRoomId = null;
    let currentUser = null;

    // User joins a room
    socket.on('join-room', ({ roomId, username }) => {
        // Store user information
        currentRoomId = roomId;
        currentUser = {
            id: socket.id,
            username
        };

        // Add user to room
        socket.join(roomId);

        // Add user to room list
        if (chatRooms.has(roomId)) {
            chatRooms.get(roomId).users.push(currentUser);
        } else {
            chatRooms.set(roomId, { users: [currentUser] });
        }

        // Broadcast user joined message
        socket.to(roomId).emit('user-joined', { username });

        // Send current user list
        io.to(roomId).emit('room-users', {
            users: chatRooms.get(roomId).users
        });
    });

    // Listen for chat messages
    socket.on('send-message', ({ message }) => {
        if (currentRoomId && currentUser) {
            // Broadcast message to room
            io.to(currentRoomId).emit('receive-message', {
                userId: socket.id,
                username: currentUser.username,
                message,
                time: new Date().toISOString()
            });
        }
    });

    // User disconnects
    socket.on('disconnect', () => {
        if (currentRoomId && currentUser) {
            // Remove user from room
            const room = chatRooms.get(currentRoomId);
            if (room) {
                room.users = room.users.filter(user => user.id !== socket.id);

                // If room is empty, remove it
                if (room.users.length === 0) {
                    chatRooms.delete(currentRoomId);
                } else {
                    // Notify others that user left
                    socket.to(currentRoomId).emit('user-left', {
                        username: currentUser.username
                    });

                    // Update user list
                    io.to(currentRoomId).emit('room-users', {
                        users: room.users
                    });
                }
            }
        }
    });
});

// Start server
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});