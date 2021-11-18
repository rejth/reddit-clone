import { useEffect } from 'react';
import { createUserWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth';
import { collection, query, where, getDocs, getDoc, doc, addDoc } from 'firebase/firestore/lite';
import shallow from 'zustand/shallow';

import useStore from '../ts/store';
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
  const [setUser, resetUser] = useStore((s) => [s.setUser, s.resetUser], shallow);

  useEffect(() => {
    async function getUser(user: any) {
      const col = collection(db, 'users');
      const q = query(col, where('uid', '==', user.uid));
      const allDocs = await getDocs(q);
      const docId = allDocs.docs[0].id;

      if (!docId) {
        resetUser();
      } else {
        const userRef = doc(db, 'users', docId);
        const userDoc = await getDoc(userRef);

        if (userDoc.exists()) {
          setUser(userDoc.data());
        } else {
          resetUser();
        }
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
