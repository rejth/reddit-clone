import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from './firebase';

// User services
export async function loginUser() {
  return {};
}

export async function signupUser({ email, password }: any) {
  const userCreds = await createUserWithEmailAndPassword(auth, email, password);
  return userCreds;
}

export function useAuthUser() {
  return {};
}

export async function checkIfUsernameTaken() {
  return {};
}

export async function logOut() {
  return {};
}

export async function createUser() {
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
