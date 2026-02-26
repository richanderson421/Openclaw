type Props = { params: Promise<{ slug: string }> };

export default async function CategoryPage({ params }: Props) {
  const { slug } = await params;
  return (
    <main className="mx-auto max-w-4xl px-4 py-8 sm:px-6">
      <h1 className="text-2xl font-bold capitalize">{slug.replace(/-/g, ' ')} (POC)</h1>
      <p className="mt-2 text-zinc-700">
        Category landing page concept: featured products, upcoming events, and quick links for this game community.
      </p>
      <div className="mt-6 rounded-xl border bg-white p-4 text-sm text-zinc-600 shadow-sm">
        Placeholder sections: New Arrivals · Event Schedule · Starter Picks · Community Links
      </div>
    </main>
  );
}
