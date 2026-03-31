import { auth } from '@/auth'
import { redirect } from 'next/navigation'
import UnifiedHome from '@/components/auth/unified-home'

export default async function HomePage() {
  const session = await auth()

  if (session?.user) {
    redirect('/dashboard')
  }

  return <UnifiedHome session={session} />
}
