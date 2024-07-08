const rootAPI = "https://united-wavelet-422322-m7.uc.r.appspot.com/";

// Function to call API
const callAPI = async (url, method, body = null) => {
  try {
    const options = {
      method: method,
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    };

    if (body) {
      options.body = JSON.stringify(body);
    }

    const response = await fetch(url, options);

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    return data; // Return data instead of using setAPIResponse which is undefined
  } catch (error) {
    console.error(`Error accessing API: ${error}`);
    throw error; // Re-throw error to handle it outside this function if needed
  }
};

// Function to build URL
const buildURL = (root, path) => {
  if (!root.endsWith("/")) {
    root += "/";
  }
  if (path.startsWith("/")) {
    path = path.substring(1);
  }
  return root + path;
};

// Configuration of APIs with names and paths
const apis = (rootAPI) => ({
  welcome: buildURL(rootAPI, ""),
  showParties: buildURL(rootAPI, "parliament/parties"),
  showLLM: buildURL(
    rootAPI,
    `user/responses?queryID=c20ea61e-9d48-5699-ad83-9f402017180a&typeDocument=questions`
  ),
  showMP: buildURL(rootAPI, `MEPs/mep_info?mepID=237224`),
  showPrompts: buildURL(rootAPI, "admin/prompts"),
  showQueries: buildURL(rootAPI, "admin/queries"),
});

export { callAPI, buildURL, apis, rootAPI };
