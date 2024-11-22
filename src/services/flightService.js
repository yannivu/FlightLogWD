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
      departureDate: item.get("departureDate"),
      arrivalDate: item.get("arrivalDate"),
      airline: item.get("airline").get("name")
    }));
  } catch (error) {
    console.error("Error fetching flights:", error);
    throw error;
  }
};

/**
 * Add a new flight to Parse server and associate it with the current user.
 * @param {Object} flightData - Data of the flight to add.
 * @param {Object} currentUser - The current Parse User object.
 * @returns {Promise<Object>} The added flight data.
 */
export const addNewFlight = async (flightData, currentUser) => {
  try {
    const Flight = Parse.Object.extend("Flight");
    const flight = new Flight();

    // Convert string datetime to Parse.Date objects
    const departureDate = new Date(flightData.departureDate);
    const arrivalDate = new Date(flightData.arrivalDate);

    flight.set("passengerName", flightData.passengerName);
    flight.set("departureAirportCode", flightData.departureAirportCode);
    flight.set("arrivalAirportCode", flightData.arrivalAirportCode);
    flight.set("flightNumber", flightData.flightNumber);
    flight.set("departureDate", departureDate);
    flight.set("arrivalDate", arrivalDate);

    // Set the 'airline' pointer
    const Airline = Parse.Object.extend("Airline");
    const airline = new Airline();
    airline.id = flightData.airlineId;
    flight.set("airline", airline);

    // Associate the flight with the current user
    flight.set("user", currentUser);

    const savedFlight = await flight.save();
    
    return {
      id: savedFlight.id,
      passengerName: savedFlight.get("passengerName"),
      departureAirportCode: savedFlight.get("departureAirportCode"),
      arrivalAirportCode: savedFlight.get("arrivalAirportCode"),
      flightNumber: savedFlight.get("flightNumber"),
      departureDate: savedFlight.get("departureDate"),
      arrivalDate: savedFlight.get("arrivalDate"),
      airline: savedFlight.get("airline").get("name"),
      user: savedFlight.get("user"), // User who added the flight
    };
  } catch (error) {
    console.error("Error adding flight:", error);
    throw error;
  }
};

/**
 * Fetch flights associated with the current user from Parse server.
 * @param {Object} currentUser - The current Parse User object.
 * @returns {Promise<Array>} List of fetched flights.
 */
export const fetchUserFlights = async (currentUser) => {
  try {
    const query = new Parse.Query("Flight");
    query.equalTo("user", currentUser); // Filter by current user
    query.include("airline");
    const results = await query.find();

    // Map Parse objects to plain JavaScript objects
    return results.map(item => ({
      id: item.id,
      passengerName: item.get("passengerName"),
      departureAirportCode: item.get("departureAirportCode"),
      arrivalAirportCode: item.get("arrivalAirportCode"),
      flightNumber: item.get("flightNumber"),
      departureDate: item.get("departureDate"),
      arrivalDate: item.get("arrivalDate"),
      airline: item.get("airline").get("name"),
    }));
  } catch (error) {
    console.error("Error fetching user flights:", error);
    throw error;
  }
};