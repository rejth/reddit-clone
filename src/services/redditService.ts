import { createUserWithEmailAndPassword } from 'firebase/auth';
import { collection, query, where, getDocs, addDoc } from 'firebase/firestore/lite';
import { auth, db } from './firebase';

// User services
export async function loginUser() {
  return {};
}

export async function createUser({ user, username }: any) {
  const col = collection(db, 'users');
  await addDoc(col, {
    uid: user.uid,
    username,
    email: user.email,
  });
}

export async function signupUser({ username, email, password }: any) {
  const userCreds = await createUserWithEmailAndPassword(auth, email, password);
  await createUser({
    user: userCreds.user,
    username,
  });
}

export async function checkIfUsernameTaken(username: string) {
  const col = collection(db, 'users');
  const q = query(col, where('username', '==', username));
  const { empty } = await getDocs(q);
  return empty || 'Username already taken!';
}

export function useAuthUser() {
  return {};
}

export async function logOut() {
  return {};
}

// Posting services
export async function createPost() {
  return {};
}

export async function getPost() {
  return {};
}

export async function getPosts() {
  return {};
}

export async function getPostsByUsername() {
  return {};
}

export async function getPostsByCategory() {
  return {};
}

export async function deletePost() {
  return {};
}

export async function getDocuments() {
  return {};
}

// Commenting services
export async function createComment() {
  return {};
}

export async function deleteComment() {
  return {};
}

export async function getCommentCount() {
  return {};
}

export async function getCommentsByPostId() {
  return {};
}

// View services
export async function addView() {
  return {};
}

export async function toggleVote() {
  return {};
}
