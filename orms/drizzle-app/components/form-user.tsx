import { Card, CardHeader, CardTitle, CardContent, CardDescription } from './ui/card';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Label } from './ui/label';
import { createUser } from '@/actions';

const FormUser = () => {
    return (
        <Card className="w-full mx-auto">
            <CardHeader>
                <CardTitle className="text-2xl font-bold text-center">Add User</CardTitle>
                <CardDescription className="text-center">Add a new user to the database</CardDescription>
            </CardHeader>
            <CardContent>
                <form action={createUser} className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="name">Name</Label>
                        <Input id="name" name="name" type="text" placeholder="Enter name" required />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input id="email" name="email" type="email" placeholder="Enter email" required />
                    </div>
                    <Button type="submit" className="w-full">Add User</Button>
                </form>
            </CardContent>
        </Card>
    )
}

export default FormUser;
