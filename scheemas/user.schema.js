 import z from "zod";
 
 export const userSchema = z.object({
        name : z.string().min(2),
        age : z.number().min(18),
        email : z.email()
    }); 
export const searchQuerySchema = z.object({
  q: z.string().min(1).optional(),
  page: z.coerce.number().int().positive().default(1),
});

export const idParamSchema = z.object({
  id: z.coerce.number().int().positive(),
});