import { useAuth } from '../context/AuthContext'

export default function Account() {
  const { user, logout } = useAuth()

  return (
    <section className="shell py-16">
      <h1 className="text-h2">My account</h1>
      <div className="mt-8 card p-8">
        <div className="flex items-center gap-4">
          <div className="h-16 w-16 rounded-full bg-ink text-paper flex items-center justify-center text-2xl font-extrabold">
            {user?.name?.[0]?.toUpperCase() || 'U'}
          </div>
          <div>
            <h2 className="text-xl font-semibold">{user?.name}</h2>
            <p className="text-sm text-muted">{user?.email}</p>
          </div>
        </div>
        <button onClick={() => logout()} className="btn-outline mt-8">Log out</button>
      </div>
    </section>
  )
}
