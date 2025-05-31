"use client"

import { signIn } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useState } from "react"

export default function LoginPage() {
  const router = useRouter()
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    const form = e.currentTarget as HTMLFormElement
    const username = (form.username as HTMLInputElement).value
    const password = (form.password as HTMLInputElement).value

    const res = await signIn("credentials", {
      redirect: false,
      username,
      password,
    })

    setLoading(false)

    if (res?.error) {
      setError("Username atau password salah")
    } else {
      router.push("/dashboard")
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      <form
        onSubmit={handleLogin}
        className="bg-white p-8 rounded shadow-md w-full max-w-sm space-y-4"
      >
        <h1 className="text-xl font-semibold">Login Admin</h1>
        {error && <p className="text-red-500">{error}</p>}
        <input
          name="username"
          placeholder="Username"
          className="w-full p-2 border rounded"
          required
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          className="w-full p-2 border rounded"
          required
        />
        <button
          type="submit"
          className="w-full bg-black text-white py-2 rounded"
          disabled={loading}
        >
          {loading ? "Loading..." : "Login"}
        </button>
      </form>
    </div>
  )
}
  