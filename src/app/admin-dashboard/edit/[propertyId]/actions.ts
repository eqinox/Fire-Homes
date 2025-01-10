"use server";

import { revalidatePath } from "next/cache";

import { auth, firestore } from "@/firebase/server";
import { Property } from "@/types/property";
import { propertyDataSchema } from "@/validation/propertySchema";

export const updateProperty = async (data: Property, AuthToken: string) => {
  const { id, ...propertyData } = data;
  const verifiedToken = await auth.verifyIdToken(AuthToken);

  if (!verifiedToken.admin) {
    return {
      error: true,
      message: "Unauthorized",
    };
  }

  const validation = propertyDataSchema.safeParse(propertyData);

  if (!validation.success) {
    return {
      error: true,
      message: validation.error.issues[0]?.message ?? "An error occured",
    };
  }

  await firestore
    .collection("properties")
    .doc(id)
    .update({
      ...propertyData,
      updatedDate: new Date(),
    });

  revalidatePath(`/property/${id}`);
};
