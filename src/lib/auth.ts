import type { User } from "@/type/blog";

const USERS_KEY = "users";
const CURRENT_USER_KEY = "currentUser";

export function getUsers(): User[] {
  return JSON.parse(localStorage.getItem(USERS_KEY) || "[]");
}

export function registerUser(user: User) {
  const users = getUsers();
  users.push(user);
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

export function loginUser(email: string, password: string): User | null {
  const users = getUsers();
  const user = users.find(
    (u) => u.email === email && u.password === password
  );

  if (user) {
    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));
    return user;
  }
  return null;
}

export function getCurrentUser(): User | null {
  return JSON.parse(localStorage.getItem(CURRENT_USER_KEY) || "null");
}

export function logoutUser() {
  localStorage.removeItem(CURRENT_USER_KEY);
}
