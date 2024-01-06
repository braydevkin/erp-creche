"use client";

import React, { useMemo } from "react";

import { useForm } from "react-hook-form";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormDescription,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import InputFieldError from "@/components/InputFieldError";

import { UserSchemaValidation } from "@/validations/UserValidation";
import { useToast } from "@/components/ui/use-toast";

const Signin: React.FC = () => {
  const { toast } = useToast();

  const form = useForm<z.infer<typeof UserSchemaValidation>>({
    resolver: zodResolver(UserSchemaValidation),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { emailError, passwordError } = useMemo(() => {
    const { email: emailError, password: passwordError } =
      form.formState.errors;

    return {
      emailError: emailError?.message,
      passwordError: passwordError?.message,
    };
  }, [form.formState.errors]);

  function onSubmit(data: z.infer<typeof UserSchemaValidation>) {
    toast({
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    });
  }

  return (
    <section className="max-w-[100vw] h-screen flex justify-center items-center bg-blue-500">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="p-16 w-2/6 bg-white rounded-lg shadow-xl"
        >
          <FormItem className="flex flex-col items-start space-y-3">
            <FormLabel>E-mail</FormLabel>
            <Input
              type="email"
              placeholder="Escreva seu e-mail de acesso"
              {...form.register("email")}
            />
            {emailError && <InputFieldError message={emailError} />}

            <FormLabel>Senha</FormLabel>
            <Input
              type="password"
              placeholder="Escreva sua senha de acesso"
              {...form.register("password")}
            />
            {passwordError && <InputFieldError message={passwordError} />}

            <FormDescription>
              Esqueceu sua senha ? Recupere clicando aqui.
            </FormDescription>
            <FormMessage />
          </FormItem>

          <div className="w-full flex justify-end">
            <Button
              className="bg-blue-500 hover:bg-blue-400 transition-all delay-150 hover:scale-105"
              type="submit"
            >
              Entrar
            </Button>
          </div>
        </form>
      </Form>
    </section>
  );
};

export default Signin;
