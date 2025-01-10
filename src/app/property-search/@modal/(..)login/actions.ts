"use server";

import { revalidatePath } from "next/cache";

export const LoginSuccess = async () => {
  revalidatePath("/property-search");
};
