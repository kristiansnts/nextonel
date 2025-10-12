import { ValidationRule } from "@/components/ui/form-builder"

export interface UserFormData {
  firstName: string
  lastName: string
  age: number
  email?: string
  phone?: string
  username?: string
  password?: string
  birthDate?: string
  gender?: string
}

export const initialValues: Record<string, unknown> = {
  firstName: "",
  lastName: "",
  age: 18,
  email: "",
  phone: "",
  username: "",
  password: "",
  birthDate: "",
  gender: "",
}

export const validationRules = {
  firstName: {
    required: "First name is required",
    minLength: { value: 2, message: "Must be at least 2 characters" },
    maxLength: { value: 50, message: "Must be less than 50 characters" },
  } as ValidationRule,

  lastName: {
    required: "Last name is required",
    minLength: { value: 2, message: "Must be at least 2 characters" },
    maxLength: { value: 50, message: "Must be less than 50 characters" },
  } as ValidationRule,

  age: {
    required: "Age is required",
    min: { value: 1, message: "Age must be at least 1" },
    max: { value: 150, message: "Age must be less than 150" },
  } as ValidationRule,

  email: {
    pattern: {
      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      message: "Please enter a valid email address",
    },
  } as ValidationRule,

  username: {
    minLength: { value: 3, message: "Must be at least 3 characters" },
    maxLength: { value: 30, message: "Must be less than 30 characters" },
    pattern: {
      value: /^[a-zA-Z0-9_]+$/,
      message: "Username can only contain letters, numbers, and underscores",
    },
  } as ValidationRule,

  password: {
    minLength: { value: 6, message: "Must be at least 6 characters" },
    maxLength: { value: 100, message: "Must be less than 100 characters" },
  } as ValidationRule,

  phone: {
    pattern: {
      value: /^[\d\s\-\+\(\)]+$/,
      message: "Please enter a valid phone number",
    },
  } as ValidationRule,
}

export const genderOptions = [
  { label: "Male", value: "male" },
  { label: "Female", value: "female" },
]

// Helper function to clean up form data before submission
export function prepareUserData(values: Record<string, unknown>): UserFormData {
  const userData: UserFormData = {
    firstName: values.firstName as string,
    lastName: values.lastName as string,
    age: values.age as number,
    email: values.email as string | undefined,
    phone: values.phone as string | undefined,
    username: values.username as string | undefined,
    password: values.password as string | undefined,
    birthDate: values.birthDate as string | undefined,
    gender: values.gender as string | undefined,
  }

  // Remove undefined or empty string fields
  Object.keys(userData).forEach((key) => {
    const value = userData[key as keyof UserFormData]
    if (value === undefined || value === "") {
      delete userData[key as keyof UserFormData]
    }
  })

  return userData
}

// API submission function
export async function submitUser(userData: UserFormData) {
  const response = await fetch("https://dummyjson.com/users/add", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(userData),
  })

  if (!response.ok) {
    throw new Error("Failed to create user")
  }

  return response.json()
}
