import { AlertCircle, PlaneTakeoffIcon } from "lucide-react";
import Link from "next/link";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { Button } from "./ui/button";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "./ui/hover-card";
import AvatarDropdownComponent from "./avatar-dropdown";

const HeaderComponent = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const user = session?.user;

  return (
    <header className="flex justify-between items-center w-full h-16 px-10 py-3 border-b border-gray-200">
      <div className="flex gap-4 items-center">
        <PlaneTakeoffIcon />
        <h1 className="text-[#121717] text-lg font-bold">TravelAi</h1>
      </div>

      <nav className="flex items-center gap-9">
        <Link className="text-[#121717] text-base" href={"/"}>
          Home
        </Link>

        {/* ✅ Só mostra "My Trips" se tiver usuário logado */}
        {user && user.id ? (
          <>
            <Link
              className="text-[#121717] text-base"
              href={`/user/my-trips/${user.id}`}
            >
              My Trips
            </Link>
            <Link className="text-[#121717] text-base" href={"/trip/create"}>
              Create
            </Link>
          </>
        ) : (
          <>
            <HoverCard>
              <HoverCardTrigger asChild>
                <span className="text-gray-400 text-base cursor-default">
                  My Trips
                </span>
              </HoverCardTrigger>
              <HoverCardContent className="w-72 p-4 bg-white rounded-lg shadow-lg border border-gray-100">
                <div className="flex items-start gap-3">
                  <div className="mt-0.5">
                    <AlertCircle className="h-4 w-4 text-amber-500" />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 text-sm">
                      Sign in required
                    </h4>
                    <p className="text-gray-600 text-sm mt-1">
                      To access this feature, please sign in to your account
                    </p>
                  </div>
                </div>
              </HoverCardContent>
            </HoverCard>
            <HoverCard>
              <HoverCardTrigger asChild>
                <span className="text-gray-400 text-base cursor-default">
                  Create
                </span>
              </HoverCardTrigger>
              <HoverCardContent className="w-72 p-4 bg-white rounded-lg shadow-lg border border-gray-100">
                <div className="flex items-start gap-3">
                  <div className="mt-0.5">
                    <AlertCircle className="h-4 w-4 text-amber-500" />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 text-sm">
                      Sign in required
                    </h4>
                    <p className="text-gray-600 text-sm mt-1">
                      To access this feature, please sign in to your account
                    </p>
                  </div>
                </div>
              </HoverCardContent>
            </HoverCard>
          </>
        )}

        {/* ✅ Avatar se logado, botão de login se não */}
        {user ? (
          <AvatarDropdownComponent
            name={user.name}
            image={user.image || null}
          />
        ) : (
          <Button
            className="bg-[#12A3ED] hover:bg-[#0E8DD0] transition-colors"
            asChild
          >
            <Link href={"/signin"}>Login</Link>
          </Button>
        )}
      </nav>
    </header>
  );
};

export default HeaderComponent;
