import Parse from "../services/parseService";

/**
 * Fetch all airlines from Parse server.
 * @returns {Promise<Array>} List of fetched airlines.
 */
export const fetchAllAirlines = async () => {
    try {
      const query = new Parse.Query("Airline");
      const results = await query.find();
      
      return results.map(item => ({
        id: item.id,
        name: item.get("name")
      }));
    } catch (error) {
      console.error("Error fetching airlines:", error);
      throw error;
    }
  };