export default function TicketDetail({ ticket, onBack }) {
  if (!ticket) return null;

  const messages = [
    { from: "Customer", text: "I have an issue with my order.", attachment: null },
    { from: "Agent", text: "We are checking this for you.", attachment: "invoice.pdf" },
  ];

  return (
    <div className="p-6">
      <button
        onClick={onBack}
        className="mb-4 text-sm text-blue-600 hover:underline"
      >
        ← Back to Tickets
      </button>

      <h3 className="text-xl font-semibold mb-4">
        Ticket #{ticket.id} - {ticket.requester}
      </h3>

      <div className="space-y-3">
        {messages.map((m, idx) => (
          <div
            key={idx}
            className={`p-3 rounded border ${
              m.from === "Agent" ? "bg-blue-50" : "bg-gray-50"
            }`}
          >
            <p className="text-sm font-semibold">{m.from}</p>
            <p className="text-sm">{m.text}</p>
            {m.attachment && (
              <a href="#" className="text-xs text-blue-600 underline">
                {m.attachment}
              </a>
            )}
          </div>
        ))}
      </div>

      <div className="mt-6">
        <textarea
          placeholder="Write a reply..."
          className="w-full border rounded-lg p-2"
        />
        <button className="mt-2 px-4 py-2 bg-gray-900 text-white rounded-lg">
          Send Reply
        </button>
      </div>
    </div>
  );
}
