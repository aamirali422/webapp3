export default function OrdersTable() {
  const orders = [
    { orderNo: "ORD-001", status: "Shipped", product: "CFexpress v4", customer: "john@example.com" },
    { orderNo: "ORD-002", status: "Pending", product: "SDXC UHS-II", customer: "sara@example.com" },
  ];

  return (
    <div className="p-6">
      <h3 className="text-xl font-semibold mb-4">Orders History</h3>
      <table className="w-full border border-gray-300">
        <thead className="bg-gray-100">
          <tr>
            <th className="border px-4 py-2">Order No</th>
            <th className="border px-4 py-2">Status</th>
            <th className="border px-4 py-2">Product</th>
            <th className="border px-4 py-2">Customer</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((o, idx) => (
            <tr key={idx} className="hover:bg-gray-50">
              <td className="border px-4 py-2">{o.orderNo}</td>
              <td className="border px-4 py-2">{o.status}</td>
              <td className="border px-4 py-2">{o.product}</td>
              <td className="border px-4 py-2">{o.customer}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
