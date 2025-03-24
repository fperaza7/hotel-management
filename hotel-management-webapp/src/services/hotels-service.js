import hotelManagementApi from "../config/hotel-management-api";

export const fetchHotels = async () => {
  try {
    const response = await hotelManagementApi.get("/hotels");
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const saveHotel = async (hotelData) => {
  try {
    const response = await hotelManagementApi.post("/hotels", hotelData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteHotel = async (hotelId) => {
  try {
    await hotelManagementApi.delete(`/hotels/${hotelId}`);
  } catch (error) {
    throw error;
  }
};