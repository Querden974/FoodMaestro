import {z} from "zod";

export const UserInfoSchema = z.object({
    UserId:z.number(),
    FirstName: z.string(),
    LastName: z.string(),
    Birthday: z.date(),
})

export type FormDataUserInfo = z.infer<typeof UserInfoSchema>;