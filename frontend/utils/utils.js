/**
 * Fetches data from a URL and handles HTTP errors, optionally appending query parameters.
 * @param {string} url The URL to fetch data from.
 * @param {Object} [params] Optional query parameters as an object.
 * @returns {Promise<any>} A promise that resolves with the fetched data or rejects with an error.
 */
async function getData(url, params = {}) {
  try {
    const urlObj = new URL(url);
    const searchParams = new URLSearchParams(params);
    urlObj.search = searchParams.toString();

    const response = await fetch(urlObj.href);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    console.log("Data fetched successfully:", data);
    return data;
  } catch (error) {
    console.error("Failed to fetch data:", error.message);
    showToast(`Error: ${error.message}`); // Use the toast function to display the error
    throw error; // Optionally rethrow the error if you want further error handling
  }
}

/**
 * Sends data to a URL using POST method and handles HTTP errors.
 * @param {string} url The URL to send data to.
 * @param {Object} data The data object to send.
 * @param {Object} [headers] Optional headers to include in the request.
 * @returns {Promise<any>} A promise that resolves with the response data or rejects with an error.
 */
async function postData(url, data, headers = {'Content-Type': 'application/json'}) {
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(data)
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      const responseData = await response.json();
      console.log("Data posted successfully:", responseData);
      return responseData;
    } catch (error) {
      console.error("Failed to post data:", error.message);
      showToast(`Error: ${error.message}`); // Use the toast function to display the error
      throw error; // Optionally rethrow the error if you want further error handling
    }
  }

/**
 * Applies multiple attributes to a given element.
 * @param {HTMLElement} element - The DOM element to modify.
 * @param {Object} attributes - An object containing attribute key-value pairs.
 */
export function applyAttributes(element, attributes) {
  for (const key in attributes) {
    if (attributes.hasOwnProperty(key)) {
      element.setAttribute(key, attributes[key]);
    }
  }
}

// Utility function to create a regex validator
export const regexValidator = (regex, message) => {
  return (value) => {
    return !regex.test(value) ? message : null;
  };
};
