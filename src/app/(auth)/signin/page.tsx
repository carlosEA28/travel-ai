import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import SignInFormComponent from "./components/sign-in-form";

const SignInPage = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (session) {
    return redirect("/");
  }

  return (
    <div className="flex flex-col items-center justify-center w-screen h-screen gap-10 ">
      <h1 className="text-4xl font-bold">Sign in</h1>

      <div className=" flex flex-col text-center gap-3 w-full p-5 sm:max-w-[500px] ">
        <SignInFormComponent />
      </div>
    </div>
  );
};

export default SignInPage;
