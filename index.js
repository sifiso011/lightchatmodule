
const path = require('path');
const http = require('http');
const express = require('express');
const socketio = require('socket.io');
const formatMessage = require('./helpers/formatDate')
const {
  getActiveUser,
  exitDepartment,
  newUser,
  getIndividualDepartmentUsers
} = require('./helpers/userHelper');

const app = express();
const server = http.createServer(app);
const io = socketio(server);

// Set public directory
app.use(express.static(path.join(__dirname, 'public')));

// this block will run when the client connects
io.on('connection', socket => {
  socket.on('joinDepartment', ({ username, department }) => {
    const user = newUser(socket.id, username, department);

    socket.join(user.department);

    // General welcome
    socket.emit('message', formatMessage("Dixio", 'welcome team! '));

    // Broadcast everytime users connects
    socket.broadcast
      .to(user.department)
      .emit(
        'message',
        formatMessage("Dixio", `${user.username} has joined the department`)
      );

    // Current active users and department name
    io.to(user.department).emit('departmentUsers', {
      department: user.department,
      users: getIndividualDepartmentUsers(user.department)
    });
  });

  // Listen for client message
  socket.on('chatMessage', msg => {
    const user = getActiveUser(socket.id);

    io.to(user.department).emit('message', formatMessage(user.username, msg));
  });

  // Runs when client disconnects
  socket.on('disconnect', () => {
    const user = exitDepartment(socket.id);

    if (user) {
      io.to(user.department).emit(
        'message',
        formatMessage("Dixio", `${user.username} has left the department`)
      );

      // Current active users and department name
      io.to(user.department).emit('departmentUsers', {
        department: user.department,
        users: getIndividualDepartmentUsers(user.department)
      });
    }
  });
});

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));