import { useState, useMemo, useRef, useEffect } from "react";

// Dummy tickets generator
const generateTickets = () => {
  const tickets = [];
  const subjects = ["Login Issue", "Payment Failed", "Bug Report", "Feature Request", "Account Locked"];
  const reasons = ["Support", "Complaint", "Feedback", "Inquiry", "Other"];
  const agents = ["Agent One", "Agent Two"];
  const requesters = ["john@example.com", "sara@example.com", "mike@example.com", "lisa@example.com", "tom@example.com"];
  const products = [
    "CFexpress™ v4 Type A",
    "CFexpress™ 2.0 Type B",
    "SDXC™ UHS-II",
    "microSDXC™ UHS-I",
    "Portable SSD",
    "Card Reader CFast 2.0",
    "Tech Pouch"
  ];

  for (let i = 1; i <= 40; i++) {
    tickets.push({
      id: 1000 + i,
      subject: subjects[i % subjects.length],
      reason: reasons[i % reasons.length],
      requester: requesters[i % requesters.length],
      agent: agents[i % agents.length],
      product: products[i % products.length],
    });
  }
  return tickets;
};

export default function TicketsList({ onSelectTicket }) {
  const allTickets = useRef(generateTickets());
  const [searchId, setSearchId] = useState("");
  const [selectedProduct, setSelectedProduct] = useState("");
  const [selectedAgent, setSelectedAgent] = useState("");
  const [visibleCount, setVisibleCount] = useState(10);

  const containerRef = useRef();

  const allProducts = [
    "CFexpress™ v4 Type A",
    "CFexpress™ 2.0 Type B",
    "SDXC™ UHS-II",
    "microSDXC™ UHS-I",
    "Portable SSD",
    "Card Reader CFast 2.0",
    "Tech Pouch"
  ];
  const allAgents = ["Agent One", "Agent Two"];

  // Filter tickets with useMemo
  const filteredTickets = useMemo(() => {
    return allTickets.current.filter((t) => {
      const matchId = searchId ? t.id.toString().includes(searchId) : true;
      const matchProduct = selectedProduct ? t.product === selectedProduct : true;
      const matchAgent = selectedAgent ? t.agent === selectedAgent : true;
      return matchId && matchProduct && matchAgent;
    });
  }, [searchId, selectedProduct, selectedAgent]);

  const visibleTickets = useMemo(() => filteredTickets.slice(0, visibleCount), [filteredTickets, visibleCount]);

  // Infinite scroll using IntersectionObserver
  const loadMoreRef = useRef();
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && visibleCount < filteredTickets.length) {
          setVisibleCount((prev) => prev + 10);
        }
      },
      { root: containerRef.current, threshold: 1 }
    );
    if (loadMoreRef.current) observer.observe(loadMoreRef.current);
    return () => observer.disconnect();
  }, [visibleTickets, filteredTickets.length, visibleCount]);

  // Remove ticket
  const handleRemove = (id) => {
    allTickets.current = allTickets.current.filter((t) => t.id !== id);
    if (visibleCount > 0) setVisibleCount((prev) => prev - 1);
  };

  return (
    <div className="flex flex-col h-full p-6 bg-gray-50">
      <h3 className="text-xl font-semibold mb-4">Zendesk Tickets</h3>

      {/* Filters */}
      <div className="flex flex-wrap gap-4 mb-4 items-end">
        {/* Ticket ID Search */}
        <input
          type="text"
          placeholder="Search Ticket ID"
          value={searchId}
          onChange={(e) => setSearchId(e.target.value)}
          className="border px-3 py-2 rounded-lg w-48 focus:ring-2 focus:ring-indigo-200"
        />

        {/* Product dropdown */}
        <select
          value={selectedProduct}
          onChange={(e) => setSelectedProduct(e.target.value)}
          className="border px-3 py-2 rounded-lg w-64 focus:ring-2 focus:ring-indigo-200"
        >
          <option value="">All Products</option>
          {allProducts.map((product) => (
            <option key={product} value={product}>
              {product}
            </option>
          ))}
        </select>

        {/* Agent dropdown */}
        <select
          value={selectedAgent}
          onChange={(e) => setSelectedAgent(e.target.value)}
          className="border px-3 py-2 rounded-lg w-48 focus:ring-2 focus:ring-indigo-200"
        >
          <option value="">All Agents</option>
          {allAgents.map((agent) => (
            <option key={agent} value={agent}>
              {agent}
            </option>
          ))}
        </select>
      </div>

      {/* Tickets List */}
      <div
        ref={containerRef}
        className="flex-1 overflow-auto border border-gray-200 rounded-lg bg-white"
      >
        {visibleTickets.map((t) => (
          <div
            key={t.id}
            className="flex justify-between items-center px-4 py-3 border-b border-gray-100 hover:bg-gray-50 cursor-pointer"
          >
            <div onClick={() => onSelectTicket(t)} className="flex flex-col">
              <span className="font-semibold">
                #{t.id} - {t.subject}
              </span>
              <span className="text-gray-500 text-sm">{t.reason}</span>
              <span className="text-gray-500 text-sm">
                {t.requester} | Agent: {t.agent} | Product: {t.product}
              </span>
            </div>
            <button
              onClick={() => handleRemove(t.id)}
              className="text-red-600 font-bold hover:text-red-800 ml-4"
            >
              Remove
            </button>
          </div>
        ))}

        <div ref={loadMoreRef} className="p-4 text-center text-gray-500">
          {visibleTickets.length < filteredTickets.length
            ? "Scroll to load more..."
            : visibleTickets.length === 0
            ? "No tickets found."
            : "All tickets loaded."}
        </div>
      </div>
    </div>
  );
}
