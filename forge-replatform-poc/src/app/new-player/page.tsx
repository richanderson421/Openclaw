export default function NewPlayerPage() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-8 sm:px-6">
      <div className="forge-card p-6">
        <h1 className="text-2xl font-bold">New Player Guide</h1>
        <p className="mt-2 text-slate-700">Never played in-store before? You&apos;re exactly who this page is for.</p>
      </div>

      <div className="mt-4 space-y-3">
        <section className="forge-card p-4">
          <h2 className="font-semibold">1) Pick your game night</h2>
          <p className="text-sm text-slate-600">Choose MTG, One Piece, Pokémon, SWU, Riftbound, and more.</p>
        </section>
        <section className="forge-card p-4">
          <h2 className="font-semibold">2) Bring the basics</h2>
          <p className="text-sm text-slate-600">Deck, sleeves, and questions. Staff can help with the rest.</p>
        </section>
        <section className="forge-card p-4">
          <h2 className="font-semibold">3) Join the community</h2>
          <p className="text-sm text-slate-600">Stay synced with events, updates, and pickup games in Discord.</p>
        </section>
      </div>
    </main>
  );
}
