import HeaderComponent from "@/components/header";
import MapComponent from "@/components/map";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import React from "react";

const tags = ["Tag 1", "Tag 2", "Tag 3", "Tag 4", "Tag 5"];

const LocationsPage = () => {
  return (
    <div className="flex flex-col h-screen w-screen">
      <HeaderComponent />

      <main className="flex-grow w-full flex items-center justify-center p-0">
        <div className="flex gap-4 w-full h-full px-6 py-5 overflow-hidden">
          <ScrollArea className="h-full w-[320px] rounded-md border overflow-hidden">
            <div className="p-4">
              <h4 className="mb-4 text-sm leading-none font-medium">Tags</h4>
              {tags.map((tag) => (
                <React.Fragment key={tag}>
                  <div className="text-sm">{tag}</div>
                  <Separator className="my-2" />
                </React.Fragment>
              ))}
            </div>
          </ScrollArea>

          <div className="w-full h-full">
            <MapComponent />
          </div>
        </div>
      </main>
    </div>
  );
};

export default LocationsPage;
