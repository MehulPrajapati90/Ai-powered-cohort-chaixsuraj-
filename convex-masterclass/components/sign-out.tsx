"use client"

import { useAuthActions } from "@convex-dev/auth/react"
import { Button } from "@/components/ui/button"
import { Spinner } from "@/components/ui/spinner"
import { useState } from "react"

export function SignOut() {
    const { signOut } = useAuthActions()
    const [isLoading, setIsLoading] = useState(false)

    return (
        <Button
            variant="destructive"
            size="sm"
            onClick={() => {
                setIsLoading(true)
                void signOut()
            }}
            disabled={isLoading}
            className="w-full"
        >
            {isLoading ? (
                <>
                    <Spinner className="mr-2 h-4 w-4" />
                    Signing out...
                </>
            ) : (
                "Sign out"
            )}
        </Button>
    )
}