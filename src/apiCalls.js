// import domUpdates from "./domUpdates";

//FETCH calls


const fetchTravelerData = () => {
  return fetch("http://localhost:3001/api/v1/travelers")
    .then((response) => response.json())
    .catch((error) => {
      console.log(error);
      domUpdates.showError(
        "Sorry, we were unable to retrieve your data. Please contact @nikseif to file a complaint"
      );
    });
};

const fetchTripData = () => {
  return fetch("http://localhost:3001/api/v1/trips")
    .then((response) => response.json())
    .catch((error) => {
      console.log(error);
      domUpdates.showError(
        "Sorry, we were unable to retrieve your data. Please contact @sertmer to file a complaint"
      );
    });
};

const fetchDestinationData = () => {
  return fetch("http://localhost:3001/api/v1/destinations")
    .then((response) => response.json())
    .catch((error) => {
      console.log(error);
      domUpdates.showError(
        "Sorry, we were unable to retrieve your data. Please contact @sertmer to file a complaint"
      );
    });
};


// ~~~~~~~ POST ~~~~~~~

const postNewTrip = (trip) => {
  return fetch("http://localhost:3001/api/v1/trips",
  {
    method: "POST",
    body: JSON.stringify(trip),
    headers: { "Content-Type": "application/json" },
  })
  .then(response => {response.json()})
};


const postNewDestination = (destination) => {
  return fetch("http://localhost:3001/api/v1/destinations"	, {
    method: "POST",
    body: JSON.stringify(destination),
    headers: { "Content-Type": "application/json" },
  })
  .then(response => {response.json()})
  };


export {fetchTravelerData, fetchTripData, fetchDestinationData, postNewTrip, postNewDestination}
