import { API_URL } from "../main.js";

export const getData = async () => {
    try {
      const response = await fetch(`${API_URL}/products`);
  
      if (!response.ok) {
        throw new Error(`Response error fetch pizza data`);
      }
  
      return await response.json();
    } catch (error) {
      console.log(`Error fetching pizza data ${error}`);
    }
  };