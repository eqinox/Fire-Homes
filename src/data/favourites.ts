import { auth, firestore } from "@/firebase/server";
import { cookies } from "next/headers";
import "server-only";

export const getUserFavourites = async () => {
  const cookiesStore = await cookies();
  const token = cookiesStore.get("firebaseAuthToken")?.value;

  if (!token) {
    return {};
  }

  const verifiedToken = await auth.verifyIdToken(token);

  if (!verifiedToken) {
    return {};
  }

  const favouritesSnapshot = await firestore
    .collection("favourites")
    .doc(verifiedToken.uid)
    .get();

  const favouritesData = favouritesSnapshot.data();
  return favouritesData || {};
};
