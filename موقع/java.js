// script.js

// Screen Sharing Button Functionality
document.getElementById('screen-share-btn').addEventListener('click', function() {
    // Implement screen sharing functionality here
    alert('Screen sharing feature is not yet implemented!');
});

// Chat Functionality
document.getElementById('send-btn').addEventListener('click', function() {
    // Send chat message functionality
    let message = document.getElementById('chat-input').value;
    // Implement sending message logic
    console.log('Sending message:', message);
    // Clear input field
    document.getElementById('chat-input').value = '';
});

// Participant List and Socket.IO Integration
const socket = io();

// Send chat message
document.getElementById('send-btn').addEventListener('click', function() {
    let message = document.getElementById('chat-input').value;
    socket.emit('chatMessage', message);
    document.getElementById('chat-input').value = '';
});

// Receive chat message
socket.on('chatMessage', function(message) {
    const chatMessages = document.getElementById('chat-messages');
    const messageElement = document.createElement('div');
    messageElement.innerText = message;
    chatMessages.appendChild(messageElement);
});

// Update participant list
socket.on('updateParticipants', function(participants) {
    const participantList = document.getElementById('participant-list');
    participantList.innerHTML = '';
    participants.forEach(participant => {
        const participantElement = document.createElement('li');
        participantElement.innerText = participant;
        participantList.appendChild(participantElement);
    });
});
// script.js
document.querySelector('.animated-button').addEventListener('click', function() {
    alert('Button Clicked!'); // تحريك الزر
});

// Changing Backgrounds Dynamically
const backgrounds = ['nature1.jpg', 'nature2.jpg', 'nature3.jpg'];
let index = 0;

setInterval(function() {
    document.querySelector('.background').style.backgroundImage = `url('${backgrounds[index]}')`;
    index = (index + 1) % backgrounds.length;
}, 5000); // تغيير الخلفية كل 5 ثواني
// script.js (If needed)
// No JavaScript is required for this basic layout, but you can add functionality as needed.
document.addEventListener("DOMContentLoaded", function() {
    // قم بتحديد العنصر الذي يحتوي على زر إنشاء الغرفة
    var createRoomButton = document.querySelector(".main-container button");

    // قم بتعريف الدالة التي ستتم تنفيذها عند النقر على زر إنشاء الغرفة
    function createRoom() {
        // يمكنك إضافة السلوك الخاص بإنشاء الغرفة هنا، مثل فتح نافذة جديدة أو إظهار نموذج
        console.log("Room created!"); // هذا مثال بسيط، يمكنك استبداله بالسلوك الفعلي
    }

    // قم بربط الدالة مع حدث النقر على زر إنشاء الغرفة
    createRoomButton.addEventListener("click", createRoom);
});
document.addEventListener("DOMContentLoaded", function() {
    // احصل على عنصر الصوت
    var welcomeMusic = document.getElementById("welcome-music");

    // قم بتشغيل الموسيقى
    welcomeMusic.play();
});
document.getElementById("toggle-mic").addEventListener("click", function() {
    isMicOn = !isMicOn;
    this.textContent = isMicOn ? "Turn Off Microphone" : "Turn On Microphone";
    // تنفيذ الإجراءات المناسبة
});

document.getElementById("toggle-camera").addEventListener("click", function() {
    isCameraOn = !isCameraOn;
    this.textContent = isCameraOn ? "Turn Off Camera" : "Turn On Camera";
    // تنفيذ الإجراءات المناسبة
});
const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const app = express();
const server = http.createServer(app);
const io = socketIo(server);

app.use(express.static('public'));

io.on('connection', socket => {
    socket.on('join-room', roomId => {
        socket.join(roomId);
        socket.to(roomId).broadcast.emit('user-connected', socket.id);

        socket.on('disconnect', () => {
            socket.to(roomId).broadcast.emit('user-disconnected', socket.id);
        });
    });
});

server.listen(3000, () => {
    console.log('Server is running on port 3000');
});
const socket = io('/');
const videoGrid = document.getElementById('video-grid');
const myPeer = new Peer();
const myVideo = document.createElement('video');
myVideo.muted = true;
const peers = {};

navigator.mediaDevices.getUserMedia({
    video: true,
    audio: true
}).then(stream => {
    addVideoStream(myVideo, stream);

    myPeer.on('call', call => {
        call.answer(stream);
        const video = document.createElement('video');
        call.on('stream', userVideoStream => {
            addVideoStream(video, userVideoStream);
        });
    });

    socket.on('user-connected', userId => {
        connectToNewUser(userId, stream);
    });
});

socket.on('user-disconnected', userId => {
    if (peers[userId]) peers[userId].close();
});

myPeer.on('open', id => {
    socket.emit('join-room', ROOM_ID, id);
});

function connectToNewUser(userId, stream) {
    const call = myPeer.call(userId, stream);
    const video = document.createElement('video');
    call.on('stream', userVideoStream => {
        addVideoStream(video, userVideoStream);
    });
    call.on('close', () => {
        video.remove();
    });
    peers[userId] = call;
}

function addVideoStream(video, stream) {
    video.srcObject = stream;
    video.addEventListener('loadedmetadata', () => {
        video.play();
    });
    videoGrid.append(video);
}
