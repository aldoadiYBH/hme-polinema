// components/LogoutButton.tsx
"use client"

import { signOut } from "next-auth/react"
import { Button } from "@/components/ui/button"

export default function LogoutButton() {
  return (
    <Button
      variant="outline"
      onClick={() =>
        signOut({
          callbackUrl: "/", // redirect after logout
        })
      }
      className="cursor-pointer hover:bg-red-500"   
    >
      Logout
    </Button>
  )
}
