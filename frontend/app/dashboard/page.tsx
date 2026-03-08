export default function Dashboard() {
  return (
    <div className="w-full max-w-4xl">
      <h1 className="text-4xl font-black mb-8 text-[#4A4E7E]">Your Insights</h1>
      <div className="grid grid-cols-2 gap-6">
        <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
           <p className="text-sm uppercase font-bold opacity-50">Burnout Risk</p>
           <p className="text-6xl font-black text-[#E98B8B]">78%</p>
        </div>
        {/* More cards here */}
      </div>
    </div>
  );
}