import fs from 'node:fs'
import path from 'node:path'
import React from 'react'

function md(file: string) {
  const p = path.join(process.cwd(), 'docs', file)
  return fs.readFileSync(p, 'utf-8')
}

export default function Docs() {
  const spec = md('service-platform-spec.md')
  const design = md('work_website_brief.md')
  return (
    <main className="space-y-6">
      <section className="card">
        <h2 className="text-xl font-semibold">Docs</h2>
        <p className="text-sm text-gray-600">Bundled docs rendered below for quick reference.</p>
      </section>
      <section className="card whitespace-pre-wrap">
        <h3 className="text-lg font-semibold mb-2">Service Platform Spec (Markdown)</h3>
        <article className="prose max-w-none">{spec}</article>
      </section>
      <section className="card whitespace-pre-wrap">
        <h3 className="text-lg font-semibold mb-2">WORK Website Brief</h3>
        <article className="prose max-w-none">{design}</article>
      </section>
    </main>
  )
}
