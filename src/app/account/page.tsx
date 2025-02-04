import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { DecodedIdToken } from "firebase-admin/auth";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { auth } from "@/firebase/server";
import UpdatePassword from "./update-password";
import DeleteAccountButton from "./delete-account-button";

export default async function Account() {
  const cookieStore = await cookies();
  const token = cookieStore.get("firebaseAuthToken")?.value;

  if (!token) {
    redirect("/");
  }

  let decodedToken: DecodedIdToken;
  try {
    decodedToken = await auth.verifyIdToken(token);
  } catch (
    // eslint-disable-next-line
    e
  ) {
    redirect("/");
  }

  const user = await auth.getUser(decodedToken.uid);
  const isPasswordProvider = !!user.providerData.find(
    (provider) => provider.providerId === "password"
  );

  return (
    <div className="max-w-screen-sm mx-auto">
      <Card className="mt-10">
        <CardHeader>
          <CardTitle className="text-3xl font-bold">My Account</CardTitle>
        </CardHeader>
        <CardContent>
          <label>Email</label>
          <div>{decodedToken.email}</div>
          {!!isPasswordProvider && <UpdatePassword />}
        </CardContent>
        {!decodedToken.admin && (
          <CardFooter className="flex flex-col items-start">
            <h2 className="text-red-500 text-2xl font-bold mb-2">
              Danger Zone
            </h2>
            <DeleteAccountButton />
          </CardFooter>
        )}
      </Card>
    </div>
  );
}
