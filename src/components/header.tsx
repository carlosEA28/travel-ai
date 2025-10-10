import { PlaneTakeoffIcon } from "lucide-react";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { headers } from "next/headers";

const HeaderComponent = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user && typeof window !== "undefined") {
    return redirect("/");
  }

  const user = session?.user;

  return (
    <>
      <header className="flex justify-between items-center w-full h-16 px-10 py-3 border-b border-gray-200 ">
        <div className="flex gap-4">
          <PlaneTakeoffIcon />
          <h1 className="text-[#121717] text-lg font-bold">TravelAi</h1>
        </div>
        <nav className="flex items-center gap-4">
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
          <Avatar className="w-10 h-10">
            <AvatarImage src={user?.image || undefined} />
            <AvatarFallback>{user?.name}</AvatarFallback>
          </Avatar>
        </nav>
      </header>
    </>
  );
};

export default HeaderComponent;
