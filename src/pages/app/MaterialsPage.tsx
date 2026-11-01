import { FileText, FolderOpen, Plus, Search, UploadCloud } from 'lucide-react'
import { useState } from 'react'
import { sampleMaterials } from '../../data/learning'
import { toneFor } from '../../lib/tones'

export function MaterialsPage() {
  const [query, setQuery] = useState('')
  const [notice, setNotice] = useState('')
  const visible = sampleMaterials.filter((item) => item.name.toLowerCase().includes(query.toLowerCase()))

  return (
    <div className="page py-10 md:py-14">
      <h1 className="page-title">Materials</h1>
      <p className="mt-3 max-w-xl text-base text-muted">Keep useful notes and reading close to the topics you are learning.</p>

      <div className="my-9 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative max-w-md flex-1">
          <label htmlFor="materials-search" className="sr-only">
            Search your materials
          </label>
          <Search size={17} aria-hidden="true" className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-muted" />
          <input
            id="materials-search"
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search your materials"
            className="field pl-11"
          />
        </div>
        <button
          onClick={() => setNotice('File upload will be connected when storage and document processing are implemented.')}
          className="btn btn-primary min-h-12"
        >
          <Plus size={17} aria-hidden="true" /> Add material
        </button>
      </div>

      {notice && (
        <p role="status" className="mb-5 rounded-md bg-yellow-soft p-4 text-sm">
          {notice}
        </p>
      )}

      <ul className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {visible.map((item, i) => (
          <li key={item.name} className="card overflow-hidden">
            <div className={`flex h-40 items-center justify-center ${toneFor(i)}`}>
              <div className="grid h-20 w-16 place-items-center rounded-sm bg-surface shadow-card">
                <FileText size={26} aria-hidden="true" className="text-accent" />
                <span className="-mt-3 text-xs font-medium text-muted">{item.kind}</span>
              </div>
            </div>
            <div className="p-5">
              <h2 className="text-lg">{item.name}</h2>
              <p className="mt-1 text-sm text-muted">
                {item.kind}, {item.detail}
              </p>
              <p className="mt-5 flex items-center gap-2 border-t border-line pt-4 text-sm text-muted">
                <FolderOpen size={16} aria-hidden="true" />
                {item.topic}
              </p>
            </div>
          </li>
        ))}
      </ul>

      {visible.length === 0 && (
        <div className="rounded-lg border border-dashed border-field py-16 text-center">
          <p className="font-display text-xl font-semibold">No matching materials</p>
          <p className="mt-2 text-sm text-muted">Try another search term.</p>
        </div>
      )}

      <div className="mt-8 rounded-xl border border-dashed border-field bg-surface/60 px-6 py-12 text-center">
        <UploadCloud size={26} aria-hidden="true" className="mx-auto text-accent" />
        <h2 className="mt-4 text-xl">Bring your own material</h2>
        <p className="mx-auto mt-2 max-w-md text-sm text-muted">
          PDF, DOCX, and presentation uploads will be enabled with the document storage and extraction service.
        </p>
      </div>
    </div>
  )
}
