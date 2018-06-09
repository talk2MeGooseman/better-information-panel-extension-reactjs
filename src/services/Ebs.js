import axios from "axios";

const EBS_ROOT_URL = 'https://us-central1-info-extension.cloudfunctions.net';
// const EBS_ROOT_URL = 'https://localhost:8080/info-extension/us-central1';

/**
 * getBoardcasterGithubInfo
 * 
 * Fetch user Github panel configuration
 * 
 * @param {Object} auth 
 */
export const getPanelInformation = async (token) => {
  let response = await axios({
    method: 'GET',
    url: `${EBS_ROOT_URL}/get_panel_information`,
    headers: {
      'Content-Type': 'application/json',
      'x-extension-jwt': token,
    }
  });

  return response.data;
};

/**
 * setBroadcasterGithubInfo 
 *
 * Set the users Github login information and fetch it
 *  
 * @param {Object} data - github user login info
 * @param {token} token
 */
export const setPanelInformation = async (token, tabs) => {
  let response;
  try {
    response = await axios({
      method: 'POST',
      url: `${EBS_ROOT_URL}/set_panel_information`,
      data: {
        tabs
      },
      headers: {
        'Content-Type': 'application/json',
        'x-extension-jwt': token,
      }
    });
  } catch (error) {
    throw Error(error);
  }

  return response.data;
};
