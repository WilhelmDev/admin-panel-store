import { FirebaseApp } from "firebase/app";
import { Firestore } from "firebase/firestore";
import { FirebaseStorage } from "firebase/storage";

export interface ContextFirebase {
  app: FirebaseApp;
  db: Firestore;
  storage: FirebaseStorage
}