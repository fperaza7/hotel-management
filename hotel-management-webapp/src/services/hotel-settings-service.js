import hotelManagementApi from "../config/hotel-management-api";

export const fetchHotelData = async (hotelId) => {
  try {
    const response = await hotelManagementApi.get(`/hotels/${hotelId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const fetchRoomTypes = async () => {
  try {
    const response = await hotelManagementApi.get("/room-types");
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const fetchAccommodationTypes = async () => {
  try {
    const response = await hotelManagementApi.get("/accommodation-types");
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateHotelData = async (hotelId, hotelData) => {
  try {
    await hotelManagementApi.put(`/hotels/${hotelId}`, hotelData);
  } catch (error) {
    throw error;
  }
};

export const addAllocation = async (hotelId, newConfig) => {
  try {
    await hotelManagementApi.post(`/hotels/${hotelId}/settings/allocations`, newConfig);
  } catch (error) {
    throw error;
  }
};

export const deleteAllocation = async (hotelId, allocationId) => {
  try {
    await hotelManagementApi.delete(`/hotels/${hotelId}/settings/allocations/${allocationId}`);
  } catch (error) {
    throw error;
  }
};