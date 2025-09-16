import { FiLogOut, FiChevronRight } from "react-icons/fi";

export default function Sidebar({ onSelect, onLogout }) {
  return (
    <div className="w-64 bg-white border-r border-gray-200 flex flex-col p-4">
      <h2 className="text-lg font-semibold mb-4 border-b border-gray-200 pb-2">ERP Panel</h2>

      <nav className="flex-1 space-y-2">
        <button
          onClick={() => onSelect("tickets")}
          className="w-full flex justify-between items-center px-3 py-2 rounded hover:bg-gray-100"
        >
          Zendesk Tickets <FiChevronRight className="text-black" />
        </button>
        <button
          onClick={() => onSelect("products")}
          className="w-full flex justify-between items-center px-3 py-2 rounded hover:bg-gray-100"
        >
          Products <FiChevronRight className="text-black" />
        </button>
        <button
          onClick={() => onSelect("orders")}
          className="w-full flex justify-between items-center px-3 py-2 rounded hover:bg-gray-100"
        >
          Orders <FiChevronRight className="text-black" />
        </button>
      </nav>

      <button
        onClick={onLogout}
        className="mt-auto w-full flex justify-between items-center px-3 py-2 rounded bg-red-100 text-red-600 hover:bg-red-200"
      >
        Logout <FiLogOut />
      </button>
    </div>
  );
}
