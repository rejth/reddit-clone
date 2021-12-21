import { useEffect } from 'react';
import shallow from 'zustand/shallow';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from 'firebase/auth';
import {
  collection,
  query,
  where,
  getDocs,
  getDoc,
  doc,
  addDoc,
  orderBy,
} from 'firebase/firestore/lite';

import useStore from '../ts/store';
import { auth, db } from './firebase';

// User services
export async function loginUser({ email, password }: any) {
  return signInWithEmailAndPassword(auth, email, password);
}

export async function logOutUser() {
  return signOut(auth);
}

export async function createUser({ user, username }: any) {
  const users = collection(db, 'users');
  await addDoc(users, {
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
  // find document
  const users = collection(db, 'users');
  const q = query(users, where('username', '==', username));
  // check if the user exists
  const { empty } = await getDocs(q);
  return empty || 'Username already taken!';
}

export function useAuthUser() {
  const [setUser, resetUser] = useStore((s) => [s.setUser, s.resetUser], shallow);

  useEffect(() => {
    async function getUser(user: any) {
      // find document
      const users = collection(db, 'users');
      const q = query(users, where('uid', '==', user.uid));
      const { docs } = await getDocs(q);
      const docId = docs[0]?.id || null;

      if (!docId) {
        resetUser();
        return;
      }

      // get document data
      const userRef = doc(db, 'users', docId);
      const userDoc = await getDoc(userRef);

      if (userDoc.exists()) {
        setUser(userDoc.data());
      } else {
        resetUser();
      }
    }

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      getUser(user);
    });

    return () => {
      unsubscribe();
    };
  }, [setUser, resetUser]);
}

// Posting services
export async function createPost(post: any) {
  // create document
  const posts = collection(db, 'posts');
  const { id } = await addDoc(posts, post);
  // get document data
  const newPostRef = doc(db, 'posts', id);
  const newPost = await getDoc(newPostRef);

  return { id, ...newPost.data() };
}

export async function getDocuments(ref: any) {
  const { docs } = await getDocs(ref);
  const documents = docs.map((document: any) => ({
    id: document.id,
    reference: document.ref,
    ...document.data(),
  }));
  return documents;
}

export async function getPosts() {
  const posts = collection(db, 'posts');
  const q = query(posts, orderBy('score', 'desc'));
  const data = await getDocuments(q);
  return data;
}

export async function getPost() {
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
