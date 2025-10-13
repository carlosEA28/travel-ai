import CreateTripFormComponent from "./components/create-trip-form";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { headers } from "next/headers";

const CreateTripPage = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    redirect("/signin");
  }
  return (
    <div className="flex flex-col items-center justify-center w-screen h-screen gap-8">
      <h1 className="text-3xl font-bold text-[#0D171C]">Crie sua viagem</h1>

      <div className="w-full p-5 sm:max-w-[500px] ">
        <CreateTripFormComponent />
      </div>
    </div>
  );
};

export default CreateTripPage;
