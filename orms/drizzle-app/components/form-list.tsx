import { getAllUsers } from '@/actions'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import UserList from './user-list';

const FormList = async () => {
    const users = await getAllUsers();

    if (users.length === 0) {
        return (
            <Card className="w-full mx-auto">
                <CardHeader>
                    <CardTitle className="text-2xl font-bold text-center">No users found</CardTitle>
                </CardHeader>
                <CardContent>
                    <CardDescription className="text-center">Add your first user to get started!</CardDescription>
                </CardContent>
            </Card>
        )
    }

    return (
        <UserList users={users} />
    )
}

export default FormList;