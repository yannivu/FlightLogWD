import Parse from "../services/parseService";

/**
 * Fetch all flights from Parse server.
 * @returns {Promise<Array>} List of fetched flights.
 */
export const fetchAllFlights = async () => {
  try {
    const query = new Parse.Query("Flight");
    query.include("airline");
    const results = await query.find();

    // Map Parse objects to plain JavaScript objects
    return results.map(item => ({
      id: item.id,
      passengerName: item.get("passengerName"),
      departureAirportCode: item.get("departureAirportCode"),
      arrivalAirportCode: item.get("arrivalAirportCode"),
      flightNumber: item.get("flightNumber"),
      airline: item.get("airline").get("name")
    }));
  } catch (error) {
    console.error("Error fetching flights:", error);
    throw error;
  }
};

/**
 * Add a new flight to Parse server.
 * @param {Object} flightData - Data of the flight to add.
 * @returns {Promise<Object>} The added flight data.
 */
export const addNewFlight = async (flightData) => {
  try {
    const Flight = Parse.Object.extend("Flight");
    const flight = new Flight();

    flight.set("passengerName", flightData.passengerName);
    flight.set("departureAirportCode", flightData.departureAirportCode);
    flight.set("arrivalAirportCode", flightData.arrivalAirportCode);
    flight.set("flightNumber", flightData.flightNumber);

    // Set the 'airline' pointer
    const Airline = Parse.Object.extend("Airline");
    const airline = new Airline();
    airline.id = flightData.airlineId;
    flight.set("airline", airline);

    const savedFlight = await flight.save();
    
    return {
      id: savedFlight.id,
      passengerName: savedFlight.get("passengerName"),
      departureAirportCode: savedFlight.get("departureAirportCode"),
      arrivalAirportCode: savedFlight.get("arrivalAirportCode"),
      flightNumber: savedFlight.get("flightNumber"),
      airline: savedFlight.get("airline").get("name")
    };
  } catch (error) {
    console.error("Error adding flight:", error);
    throw error;
  }
};
