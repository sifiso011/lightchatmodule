const chatForm = document.getElementById('chat-form');
const chatMessages = document.querySelector('.chat-messages');
const departmentName = document.getElementById('department-name');
const userList = document.getElementById('users');

// Get username and department from URL
const { username, department } = Qs.parse(location.search, {
  ignoreQueryPrefix: true,
});

console.log({username, room})

const socket = io();

// Join chatdepartment
socket.emit('joinDepartment', { username, room });

// Get department and users
socket.on('departmentUsers', ({ department, users }) => {
  outputDepartmentName(department);
  outputUsers(users);
});

// Message from server
socket.on('message', (message) => {
  console.log(message);
  outputMessage(message);

  // Scroll down
  chatMessages.scrollTop = chatMessages.scrollHeight;
});

// Message submit
chatForm.addEventListener('submit', (e) => {
  e.preventDefault();

  // Get message text
  let msg = e.target.elements.msg.value;

  msg = msg.trim();

  if (!msg) {
    return false;
  }

  // Emit message to server
  socket.emit('chatMessage', msg);

  // Clear input
  e.target.elements.msg.value = '';
  e.target.elements.msg.focus();
});

// Output message to DOM
function outputMessage(message) {
  const div = document.createElement('div');
  div.classList.add('message');
  const p = document.createElement('p');
  p.classList.add('meta');
  p.innerText = message.username;
  p.innerHTML += `<span>${message.time}</span>`;
  div.appendChild(p);
  const para = document.createElement('p');
  para.classList.add('text');
  para.innerText = message.text;
  div.appendChild(para);
  document.querySelector('.chat-messages').appendChild(div);
}

// Add deparment name to DOM
function outputDepartmentName(deparment) {
  departmentName.innerText = room;
}

// Add users to DOM
function outputUsers(users) {
 console.log({users})
  userList.innerHTML = '';
  users.forEach((user) => {
    const li = document.createElement('li');
    li.innerText = user.username;
    userList.appendChild(li);
  });
}

//Prompt the user before leave chat room
document.getElementById('leave-btn').addEventListener('click', () => {
  const leaveDepartment = confirm('Are you sure you want to leave the chatroom?');
  if (leaveDepartment) {
    window.location = '../index.html';
  } else {
  }
});