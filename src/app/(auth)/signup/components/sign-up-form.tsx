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
import { useState } from "react";
import { toast } from "sonner";

const formSchema = z.object({
  full_name: z.string().trim().min(1, "Nome obrigatório"),
  email: z
    .email({ message: "Email inválido" })
    .trim()
    .min(1, "Email obrigatório"),
  password: z
    .string()
    .trim()
    .min(8, "A senha deve conter pelo menos 8 caracteres"),
});

const SignUpFormComponent = () => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      full_name: "",
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);

    await authClient.signUp.email({
      name: values.full_name,
      email: values.email,
      password: values.password,
      fetchOptions: {
        onSuccess: () => {
          setIsLoading(false);
          router.push("/");
        },
        onError(context) {
          setIsLoading(false);
          if (context.error.code === "USER_ALREADY_EXISTS_USE_ANOTHER_EMAIL") {
            toast.error("Email já cadastrado");
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
          name="full_name"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  placeholder="Nome Completo"
                  className="w-full h-14"
                  {...field}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
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
            "Criar Conta"
          )}
        </Button>
      </form>
    </Form>
  );
};

export default SignUpFormComponent;
