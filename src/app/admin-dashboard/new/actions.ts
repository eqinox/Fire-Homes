"use server";

import { auth, firestore } from "@/firebase/server";
import { propertyDataSchema } from "@/validation/propertySchema";

export const saveNewProperty = async (data: {
  address1: string;
  address2?: string;
  city: string;
  postcode: string;
  description: string;
  price: number;
  bedrooms: number;
  bathrooms: number;
  status: "for-sale" | "draft" | "withdrawn" | "sold";
  token: string;
}) => {
  const { token, ...propertyData } = data;
  const verifiedToken = await auth.verifyIdToken(data.token);

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

  const property = await firestore.collection("properties").add({
    ...propertyData,
    createdDate: new Date(),
    updatedDate: new Date(),
  });

  return {
    propertyId: property.id,
  };
};
