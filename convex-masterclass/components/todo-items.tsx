"use client";

import { cn } from "@/lib/utils";
import { Checkbox } from "@/components/ui/checkbox";
import { useState } from "react";
import { updateTodoSchema } from "@/lib/zod";
import { z, ZodIssue } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Trash2Icon } from "lucide-react";
import { Doc } from "@/convex/_generated/dataModel";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { ConvexError } from "convex/values";
import { toastManager } from "@/components/ui/toast";

type TodoFormData = z.infer<typeof updateTodoSchema>;


export default function TodoItem({ todo }: { todo: Doc<"todos"> }) {
    const [isChecked, setIsChecked] = useState(todo.completed);
    const [isEditing, setIsEditing] = useState(false);

    const updateTodo = useMutation(api.todos.updateTodo);
    const deleteTodo = useMutation(api.todos.deleteTodo);

    const toast = ({ title, description }: { title: string, description?: string }) => {
        toastManager.add({
            title: title,
            description: description
        })
    }

    const form = useForm<TodoFormData>({
        resolver: zodResolver(updateTodoSchema),
        defaultValues: {
            id: todo._id,
            title: todo.title,
            completed: todo.completed,
        },
    });

    const { register, handleSubmit, setError, clearErrors, reset, getValues, formState } = form;

    const handleDelete = async () => {
        await deleteTodo({ id: todo._id });

        toast({ title: "Success", description: "TODO deleted successfully" });
    };

    const handleUpdate = async (data: TodoFormData) => {
        try {
            await updateTodo(data);
            clearErrors();
            setIsEditing(false);
        } catch (error) {
            if (error instanceof ConvexError && error.data.ZodError) {
                const issues = error.data.ZodError as ZodIssue[];
                const titleIssue = issues.find((i) => i.path.includes("title"));
                if (titleIssue) {
                    setError("title", { message: titleIssue.message });
                    return;
                }
            }
            setError("title", { message: "Failed to update todo" });
        }
    };

    const resetForm = () => {
        reset({ ...getValues(), title: todo.title });
        clearErrors();
        setIsEditing(false);
    };

    const handleToggle = async (checked: boolean) => {
        setIsChecked(checked);
        await handleUpdate({
            id: todo._id,
            title: getValues("title"),
            completed: checked,
        });
        toast({ title: "Success", description: "TODO updated successfully" });
    };

    const handleBlur = () => {
        const title = getValues("title");
        if (!title.trim()) {
            resetForm();
            return;
        }
        if (!formState.errors.title) setIsEditing(false);
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Escape") {
            resetForm();
        }
    };

    const getContainerClassName = () =>
        cn(
            "group flex items-center gap-3 p-4 rounded-lg border transition-colors",
            isEditing
                ? "border-primary bg-primary/10 shadow-lg shadow-primary/20"
                : "border-border hover:border-primary/20 hover:bg-primary/5",
            formState.errors.title && "border-red-500 bg-red-500/10 shadow-red-500/20"
        );

    const getTitleClassName = () =>
        cn(
            "font-medium text-sm group-hover:text-primary transition-colors",
            isChecked && "line-through text-muted-foreground",
            !isChecked && "cursor-pointer",
            formState.errors.title && "text-red-500"
        );

    return (
        <div className={getContainerClassName()}>
            <Checkbox
                checked={isChecked}
                onCheckedChange={handleToggle}
                className="h-5 w-5 border-2 border-muted-foreground data-[state=checked]:bg-primary data-[state=checked]:border-primary"
            />

            <div className="flex-1">
                {isEditing ? (
                    <form onSubmit={handleSubmit(handleUpdate)}>
                        <input
                            {...register("title")}
                            autoFocus
                            onBlur={handleBlur}
                            onKeyDown={handleKeyDown}
                            className="w-full bg-transparent border-none outline-none text-sm p-0 text-primary font-medium focus:outline-none"
                            placeholder="Press Enter to save, Esc to cancel..."
                        />
                    </form>
                ) : (
                    <span
                        onClick={() => !isChecked && setIsEditing(true)}
                        className={getTitleClassName()}
                    >
                        {getValues("title")}
                    </span>
                )}
            </div>

            {formState.errors.title && (
                <span className="text-red-500 text-xs font-bold">
                    {formState.errors.title.message}
                </span>
            )}

            <Button
                onClick={handleDelete}
                variant="secondary"
                size="icon"
                className="hover:bg-destructive group/button bg-white border-red-500"
            >
                <Trash2Icon className="text-destructive/40 group-hover/button:text-destructive-foreground" />
            </Button>
        </div>
    );
}
