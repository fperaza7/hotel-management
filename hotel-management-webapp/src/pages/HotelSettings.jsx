import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { fetchHotelData, fetchRoomTypes, fetchAccommodationTypes, updateHotelData, addAllocation, deleteAllocation } from "../services/hotel-settings-service";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function HotelSettings() {
  const { hotelId } = useParams();
  const [hotelData, setHotelData] = useState({
    name: "",
    nit: "",
    city: "",
    address: "",
    max_rooms: ""
  });
  const [allocations, setAllocations] = useState([]);
  const [isHotelCollapsibleOpen, setIsHotelCollapsibleOpen] = useState(true);
  const [isAllocationsCollapsibleOpen, setIsAllocationsCollapsibleOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newConfig, setNewConfig] = useState({
    room_type_id: "",
    accommodation_type_id: "",
    quantity: ""
  });
  const [roomTypes, setRoomTypes] = useState([]);
  const [accommodationTypes, setAccommodationTypes] = useState([]);

  useEffect(() => {
    handleFetchHotelData();
    handleFetchRoomTypes();
    handleFetchAccommodationTypes();
  }, []);

  const handleFetchHotelData = async () => {
    try {
      const data = await fetchHotelData(hotelId);
      setHotelData(data);
      setAllocations(data.room_allocations || []);
    } catch (error) {
      console.error("Error fetching hotel data:", error);
      toast.error("Hubo un problema al cargar los datos del hotel.");
    }
  };

  const handleFetchRoomTypes = async () => {
    try {
      const data = await fetchRoomTypes();
      setRoomTypes(data);
    } catch (error) {
      console.error("Error fetching room types:", error);
      toast.error("Hubo un problema al cargar los tipos de habitación.");
    }
  };

  const handleFetchAccommodationTypes = async () => {
    try {
      const data = await fetchAccommodationTypes();
      setAccommodationTypes(data);
    } catch (error) {
      console.error("Error fetching accommodation types:", error);
      toast.error("Hubo un problema al cargar los tipos de acomodación.");
    }
  };

  const handleEditHotel = async () => {
    try {
      await updateHotelData(hotelId, hotelData);
      toast.success("Datos del hotel actualizados exitosamente.");
      handleFetchHotelData();
    } catch (error) {
      console.error("Error updating hotel data:", error);
      const { message, errors } = error.response?.data || {};
      let errorMessage = message ? message : "Hubo un problema al actualizar los datos del hotel.";
      if (errors) {
        Object.values(errors)
          .flat()
          .forEach((errMsg) => toast.error(errMsg));
      } else {
        toast.error(errorMessage);
      }
    }
  };

  const handleAddAllocation = async () => {
    try {
      await addAllocation(hotelId, newConfig);
      handleFetchHotelData();
      handleCloseModal();
      setNewConfig({ room_type_id: "", accommodation_type_id: "", quantity: "" });
      toast.success("Asignación agregada exitosamente.");
    } catch (error) {
      console.error("Error adding allocation:", error);
      const { message, errors } = error.response?.data || {};
      let errorMessage = message ? message : "Hubo un problema al agregar la asignación.";
      if (errors) {
        Object.values(errors)
          .flat()
          .forEach((errMsg) => toast.error(errMsg));
      } else {
        toast.error(errorMessage);
      }
    }
  };

  const handleDeleteAllocation = async (id) => {
    try {
      await deleteAllocation(hotelId, id);
      toast.success("Asignación eliminada exitosamente.");
      handleFetchHotelData();
    } catch (error) {
      console.error("Error deleting allocation:", error);
      toast.error("Hubo un problema al eliminar la asignación.");
    }
  };

  const handleToggleHotelCollapsible = () => {
    setIsHotelCollapsibleOpen(!isHotelCollapsibleOpen);
  };

  const handleToggleAllocationsCollapsible = () => {
    setIsAllocationsCollapsibleOpen(!isAllocationsCollapsibleOpen);
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <ToastContainer
        position="top-right"
        hideProgressBar={true}
      />

      <div className="p-8 bg-gray-100 min-h-screen">
        <h1 className="text-3xl font-extrabold text-center text-gray-800 mb-8">Gestión de {hotelData.name}</h1>

        {/* Collapsible: Datos del Hotel */}
        <div className="bg-white rounded-lg shadow-md mb-6">
          <button
            onClick={handleToggleHotelCollapsible}
            className="w-full text-left p-4 bg-gray-800 text-white rounded-t-lg font-semibold focus:outline-none hover:bg-gray-900 transition-all">
            Datos del Hotel
          </button>
          {isHotelCollapsibleOpen && (
            <div className="p-6">
              <h3 className="text-xl font-bold text-gray-700 mb-4">Editar Datos del Hotel</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {" "}
                {/* Grilla dinámica */}
                <div>
                  <label className="block text-gray-600 font-semibold mb-1">Nombre</label>
                  <input
                    type="text"
                    className="w-full p-3 border rounded-md focus:ring-2 focus:ring-gray-500"
                    value={hotelData.name}
                    onChange={(e) => setHotelData({ ...hotelData, name: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-gray-600 font-semibold mb-1">NIT</label>
                  <input
                    type="text"
                    className="w-full p-3 border rounded-md focus:ring-2 focus:ring-gray-500"
                    value={hotelData.nit}
                    onChange={(e) => setHotelData({ ...hotelData, nit: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-gray-600 font-semibold mb-1">Ciudad</label>
                  <input
                    type="text"
                    className="w-full p-3 border rounded-md focus:ring-2 focus:ring-gray-500"
                    value={hotelData.city}
                    onChange={(e) => setHotelData({ ...hotelData, city: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-gray-600 font-semibold mb-1">Dirección</label>
                  <input
                    type="text"
                    className="w-full p-3 border rounded-md focus:ring-2 focus:ring-gray-500"
                    value={hotelData.address}
                    onChange={(e) => setHotelData({ ...hotelData, address: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-gray-600 font-semibold mb-1">Máx. Habitaciones</label>
                  <input
                    type="number"
                    className="w-full p-3 border rounded-md focus:ring-2 focus:ring-gray-500"
                    value={hotelData.max_rooms}
                    onChange={(e) => setHotelData({ ...hotelData, max_rooms: e.target.value })}
                  />
                </div>
              </div>
              <button
                onClick={handleEditHotel}
                className="mt-6 ml-auto bg-blue-600 text-white p-3 rounded-md font-semibold hover:bg-blue-700 transition-all">
                Guardar Cambios
              </button>
            </div>
          )}
        </div>

        {/* Collapsible: Asignaciones */}
        <div className="bg-white rounded-lg shadow-md mb-6">
          <button
            onClick={handleToggleAllocationsCollapsible}
            className="w-full text-left p-4 bg-gray-800 text-white rounded-t-lg font-semibold focus:outline-none hover:bg-gray-900 transition-all">
            Asignaciones de habitaciones
          </button>
          {isAllocationsCollapsibleOpen && (
            <div className="p-6">
              <h3 className="text-xl font-bold text-gray-700 mb-4">Asignaciones Actuales</h3>
              {allocations.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {allocations.map((config) => (
                    <div
                      key={config.id}
                      className="bg-gray-100 rounded-md shadow p-4 relative">
                      <p className="text-gray-600">Tipo de Habitación: {config.room_type.name}</p>
                      <p className="text-gray-600">Tipo de Acomodación: {config.accommodation_type.name}</p>
                      <p className="text-gray-600">Cantidad: {config.quantity}</p>
                      {/* Botón para eliminar */}
                      <button
                        onClick={() => handleDeleteAllocation(config.id)}
                        className="absolute bottom-2 right-2 bg-red-500 text-white px-4 py-2 rounded-md font-semibold hover:bg-red-600 transition-all focus:outline-none">
                        Borrar
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500">No hay configuraciones aún.</p>
              )}
              <button
                onClick={handleOpenModal}
                className="mt-4 bg-blue-600 text-white p-3 rounded-md font-semibold hover:bg-blue-700 transition-all">
                Agregar Nueva Asignación
              </button>
            </div>
          )}
        </div>

        {/* Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white w-[90%] max-w-lg p-6 rounded-lg shadow-xl">
              <h2 className="text-xl font-bold mb-4 text-center text-gray-700">Agregar Asignación</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-gray-600 font-semibold mb-1">Tipo de Habitación</label>
                  <select
                    className="w-full p-3 border rounded-md focus:ring-2 focus:ring-gray-500"
                    value={newConfig.room_type_id}
                    onChange={(e) => setNewConfig({ ...newConfig, room_type_id: e.target.value })}>
                    <option value="">Selecciona un tipo de habitación</option>
                    {roomTypes.map((type) => (
                      <option
                        key={type.id}
                        value={type.id}>
                        {type.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Select para tipos de acomodación */}
                <div>
                  <label className="block text-gray-600 font-semibold mb-1">Tipo de Acomodación</label>
                  <select
                    className="w-full p-3 border rounded-md focus:ring-2 focus:ring-gray-500"
                    value={newConfig.accommodation_type_id}
                    onChange={(e) => setNewConfig({ ...newConfig, accommodation_type_id: e.target.value })}>
                    <option value="">Selecciona un tipo de acomodación</option>
                    {accommodationTypes.map((type) => (
                      <option
                        key={type.id}
                        value={type.id}>
                        {type.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Input para cantidad */}
                <div>
                  <label className="block text-gray-600 font-semibold mb-1">Cantidad</label>
                  <input
                    type="number"
                    className="w-full p-3 border rounded-md focus:ring-2 focus:ring-gray-500"
                    value={newConfig.quantity}
                    onChange={(e) => setNewConfig({ ...newConfig, quantity: e.target.value })}
                  />
                </div>
                <button
                  onClick={handleAddAllocation}
                  className="w-full bg-blue-600 text-white p-3 rounded-md font-semibold hover:bg-blue-700 transition-all">
                  Guardar Asignación
                </button>

                <button
                  onClick={handleCloseModal}
                  className="w-full bg-gray-500 text-white p-3 rounded-md font-semibold hover:bg-gray-600 transition-all">
                  Cancelar
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default HotelSettings;
