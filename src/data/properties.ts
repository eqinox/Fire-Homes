import { firestore } from "@/firebase/server";
import { PropertyStatus } from "@/types/propertyStatus";
import "server-only";

type GetPropertiesOptions = {
  filters?: {
    minPrice?: number | null;
    maxPrice?: number | null;
    minBedrooms?: number | null;
    status?: PropertyStatus[] | null;
  };
  pagination?: {
    pageSize?: number;
    page?: number;
  };
};

export const getProperties = async (options?: GetPropertiesOptions) => {
  const page = options?.pagination?.page || 1;
  const pageSize = options?.pagination?.pageSize || 10;
  const { minPrice, maxPrice, minBedrooms, status } = options?.filters || {};

  let propertiesQuery = firestore
    .collection("properties")
    .orderBy("updated", "desc");

  if (minPrice !== null && minPrice !== undefined) {
    propertiesQuery = propertiesQuery.where("price", ">=", minPrice);
  }

  if (maxPrice !== null && maxPrice !== undefined) {
    propertiesQuery = propertiesQuery.where("price", "<=", maxPrice);
  }

  if (minBedrooms !== null && minBedrooms !== undefined) {
    propertiesQuery = propertiesQuery.where("bedrooms", ">=", minBedrooms);
  }

  if (status) {
    propertiesQuery = propertiesQuery.where("status", "in", status);
  }

  const propertiesSnapshot = await propertiesQuery
    .limit(pageSize)
    .offset((page - 1) * pageSize)
    .get();

  const properties = propertiesSnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));

  console.log("properties", properties);

  return { data: properties };
};
