export default function StatCard({ title, value }) {
  return (
    <div className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-orange-500 transition">
      <p className="text-gray-400 text-sm">{title}</p>
      <h3 className="text-3xl font-bold mt-2">{value}</h3>
    </div>
  );
}
