"use client";

import { Input } from "@/components/ui/input";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z, ZodIssue } from "zod";
import { createTodoSchema } from "@/lib/zod";
import { cn } from "@/lib/utils";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { ConvexError } from "convex/values";
import { toastManager } from "@/components/ui/toast"

type TodoFormData = z.infer<typeof createTodoSchema>;

export default function CreateTodo() {
    const toast = ({ title, description }: { title: string, description?: string }) => {
        toastManager.add({
            title: title,
            description: description
        })
    }

    const createTodo = useMutation(api.todos.createTodo);

    const {
        register,
        handleSubmit,
        reset,
        setError,
        formState,
        setFocus
    } = useForm<TodoFormData>({
        resolver: zodResolver(createTodoSchema),
        defaultValues: {
            title: "",
            completed: false,
        },
    });

    useEffect(() => {
        if (!formState.isSubmitting) {
            setFocus("title");
        }
    }, [formState.isSubmitting]);

    const getInputClassName = () => {
        const base =
            "px-4 py-7 border focus:outline-none focus:ring-0 active:outline-none active:ring-0 placeholder:text-white";

        const error =
            "border-red-500 bg-red-500/10 shadow-lg shadow-red-500/20";

        const normal =
            "shadow-md shadow-primary/20 border-primary/50 bg-primary text-primary-foreground placeholder:text-white";

        return cn(base, formState.errors.title ? error : normal);
    };

    const onSubmit = async (data: TodoFormData) => {
        try {
            await createTodo({ title: data.title, completed: false });
            toast({ title: "Success", description: "Todo created successfully!" });
            reset();
        } catch (error) {
            if (error instanceof ConvexError && error.data.ZodError) {
                const issues = error.data.ZodError as ZodIssue[];
                const titleIssue = issues.find((i) => i.path.includes("title"));
                if (titleIssue) {
                    setError("title", { message: titleIssue.message });
                    return;
                }
            }
            setError("title", { message: "Failed to create todo" });
            toast({ title: "Error", description: "Failed to Create TODO" });
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="w-full flex flex-col gap-2">

            {/* INPUT */}
            <Input
                {...register("title")}
                type="text"
                placeholder="What are you planning to do?"
                disabled={formState.isSubmitting}
                className={getInputClassName()}
            />

            {/* ERROR MESSAGE */}
            {formState.errors.title && (
                <p className="text-red-500 font-bold text-sm">
                    {formState.errors.title.message}
                </p>
            )}
        </form>
    );
}
