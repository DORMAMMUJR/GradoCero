export default function AdminLoading() {
  return (
    <div className="animate-pulse space-y-6">
      <div className="h-10 w-72 rounded-xl bg-white/5" />
      <div className="grid gap-4 md:grid-cols-3">
        {[0, 1, 2].map((item) => (
          <div key={item} className="h-36 rounded-2xl bg-white/5" />
        ))}
      </div>
      <div className="h-96 rounded-2xl bg-white/5" />
    </div>
  );
}
