export default function AppHome() {
  return (
    <main className="space-y-6">
      <section className="card">
        <h2 className="text-xl font-semibold">Portal Home</h2>
        <p className="mt-2">Replace this with auth & tenant switcher. Links below route to stubbed areas.</p>
        <ul className="list-disc ml-6 mt-3 space-y-1">
          <li><a className="underline" href="/app/requests">Requests</a></li>
          <li><a className="underline" href="/app/projects">Projects</a></li>
          <li><a className="underline" href="/app/quotes">Quotes</a></li>
          <li><a className="underline" href="/app/billing">Billing</a></li>
          <li><a className="underline" href="/app/brand">Brand Kit</a></li>
        </ul>
      </section>
    </main>
  )
}
