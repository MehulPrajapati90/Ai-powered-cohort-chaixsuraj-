import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { currentUser } from '@/actions/auth'
import UserButton from '@/components/auth/user-button';
import LogoutButton from "@/components/auth/logout-button";
import StripeComponent from "@/components/payment/stripe-component";

const Home = async () => {
  const user = await currentUser();
  return (
    <main className="flex flex-col items-center justify-center px-4 py-12 relative">
      <div className="flex min-h-auto flex-col items-center justify-center py-2 absolute top-5 right-5">
        <UserButton user={user} />
      </div>

      <Tabs defaultValue="stripe">
        <TabsList>
          <TabsTrigger value="stripe">Stripe🟣</TabsTrigger>
          <TabsTrigger value="polar">Polar🟢</TabsTrigger>
          <TabsTrigger value="razorpay">Razorpay🔵</TabsTrigger>
        </TabsList>
        <TabsContent value="stripe">
          <StripeComponent plan={user?.plan!} />
        </TabsContent>
        <TabsContent value="polar">
          <h1 className="text-zinc-600 font-semibold">
            In upcoming lectures...
          </h1>
        </TabsContent>
        <TabsContent value="razorpay">
          <h1 className="text-zinc-600 font-semibold">
            In upcoming lectures...
          </h1>
        </TabsContent>
      </Tabs>
      <div className="mt-10 flex flex-col items-center justify-center"><LogoutButton /></div>

    </main>
  )
}

export default Home;