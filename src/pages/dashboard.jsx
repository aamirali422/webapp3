import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import TicketsList from "../components/TicketsList";
import TicketDetail from "../components/TicketDetail";
import ProductsList from "../components/ProductsList";
import OrdersTable from "../components/OrdersTable";

export default function Dashboard() {
  const [view, setView] = useState("tickets");
  const [selectedTicket, setSelectedTicket] = useState(null);

  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear any auth tokens if needed here
    navigate("/login"); // Redirect to login page
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar onSelect={setView} onLogout={handleLogout} />

      <main className="flex-1 overflow-y-auto p-6">
        {view === "tickets" && !selectedTicket && (
          <div className="bg-white rounded-lg shadow-md">
            <TicketsList onSelectTicket={setSelectedTicket} />
          </div>
        )}

        {view === "tickets" && selectedTicket && (
          <TicketDetail
            ticket={selectedTicket}
            onBack={() => setSelectedTicket(null)}
          />
        )}

        {view === "products" && (
          <div className="bg-white rounded-lg shadow-md p-4">
            <ProductsList />
          </div>
        )}

        {view === "orders" && (
          <div className="bg-white rounded-lg shadow-md p-4">
            <OrdersTable />
          </div>
        )}
      </main>
    </div>
  );
}
