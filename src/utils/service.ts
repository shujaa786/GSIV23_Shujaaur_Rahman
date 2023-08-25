import CONSTANTS from "utils/constants";

/**
 * Generate base URL including OMDB required params
 * @param {string} url
 * @returns {string}
 */
const getBaseURL = (url: string): string => {
  return `${url}?${new URLSearchParams({
    api_key: CONSTANTS.API_KEY,
  }).toString()}`;
};

/**
 * Service object exported to use across application
 */
const service = {
  get: async (url: string, params: object) => {
    try {
      let response = await fetch(
        `${getBaseURL(url)}&${new URLSearchParams({
          ...params,
        }).toString()}`,
        {
          method: "GET",
          cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
          headers: {
            "Content-Type": "application/json", // application/x-www-form-urlencoded, application/json
          },
        }
      );

      if(response.status === 200){
        return await response.json()
      }else{
        throw Error("Error")
      }
    } catch (err) {
      throw Error();
    }
  },
  post: async (url: string, data: object) => {
    const response = await fetch(getBaseURL(url), {
      method: "POST",
      cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
      headers: {
        "Content-Type": "application/x-www-form-urlencoded", // application/x-www-form-urlencoded, application/json
      },
      body: JSON.stringify(data),
    });
    return response.json(); // parses JSON response into native JavaScript objects
  },
};

export default service;
