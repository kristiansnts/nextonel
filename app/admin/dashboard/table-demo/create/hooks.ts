import { useState } from "react"
import { prepareUserData, submitUser, UserFormData } from "./form-validation"

interface UseCreateUserResult {
  isSubmitting: boolean
  response: UserFormData | null
  error: string | null
  handleSubmit: (values: Record<string, unknown>) => Promise<void>
  resetResponse: () => void
}

export function useCreateUser(): UseCreateUserResult {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [response, setResponse] = useState<UserFormData | null>(null)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (values: Record<string, unknown>) => {
    setIsSubmitting(true)
    setResponse(null)
    setError(null)

    try {
      const userData = prepareUserData(values)
      const data = await submitUser(userData)

      setResponse(data)
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "An error occurred"
      setError(errorMessage)
      console.error("Error creating user:", err)
    } finally {
      setIsSubmitting(false)
    }
  }

  const resetResponse = () => {
    setResponse(null)
    setError(null)
  }

  return {
    isSubmitting,
    response,
    error,
    handleSubmit,
    resetResponse,
  }
}
