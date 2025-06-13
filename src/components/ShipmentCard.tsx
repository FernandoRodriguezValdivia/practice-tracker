import type { Shipment } from "../api/mockApi";


export const ShipmentCard = ( { shipment } : { shipment: Shipment }) => {
  return(
    <div className="bg-white shadow rounded-xl p-6 mt-6 max-w-lg mx-auto">
      <h3 className="text-xl font-bold mb-2">📦 Estado del Pedido</h3>
      <p><span className="font-semibold">Estado:</span> {shipment.status}</p>
      <p><span className="font-semibold">Ubicación:</span> {shipment.location}</p>
      <p><span className="font-semibold">ETA:</span> {shipment.eta}</p>
      <h4 className="mt-4 font-semibold">🕒 Historial</h4>
      <ul className="list-disc list-inside text-sm mt-2">
        {shipment.history.map((item, i) => (
          <li key={i}>{item.date} — {item.status}</li>
        ))}
      </ul>
    </div>
  )
}