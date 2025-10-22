import { PlaneTakeoffIcon } from "lucide-react";
import Link from "next/link";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { Button } from "./ui/button";
import AvatarDropdownComponent from "./avatar-dropdown";

const HeaderComponent = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const user = session?.user;

  return (
    <>
      <header className="flex justify-between items-center w-full h-16 px-10 py-3 border-b border-gray-200 ">
        <div className="flex gap-4">
          <PlaneTakeoffIcon />
          <h1 className="text-[#121717] text-lg font-bold">TravelAi</h1>
        </div>
        <nav className="flex items-center gap-9">
          <Link className="text-[#121717] text-base" href={"/"}>
            Home
          </Link>
          <Link
            className="text-[#121717] text-base"
            href={`/user/my-trips/${user?.id}`}
          >
            My Trips
          </Link>
          <Link className="text-[#121717] text-base" href={"/trip/create"}>
            Create
          </Link>
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
              <Link className=" text-base" href={"/signin"}>
                Login
              </Link>
            </Button>
          )}
        </nav>
      </header>
    </>
  );
};

export default HeaderComponent;
