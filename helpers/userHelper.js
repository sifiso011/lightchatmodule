const users = [];

// Join user to chat
function newUser(id, username, department) {
  const user = { id, username, department };

  users.push(user);

  return user;
}

// Get current user
function getActiveUser(id) {
  return users.find(user => user.id === id);
}

// User leaves chat
function exitRoom(id) {
  const index = users.findIndex(user => user.id === id);

  if (index !== -1) {
    return users.splice(index, 1)[0];
  }
}

// Get department users
function getIndividualRoomUsers(department) {
  return users.filter(user => user.department === department);
}

module.exports = {
  newUser,
  getActiveUser,
  exitDepartment,
  getIndividualDepartmentUsers
};