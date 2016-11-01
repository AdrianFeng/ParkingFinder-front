
var ApiUtils = {
  checkStatus: function(response) {
    if (response.status >= 200 && response.status < 300) {
      return response;
    } else {
      let error = new Error(response.error);
      error.response = response;
      error.statusCode = response.status;
      throw error;
    }
  }
};

const BASE_URL = "http://localhost:8888";
const inspectFBAccessToken = (accessToken, callback) => {

  fetch(`${BASE_URL}/auth/facebook?access_token=${accessToken}`)
      .then(ApiUtils.checkStatus)
      .then(response => response.json())
      .then((responseJson) => {
        callback({
          accessToken: responseJson.access_token,
          user: responseJson.user
        })
      })
      .catch((error) => {
        callback({
          error: error.message
        })
      })
};

export default inspectFBAccessToken