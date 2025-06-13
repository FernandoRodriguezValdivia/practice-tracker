import { useState, useTransition } from "react";
import { fetchShipmentById, type Shipment } from "./api/mockApi";
import { ShipmentCard } from "./components/ShipmentCard";

export default function App() {
  const [query, setQuery] = useState("");
  const [shipment, setShipment] = useState<Shipment | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleSearch = () => {
    setShipment(null);
    setError(null);
    setIsLoading(true);
      fetchShipmentById(query)
        .then((res) => {
          // startTransition(() => {
            setShipment(res); // Esto sí causa un render diferido
          // });
        })
        .catch((err) => setError(err.message))
        .finally(() => {
          setIsLoading(false);
        });
  };

  console.log(isPending);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-lg mx-auto bg-white shadow rounded-xl p-6">
        <h1 className="text-2xl font-bold mb-4 text-center text-blue-600">🌊 Rastreador de Pedidos Marítimos</h1>
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Ej: ABC123"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-1 border rounded px-4 py-2"
          />
          <button onClick={handleSearch} className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
            Buscar
          </button>
        </div>

        {isPending && <p className="text-center mt-4 text-gray-500">Cargando...</p>}
        {error && <p className="text-red-600 mt-4 text-center">{error}</p>}
      </div>

      {shipment && <ShipmentCard shipment={shipment} />}
      {shipment && (
        <div className="grid grid-cols-1 gap-2">
          {Array.from({ length: 5000 }).map((_, i) => (
            <p key={i}>{shipment.status}</p>
          ))}
        </div>
      )}
      {isLoading && <p className="text-center mt-4 text-gray-500">Cargando...</p>}
    </div>
  );
}
