"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormField,
  FormItem,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Loader2 } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { z } from "zod";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import Image from "next/image";
import Link from "next/link";

const formSchema = z.object({
  email: z
    .email({ message: "Email inválido" })
    .trim()
    .min(1, "Email obrigatório"),
  password: z
    .string()
    .trim()
    .min(8, "A senha deve conter pelo menos 8 caracteres"),
});

const SignInFormComponent = () => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const session = authClient.useSession();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);

    const { data } = await authClient.signIn.email({
      email: values.email,
      password: values.password,
      fetchOptions: {
        onSuccess: () => {
          setIsLoading(false);
          router.push(`/user/my-trips/${data?.user.id}`);
        },
        onError(context) {
          setIsLoading(false);
          if (context.error.code === "USER_NOT_FOUND") {
            toast.error("Usuário não encontrado");
          }
        },
      },
    });
  }

  async function onGoogleSubmit() {
    await authClient.signIn.social({
      provider: "google",

      fetchOptions: {
        onSuccess: () => {
          if (session?.data?.user) {
            router.push(`/user/my-trips/${session.data.user.id}`);
          }
        },
        onError(context) {
          if (context.error) {
            toast.error(context.error.message);
          }
        },
      },
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder="Email" className="w-full h-14" {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  placeholder="Senha"
                  type="password"
                  className="w-full h-14"
                  {...field}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          size={"lg"}
          type="submit"
          className="w-full bg-[#12A3ED] cursor-pointer"
          disabled={isLoading}
        >
          {isLoading ? (
            <Loader2 size={20} className="animate-spin" />
          ) : (
            "Entrar"
          )}
        </Button>
      </form>

      <p className="text-sm text-[#617D8A]">ou faça login com</p>

      <div>
        <Button
          onClick={onGoogleSubmit}
          variant="outline"
          size={"lg"}
          className="w-full cursor-pointer"
        >
          <Image src="/google.svg" alt="Google" width={24} height={24} />
          Continuar com o Google
        </Button>

        <p className="text-sm text-[#617D8A] mt-4">
          Ainda não tem uma conta?{" "}
          <Link className="text-[#12A3ED]" href="/signup">
            Crie uma
          </Link>
        </p>
      </div>
    </Form>
  );
};

export default SignInFormComponent;
