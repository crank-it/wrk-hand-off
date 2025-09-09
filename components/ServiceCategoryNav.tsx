'use client'

export default function ServiceCategoryNav() {
  const categories = ['All', 'WEBSITE', 'SEO', 'SOCIAL', 'DESIGN', 'CONTENT', 'EMAIL']

  return (
    <section className="sticky top-16 z-40 bg-white border-b border-gray-100">
      <div className="container mx-auto px-4">
        <div className="flex overflow-x-auto py-4 gap-4">
          {categories.map((category) => (
            <button
              key={category}
              className="px-4 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-700 whitespace-nowrap transition-colors"
              onClick={() => {
                if (category === 'All') {
                  window.scrollTo({ top: 400, behavior: 'smooth' })
                } else {
                  const element = document.getElementById(`category-${category}`)
                  element?.scrollIntoView({ behavior: 'smooth', block: 'start' })
                }
              }}
            >
              {category === 'All' ? 'All Services' : category}
            </button>
          ))}
        </div>
      </div>
    </section>
  )
}