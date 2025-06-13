// src/api/mockApi.ts
export const mockShipments = {
  "ABC123": {
    status: "En tránsito",
    location: "Océano Pacífico",
    eta: "2025-06-20",
    history: [
      { date: "2025-06-10", status: "Zarpó del puerto de Shanghái" },
      { date: "2025-06-12", status: "En medio del Pacífico" },
    ],
  },
  "XYZ789": {
    status: "Entregado",
    location: "Lima, Perú",
    eta: "2025-06-01",
    history: [
      { date: "2025-05-28", status: "Zarpó de Panamá" },
      { date: "2025-06-01", status: "Entregado en almacén" },
    ],
  },
};

export type Shipment = typeof mockShipments[keyof typeof mockShipments];

export function fetchShipmentById(id: string): Promise<Shipment> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const upperId = id.toUpperCase();
      if (upperId in mockShipments) {
        const shipment = mockShipments[upperId as keyof typeof mockShipments];
        resolve(shipment);
      } else {
        reject(new Error("Pedido no encontrado"));
      }
    }, 1000);
  });
}