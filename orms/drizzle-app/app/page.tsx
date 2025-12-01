import UserList from "@/components/form-list";
import UserForm from "@/components/form-user";

const Home = () => {
  return (
    <div className="container mx-auto p-6 w-4xl">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">User Management</h1>
      </div>
      <div className="flex items-start justify-start gap-4 w-full min-h-full py-10">
        <UserList />
        <UserForm />
      </div>
    </div>
  )
}

export default Home;