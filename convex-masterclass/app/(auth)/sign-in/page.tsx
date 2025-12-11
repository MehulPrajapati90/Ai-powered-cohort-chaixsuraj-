"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Spinner } from "@/components/ui/spinner"
import { Github } from "lucide-react"
import { useAuthActions } from "@convex-dev/auth/react"
import { useState } from "react"

export default function SignIn() {
    const { signIn } = useAuthActions()
    const [isLoading, setIsLoading] = useState(false)

    const handleGithubSignIn = async () => {
        setIsLoading(true)
        await signIn("github", {
            redirectTo: "/",
        })
    }

    return (
        <div className="grow flex flex-col items-center justify-center gap-4 p-8 text-center">
            <Card className="w-full max-w-xs shadow-2xl">
                <CardHeader className="text-center">
                    <CardTitle className="text-xl">Welcome back</CardTitle>
                    <CardDescription>Login with your Github account</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="grid gap-6">
                        <div className="flex flex-col gap-4">
                            <Button onClick={handleGithubSignIn} disabled={isLoading} className="w-full font-semibold" size="lg">
                                {isLoading ? (
                                    <>
                                        <Spinner className="mr-2 h-4 w-4" />
                                        Signing in...
                                    </>
                                ) : (
                                    <>
                                        <Github className="mr-2 h-4 w-4" />
                                        Login with Github
                                    </>
                                )}
                            </Button>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}