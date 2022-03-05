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

export {fetchTravelerData, fetchTripData, fetchDestinationData}
