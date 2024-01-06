"use client";

import React, { useMemo } from "react";

import { useForm } from "react-hook-form";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Form,
  FormDescription,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import InputFieldError from "@/components/InputFieldError";

import { UserSchemaValidation } from "@/validations/UserValidation";
import { ToastAction } from "@/components/ui/toast";

const Signup: React.FC = () => {
  const { toast } = useToast();

  const form = useForm<z.infer<typeof UserSchemaValidation>>({
    resolver: zodResolver(UserSchemaValidation),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const { emailError, passwordError, nameError } = useMemo(() => {
    const {
      email: emailError,
      password: passwordError,
      name: nameError,
    } = form.formState.errors;

    return {
      emailError: emailError?.message,
      passwordError: passwordError?.message,
      nameError: nameError?.message,
    };
  }, [form.formState.errors]);

  async function onSubmit(data: z.infer<typeof UserSchemaValidation>) {
    console.log({ data });
    const request = await fetch("/api/users", {
      method: "POST",
      headers: {
        "Content-type": "applicaition/json",
      },
      body: JSON.stringify(data),
    });

    const response = await request.json();

    if (!request.ok) {
      toast({
        title: "Oooops...",
        description: response.error,
        variant: "destructive",
        action: (
          <ToastAction altText="Tente Novamente">Tente Novamente</ToastAction>
        ),
      });
    } else {
      console.log({ response });
    }
  }

  return (
    <section className="max-w-[100vw] h-screen flex justify-center items-center bg-blue-500">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="p-16 w-2/6 bg-white rounded-lg shadow-xl"
        >
          <FormItem className="flex flex-col items-start space-y-3">
            <FormLabel>Nome</FormLabel>
            <Input
              type="text"
              placeholder="Escreva nome completo"
              {...form.register("name")}
            />
            {nameError && <InputFieldError message={nameError} />}

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

            <FormDescription>Já tem conta ? Faça login</FormDescription>
            <FormMessage />
          </FormItem>

          <div className="w-full flex justify-end">
            <Button
              className="bg-blue-500 hover:bg-blue-400 transition-all delay-150 hover:scale-105"
              type="submit"
            >
              Regitrar
            </Button>
          </div>
        </form>
      </Form>
    </section>
  );
};

export default Signup;
