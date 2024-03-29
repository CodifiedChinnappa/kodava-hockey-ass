import * as z from "zod";

const IndianPhoneNumberRegex = /^[6789]\d{9}$/;

// const ConfirmPasswordMatcher = mixed().refine(
//   (val, ctx) => {
//     const { formData } = ctx;
//     return !!val && val === formData.password;
//   },
//   {
//     message: "Passwords must match",
//     path: ["confirmPassword"],
//   }
// );

export const SettingsSchema = z
  .object({
    name: z.optional(z.string()),
    isTwoFactorEnabled: z.optional(z.boolean()),
    // role: z.enum([UserRole.ADMIN, UserRole.USER]),
    email: z.optional(z.string().email()),
    password: z.optional(z.string().min(6)),
    newPassword: z.optional(z.string().min(6)),
  })
  .refine(
    (data) => {
      if (data.password && !data.newPassword) {
        return false;
      }

      return true;
    },
    {
      message: "New password is required!",
      path: ["newPassword"],
    }
  )
  .refine(
    (data) => {
      if (data.newPassword && !data.password) {
        return false;
      }

      return true;
    },
    {
      message: "Password is required!",
      path: ["password"],
    }
  );

export const NewPasswordSchema = z.object({
  password: z.string().min(6, {
    message: "Minimum of 6 characters required",
  }),
});

export const ChangePasswordSchema = z.object({
  email: z.string().email({
    message: "Email is required",
  }),
  password: z.string().min(6, {
    message: "Minimum of 6 characters required",
  }),
});

export const ResetSchema = z.object({
  email: z.string().email({
    message: "Email is required",
  }),
});

export const LoginSchema = z.object({
  email: z.string().email({
    message: "Email is required",
  }),
  password: z.string().min(1, {
    message: "Password is required",
  }),
  code: z.optional(z.string()),
});

export const RegisterSchema = z.object({
  name: z
    .string()
    .min(1, "Name is required")
    .max(30, "Must be less than or equal to 30 characters."),
  email: z.string().email("Invalid email address"),
  phoneNumber: z
    .string()
    .regex(IndianPhoneNumberRegex, "Enter a valid contact number."),
  alternateNumber: z
    .string()
    .regex(IndianPhoneNumberRegex, "Enter a valid alternate contact number.")
    .optional(),
});

export const AddFamilySchema = z.object({
  familyName: z.string(),
  createdBy: z.string(),
});

// Define the main schema for Matches model
export const MatchesSchema = z.object({
  venue: z.string(),
  pool: z.string(),
  team1: z.string(),
  team2: z.string(),
  scheduledOn: z.string(),
  round: z.string(),
  createdBy: z.string(),
});
