const questions = [
  {
    q: 'Can I learn something outside a formal course?',
    a: 'Yes. Start with a subject, a specific question, or a skill you want to understand. Morrow is designed for self-directed learning across different subjects.',
  },
  {
    q: 'Do I need to know exactly what to ask?',
    a: 'No. You can begin with a broad topic and narrow it down as you learn. The Explain, Practice, Quiz, Review, and Explore modes give you different ways into the same subject.',
  },
]

export function FaqSection() {
  return (
    <section id="faq" className="page py-section">
      <div className="grid gap-10 lg:grid-cols-[.8fr_1.2fr] lg:gap-16">
        <div>
          <h2 className="text-heading font-bold">Questions</h2>
          <p className="mt-4 max-w-sm text-base text-muted">A few things people often want to know before getting started.</p>
        </div>
        <div className="divide-y divide-ink/15 border-y border-ink/15">
          {questions.map(({ q, a }) => (
            <details key={q} className="group">
              <summary className="flex min-h-14 list-none items-center justify-between gap-5 py-4 font-display text-lg font-semibold marker:hidden [&::-webkit-details-marker]:hidden">
                {q}
                <span
                  aria-hidden="true"
                  className="grid h-8 w-8 shrink-0 place-items-center rounded-md border border-ink/30 text-lg font-normal transition-transform duration-200 group-open:rotate-45"
                >
                  +
                </span>
              </summary>
              <p className="max-w-xl pb-6 text-base text-muted">{a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  )
}
