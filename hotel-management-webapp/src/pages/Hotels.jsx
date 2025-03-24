import React, { useState, useEffect } from "react";
import { fetchHotels, saveHotel } from "../services/hotels-service";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Hotels() {
  const [hotels, setHotels] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [hotelData, setHotelData] = useState({
    id: null,
    name: "",
    nit: "",
    city: "",
    address: "",
    max_rooms: ""
  });

  const navigate = useNavigate();

  useEffect(() => {
    handleFetchHotels();
  }, []);

  const handleFetchHotels = async () => {
    try {
      const hotelsData = await fetchHotels();
      setHotels(hotelsData);
    } catch (error) {
      console.error("Error fetching hotels:", error);
    }
  };

  const handleOpenModal = () => {
    setHotelData({
      id: null,
      name: "",
      nit: "",
      city: "",
      address: "",
      max_rooms: ""
    });
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleSaveHotel = async () => {
    try {
      await saveHotel(hotelData);
      handleFetchHotels();
      handleCloseModal();
      toast.success("Hotel guardado exitosamente.");
    } catch (error) {
      console.error("Error saving hotel:", error);
      const { message, errors } = error.response?.data || {};
      let errorMessage = message ? message : "Hubo un problema al agregar el hotel.";
      if (errors) {
        Object.values(errors)
          .flat()
          .forEach((errMsg) => toast.error(errMsg));
      } else {
        toast.error(errorMessage);
      }
    }
  };

  const handleGoToHotelSettings = (hotelId) => {
    navigate(`/hotels/${hotelId}/settings`);
  };

  return (
    <>
      <ToastContainer
        position="top-right"
        hideProgressBar={true}
      />
      <div className="p-6">
        <h1 className="text-3xl font-extrabold text-center text-gray-800 mb-6">Gestión de Hoteles</h1>
        <button
          onClick={handleOpenModal}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg mb-6 font-semibold hover:bg-blue-700 transition-all flex items-center">
          Agregar Hotel
        </button>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {hotels.map((hotel) => (
            <div
              key={hotel.id}
              onClick={() => handleGoToHotelSettings(hotel.id)}
              className="bg-white rounded-lg shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 cursor-pointer group">
              <img
                src={`https://picsum.photos/300/200?random=${hotel.id}`}
                alt={`Hotel ${hotel.name}`}
                className="w-full h-40 object-cover rounded-t-lg"
              />
              <div className="p-4">
                <h2 className="text-lg font-bold text-gray-900 group-hover:text-blue-600">{hotel.name}</h2>
                <p className="text-sm text-gray-500">Nit: {hotel.nit}</p>
                <p className="text-sm text-gray-500">Ciudad: {hotel.city}</p>
                <p className="text-sm text-gray-500">Dirección: {hotel.address}</p>
                <p className="text-sm text-gray-500">Máx. Habitaciones: {hotel.max_rooms}</p>
              </div>
            </div>
          ))}
        </div>

        {isModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white w-[90%] max-w-lg p-6 rounded-lg shadow-lg border border-gray-200">
              <h2 className="text-xl font-bold mb-4 text-gray-800">Agregar Hotel</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-gray-600 font-semibold mb-1">Nombre</label>
                  <input
                    type="text"
                    placeholder="Nombre"
                    className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
                    value={hotelData.name}
                    onChange={(e) => setHotelData({ ...hotelData, name: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-gray-600 font-semibold mb-1">Nit</label>
                  <input
                    type="text"
                    placeholder="Nit"
                    className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
                    value={hotelData.nit}
                    onChange={(e) => setHotelData({ ...hotelData, nit: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-gray-600 font-semibold mb-1">Ciudad</label>
                  <input
                    type="text"
                    placeholder="Ciudad"
                    className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
                    value={hotelData.city}
                    onChange={(e) => setHotelData({ ...hotelData, city: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-gray-600 font-semibold mb-1">Dirección</label>
                  <input
                    type="text"
                    placeholder="Dirección"
                    className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
                    value={hotelData.address}
                    onChange={(e) => setHotelData({ ...hotelData, address: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-gray-600 font-semibold mb-1">Máx. Habitaciones</label>
                  <input
                    type="number"
                    placeholder="Máx. Habitaciones"
                    className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
                    value={hotelData.max_rooms}
                    onChange={(e) => setHotelData({ ...hotelData, max_rooms: e.target.value })}
                  />
                </div>
                <button
                  onClick={handleSaveHotel}
                  className="w-full bg-blue-600 text-white p-3 rounded-lg font-semibold hover:bg-blue-700 transition-all">
                  Guardar
                </button>
                <button
                  onClick={handleCloseModal}
                  className="w-full bg-gray-500 text-white p-3 rounded-lg font-semibold hover:bg-gray-600 transition-all">
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

export default Hotels;
