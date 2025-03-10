"use client";

import { z } from "zod";
import { useRouter } from "next/navigation";
import { SaveIcon } from "lucide-react";
import {
  deleteObject,
  ref,
  uploadBytesResumable,
  UploadTask,
} from "firebase/storage";

import PropertyForm from "@/components/property-form";
import { auth, storage } from "@/firebase/client";
import { Property } from "@/types/property";
import { propertySchema } from "@/validation/propertySchema";
import { updateProperty } from "./actions";
import { useToast } from "@/hooks/use-toast";
import { savePropertyImages } from "../../actions";

type Props = Property;

export default function EditPropertyForm({
  id,
  address1,
  address2,
  city,
  postcode,
  bathrooms,
  bedrooms,
  description,
  price,
  status,
  images = [],
}: Props) {
  const router = useRouter();
  const { toast } = useToast();

  const handleSubmit = async (data: z.infer<typeof propertySchema>) => {
    const token = await auth?.currentUser?.getIdToken();

    if (!token) {
      return;
    }

    const { images: newImages, ...rest } = data;

    const response = await updateProperty({ ...rest, id }, token);

    if (!!response?.error) {
      toast({
        title: "Error!",
        description: response.message,
        variant: "destructive",
      });
      return;
    }

    const storageTasts: (UploadTask | Promise<void>)[] = [];
    const imagesToDelete = images.filter(
      (image) => !newImages.find((newImage) => image === newImage.url)
    );

    imagesToDelete.forEach((image) => {
      storageTasts.push(deleteObject(ref(storage, image)));
    });

    const paths: string[] = [];
    newImages.forEach((image, index) => {
      if (image.file) {
        const path = `properties/${id}/${Date.now()}-${index}-${
          image.file.name
        }`;
        paths.push(path);
        const storageRef = ref(storage, path);
        storageTasts.push(uploadBytesResumable(storageRef, image.file));
      } else {
        paths.push(image.url);
      }
    });

    await Promise.all(storageTasts);
    await savePropertyImages({ propertyId: id, images: paths }, token);

    toast({
      title: "Success!",
      description: "Property updated",
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
            <SaveIcon /> Save Property
          </>
        }
        defaultValues={{
          address1,
          address2,
          city,
          postcode,
          bathrooms,
          bedrooms,
          description,
          price,
          status,
          images: images.map((image) => ({
            id: image,
            url: image,
          })),
        }}
      />
    </div>
  );
}
