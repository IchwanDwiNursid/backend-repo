import {
  DocumentData,
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  where,
} from "firebase/firestore";
import { db } from "../config/firebaseConfig";
import { query, updateDoc } from "firebase/firestore";

import { RegisterRequest } from "../model/model.user";

export const uploadData = async (data: RegisterRequest) => {
  console.log(data.password);
  try {
    const result = await addDoc(collection(db, "users"), data);
    return result;
  } catch (error) {
    console.log(error);
  }
};

export const getMultipleData = async () => {
  const collectionRef = collection(db, "users");
  const snapshoot = await getDocs(collectionRef);

  const data: DocumentData = [];

  snapshoot.forEach((doc) => {
    data.push({
      id: doc.id,
      ...doc.data(),
    });
  });

  return data;
};

export const getById = async (id: string): Promise<any> => {
  const docRef = doc(db, "users", id);
  const snapshoot = await getDoc(docRef);

  console.log(snapshoot.id, snapshoot.data());

  return {
    id: snapshoot.id,
    ...snapshoot.data(),
  };
};

export const getByField = async (
  field: string,
  email: string
): Promise<any> => {
  const collectionRef = collection(db, "users");

  const q = query(collectionRef, where(field, "==", email));

  const snapshoot = await getDocs(q);

  let data: DocumentData[] = [];

  snapshoot.forEach((doc) => {
    data.push({
      id: doc.id,
      ...doc.data(),
    });
  });

  const result = JSON.stringify(data);

  return result;
};

export const updateToken = async (id: string, token: string) => {
  const docRef: any = doc(db, "users", id);
  const data = await updateDoc(docRef, { token: token });
  return data;
};

export const updateData = async (id: string, data: any) => {
  const docRef: any = doc(db, "users", id);
  const result = await updateDoc(docRef, data);
  return result;
};
