"use client";

import { deleteUser } from '@/actions';
import { Button } from './ui/button';
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from './ui/card';
import { toast } from 'sonner';

interface User {
    id: string;
    name: string;
    email: string;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
}

const UserList = ({ users }: { users: User[] }) => {
    const handleDelete = async (id: string) => {
        try {
            await deleteUser(id);
            toast.success("User deleted successfully");
        } catch (error) {
            toast.error("Failed to delete user");
        }
    }
    return (
        <div className="grid gap-4 max-w-2xl mx-auto w-full">
            {users.map((user) => (
                <Card key={user.id} className="hover:shadow-md transition-shadow">
                    <CardHeader className="pb-2">
                        <CardTitle className="text-lg">{user.name}</CardTitle>
                        <CardDescription>{user.email}</CardDescription>
                        <CardFooter className="flex justify-end gap-2">
                            <Button variant="outline">Edit</Button>
                            <Button type='button' onClick={() => handleDelete(user.id)} variant="destructive">Delete</Button>
                        </CardFooter>
                    </CardHeader>
                </Card>
            ))}
        </div>
    )
}

export default UserList;