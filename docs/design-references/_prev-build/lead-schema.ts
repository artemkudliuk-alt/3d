import { z } from "zod";

export const leadSchema = z.object({
  name: z.string().trim().min(2, "Вкажіть ім'я"),
  company: z.string().trim().min(2, "Вкажіть назву готелю або компанії"),
  contact: z.string().trim().min(5, "Телефон або @telegram"),
  email: z.email("Некоректний email"),
});

export type Lead = z.infer<typeof leadSchema>;
