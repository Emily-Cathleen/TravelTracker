const domUpdates = {

  displayFetchErrorHandling(message, selector) {
    let error = document.querySelector(selector);
    error.classList.remove('hidden');
    error.innerText = message;
  }

}


export default domUpdates;
