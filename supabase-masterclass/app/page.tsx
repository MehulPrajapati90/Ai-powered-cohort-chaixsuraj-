import { Button } from '@/components/ui/button';
import { createClient } from '@/lib/supabase/server';

const Page = async () => {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  return (
    <div className='flex flex-col items-center justify-center h-screen'>
      <form action="/logout" method='post'>
        <Button>Logout</Button>
      </form>
      {JSON.stringify(user?.user_metadata, null, 2)}
    </div>
  )
}

export default Page;