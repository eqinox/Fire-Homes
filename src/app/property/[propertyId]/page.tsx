import { BathIcon, BedIcon } from "lucide-react";
import Image from "next/image";
import numeral from "numeral";
import ReactMarkdown from "react-markdown";

import PropertyStatusBadge from "@/components/property-status-badge";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { getPropertyById } from "@/data/properties";
import BackButton from "./back-button";

export const dynamic = "force-static";

export default async function Property({
  params,
}: {
  // eslint-disable-next-line
  params: Promise<any>;
}) {
  const paramsValue = await params;
  const property = await getPropertyById(paramsValue.propertyId);

  const addressLines = [
    property.address1,
    property.address2,
    property.city,
    property.postcode,
  ].filter((addressLine) => !!addressLine);

  return (
    <div className="grid lg:grid-cols-[1fr_500px] grid-cols-1 grid-flow-row-dense">
      <div>
        {!!property.images && (
          <Carousel className="w-full">
            <CarouselContent>
              {property.images.map((image, index) => (
                <CarouselItem key={image}>
                  <div className="relative h-[80vh] min-h-80">
                    <Image
                      src={`https://firebasestorage.googleapis.com/v0/b/next2-app-5a30b.firebasestorage.app/o/${encodeURIComponent(
                        image
                      )}?alt=media`}
                      alt={`Image ${index + 1}`}
                      fill
                      className="object-cover"
                    />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            {property.images.length > 1 && (
              <>
                <CarouselPrevious className="translate-x-24 size-12" />
                <CarouselNext className="-translate-x-24 size-12" />
              </>
            )}
          </Carousel>
        )}
        <div className="bg-sky-200 top-0 place-items-center p-10 lg:hidden grid">
          <div className="flex flex-col gap-10 w-full">
            <PropertyStatusBadge
              status={property.status}
              className="mr-auto text-base"
            />
            <h1 className="text-4xl font-semibold">
              {addressLines.map((addresLine, index) => (
                <div key={index}>
                  {addresLine}
                  {index < addressLines.length - 1 && ","}
                </div>
              ))}
            </h1>
            <h2 className="text-3xl font-light">
              ${numeral(property.price).format("0,0")}
            </h2>
            <div className="flex gap-10">
              <div className="flex gap-2">
                <BedIcon /> {property.bedrooms} Bedrooms
              </div>
              <div className="flex gap-2">
                <BathIcon /> {property.bathrooms} Bathrooms
              </div>
            </div>
          </div>
        </div>
        <div className="property-description max-w-screen-md mx-auto py-10 px-4">
          <BackButton />
          <ReactMarkdown>{property.description}</ReactMarkdown>
        </div>
      </div>
      <div className="bg-sky-200 h-screen sticky top-0 place-items-center p-10 hidden lg:grid">
        <div className="flex flex-col gap-10 w-full">
          <PropertyStatusBadge
            status={property.status}
            className="mr-auto text-base"
          />
          <h1 className="text-4xl font-semibold">
            {addressLines.map((addresLine, index) => (
              <div key={index}>
                {addresLine}
                {index < addressLines.length - 1 && ","}
              </div>
            ))}
          </h1>
          <h2 className="text-3xl font-light">
            ${numeral(property.price).format("0,0")}
          </h2>
          <div className="flex gap-10">
            <div className="flex gap-2">
              <BedIcon /> {property.bedrooms} Bedrooms
            </div>
            <div className="flex gap-2">
              <BathIcon /> {property.bathrooms} Bathrooms
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
