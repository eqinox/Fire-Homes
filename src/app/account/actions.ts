"use server";

import { cookies } from "next/headers";

import { auth, firestore } from "@/firebase/server";

export const deleteUserFavourites = async () => {
  const cookieStore = await cookies();
  const token = cookieStore.get("firebaseAuthToken")?.value;

  if (!token) {
    return;
  }

  try {
    const decodedToken = await auth.verifyIdToken(token);
    await firestore.collection("favourites").doc(decodedToken.uid).delete();
  } catch (
    // eslint-disable-next-line
    e
  ) {}
};
