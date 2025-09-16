export default function ProductsList() {
  const products = [
    "CFexpress™ v4 Type A",
    "CFexpress™ 2.0 Type B",
    "SDXC™ UHS-II",
    "microSDXC™ UHS-I",
    "Portable SSD",
    "Card Reader CFast 2.0",
    "Tech Pouch",
  ];

  return (
    <div className="p-6">
      <h3 className="text-xl font-semibold mb-4">ERP Products</h3>
      <ul className="list-disc pl-6 space-y-1">
        {products.map((p, i) => (
          <li key={i}>{p}</li>
        ))}
      </ul>
    </div>
  );
}
