"use client";

import { z } from "zod";
import { useRouter } from "next/navigation";
import { PlusCircleIcon } from "lucide-react";

import PropertyForm from "@/components/property-form";
import { useAuth } from "@/context/auth";
import { propertyDataSchema } from "@/validation/propertySchema";
import { createProperty } from "./actions";
import { useToast } from "@/hooks/use-toast";

export default function NewPropertyForm() {
  const auth = useAuth();
  const { toast } = useToast();
  const router = useRouter();

  const handleSubmit = async (data: z.infer<typeof propertyDataSchema>) => {
    const token = await auth?.currentUser?.getIdToken();

    if (!token) {
      return;
    }

    const response = await createProperty(data, token);

    if (!!response.error) {
      toast({
        title: "Error!",
        description: response.message,
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Success!",
      description: "Property created",
      variant: "success",
    });

    router.push("/admin-dashboard");
  };

  return (
    <div>
      <PropertyForm
        handleSubmit={handleSubmit}
        submitButtonLabel={
          <>
            <PlusCircleIcon /> Create Property
          </>
        }
      />
    </div>
  );
}
