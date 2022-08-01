import axios from "axios";

const EBS_ROOT_URL = 'https://guzman.codes/legacy/bip';
// const EBS_ROOT_URL = 'http://localhost:4000/legacy/bip';

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
    url: `${EBS_ROOT_URL}/get-panel-information`,
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
export const setPanelInformation = async (token, data) => {
  let response;
  try {
    response = await axios({
      method: 'POST',
      url: `${EBS_ROOT_URL}/set_panel_information`,
      data: data,
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
