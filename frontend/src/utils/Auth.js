// Get all users.
export function getUsers() {
  return JSON.parse(localStorage.getItem("users")) || [];
}

// Save a new user.
export function saveUser(user) {
  const users = getUsers();
  users.push(user);
  localStorage.setItem("users", JSON.stringify(users));
}

export function usernameExists(username) {
  return getUsers().some(user => user.username === username);
}

export function emailExists(email) {
  return getUsers().some(user => user.email === email);
}

export function getUserByEmail(email) {
  return getUsers().find(user => user.email === email);
}

export function loginUser(username, password) {

  const user = getUsers().find(u => u.username === username && u.password === password);
  return user || null;
}

export function setCurrentUser(user) {
  localStorage.setItem("currentUser", JSON.stringify(user));
}

export function getCurrentUser() {
  return JSON.parse(localStorage.getItem("currentUser"));
}

export function updateUser(updatedUser) {

  const newUsers = getUsers().map(user => {
    if (user.username === updatedUser.username) {
      return updatedUser;
    }
    return user;

  });

  localStorage.setItem("users", JSON.stringify(newUsers));
  setCurrentUser(updatedUser);

}


export function resetPassword(email, newPassword) {

  const newUsers = getUsers().map(user => {

    if (user.email === email) {
      return {
        ...user, password: newPassword
      };

    }

    return user;

  });

  localStorage.setItem("users", JSON.stringify(newUsers));

  const current = getCurrentUser();

  if (current && current.email === email) {
    current.password = newPassword
    setCurrentUser(current);

  }

}


export function logoutUser() {
  localStorage.removeItem("currentUser");
  localStorage.removeItem("loggedIn");

}