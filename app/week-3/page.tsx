import { ItemList } from "./item-list";

export default function Page() {
  return (
    <main className="min-h-screen bg-black p-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-4xl font-bold text-white mb-8">Shopping List</h1>
        <ItemList />
      </div>
    </main>
  );
}
