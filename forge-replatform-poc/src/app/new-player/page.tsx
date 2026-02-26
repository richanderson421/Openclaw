export default function NewPlayerPage() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-8 sm:px-6">
      <h1 className="text-2xl font-bold">New Player Guide (POC)</h1>
      <p className="mt-2 text-zinc-700">Not sure where to start? Pick a game, show up 15 minutes early, and we&apos;ll get you seated.</p>

      <div className="mt-6 space-y-3">
        <section className="rounded-xl border bg-white p-4 shadow-sm">
          <h2 className="font-semibold">Step 1: Pick your game night</h2>
          <p className="text-sm text-zinc-600">Commander, One Piece, Pokemon, SWU, and more each week.</p>
        </section>
        <section className="rounded-xl border bg-white p-4 shadow-sm">
          <h2 className="font-semibold">Step 2: Bring the basics</h2>
          <p className="text-sm text-zinc-600">Deck, sleeves, and good vibes. Staff can help with products if needed.</p>
        </section>
        <section className="rounded-xl border bg-white p-4 shadow-sm">
          <h2 className="font-semibold">Step 3: Join the community</h2>
          <p className="text-sm text-zinc-600">Use Discord for reminders, format talk, and pickups.</p>
        </section>
      </div>
    </main>
  );
}
