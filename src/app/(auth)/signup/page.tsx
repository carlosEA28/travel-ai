import { Button } from "@/components/ui/button";
import SignUpFormComponent from "./components/sign-up-form";
import Image from "next/image";

const Signup = () => {
  return (
    <div className="flex flex-col items-center justify-center w-screen h-screen gap-10 ">
      <h1 className="text-4xl font-bold">Crie sua conta!</h1>

      <div className=" flex flex-col text-center gap-3 w-full p-5 sm:max-w-[500px] ">
        <SignUpFormComponent />

        <p className="text-sm text-[#617D8A]">ou se cadastre com</p>

        <div>
          <Button
            variant="outline"
            size={"lg"}
            className="w-full cursor-pointer"
          >
            <Image src="/google.svg" alt="Google" width={24} height={24} />
            Continuar com o Google
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Signup;
