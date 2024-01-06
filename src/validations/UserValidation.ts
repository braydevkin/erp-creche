import * as z from "zod";

export const UserSchemaValidation = z.object({
  name: z
    .string()
    .min(1, { message: "Você deve preencher o campo nome" })
    .max(20, { message: "Campo nome deve conter no máximo 20 caractéres" })
    .optional(),
  email: z
    .string()
    .min(1, { message: "This field e-mail has to be filled." })
    .email("This is not a valid email."),
  password: z
    .string()
    .min(6, { message: "This field password has to be filled." }),
});
