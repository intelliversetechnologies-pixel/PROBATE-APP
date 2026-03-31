import { auth } from '@/auth'
import { redirect } from 'next/navigation'
import RoleLogin from '@/components/auth/role-login'

export default async function LoginPage({
  searchParams,
}: {
  searchParams?: Promise<{ role?: string }>
}) {
  const session = await auth()

  if (session?.user) {
    redirect('/dashboard')
  }

  const params = (await searchParams) ?? {}

  return <RoleLogin role={params.role} />
}
