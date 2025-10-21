import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Card, CardContent } from "@/components/ui/card";

import { ChevronDown } from "lucide-react";

interface AiToolsDropdownComponentProps {
  city: string;
}

const AiToolsDropdownComponent = ({ city }: AiToolsDropdownComponentProps) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex items-center gap-2 cursor-pointer">
        🌡️ Weather in {city} <ChevronDown />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-[600px]">
        <Card>
          <CardContent className=" flex items-center gap-10">
            {/* CURRENT WEATHER */}
            <div>
              <div className="flex gap-1">
                <p className="text-4xl">24° </p>
                <p className="text-4xl">☀️</p>
              </div>
              <p className="text-base">Paris</p>
              <p className="text-sm">Partly cloudy</p>
            </div>

            {/* FORECAST */}
            <div className="flex gap-5">
              <div className="text-center">
                <p>Tuesday</p>
                <p>☀️</p>
                <p className="text-sm">
                  24° - <span className="text-white/68">13°</span>
                </p>
              </div>

              <div className="text-center">
                <p>Wednesday </p>
                <p>☀️</p>
                <p className="text-sm">
                  24° - <span className="text-white/68">13°</span>
                </p>
              </div>

              <div className="text-center">
                <p>Thursday </p>
                <p>☀️</p>
                <p className="text-sm">
                  24° - <span className="text-white/68">13°</span>
                </p>
              </div>

              <div className="text-center">
                <p>Friday</p>
                <p>☀️</p>
                <p className="text-sm">
                  24° - <span className="text-white/68">13°</span>
                </p>
              </div>

              <div className="text-center">
                <p>Saturday</p>
                <p>☀️</p>
                <p className="text-sm">
                  24° - <span className="text-white/68">13°</span>
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default AiToolsDropdownComponent;
