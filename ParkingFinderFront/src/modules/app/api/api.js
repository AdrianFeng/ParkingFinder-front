
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

const BASE_URL = "http://ec2-54-210-213-91.compute-1.amazonaws.com:8888";
// const BASE_URL = "http://localhost:8888";
const HEADERS = {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  };

const inspectFBAccessToken = (accessToken, callback) => {

  fetch(
      `${BASE_URL}/auth/facebook?access_token=${accessToken}`,
      {method: "GET", headers: HEADERS}
  )
      .then(ApiUtils.checkStatus)
      .then(response => response.json())
      .then((responseJson) => {
        const user = responseJson.user;
        const accessToken = responseJson.access_token;
        callback({
          accessToken: {
              accessToken: accessToken.access_token,
              expiresAt: accessToken.expires_at,
              issuedAt: accessToken.issued_at,
              userId: accessToken.user_id
          },
          user: {
              userId: user.user_id,
              profilePictureUrl: user.profile_picture_url,
              firstName: user.first_name,
              lastName: user.last_name,
              activatedVehicle: user.activated_vehicle,
              ownedVehicles: user.owned_vehicles
          }
        })
      })
      .catch((error) => {
        callback({
          error: error.message
        })
      })
};

const registerVehicle = (
    userId,
    accessToken,
    vehicle,
    callback
) => {

    fetch(
        `${BASE_URL}/user/${userId}?access_token=${accessToken}`,
        {
            method: "POST",
            headers: HEADERS,
            body: JSON.stringify({
                new_vehicle: {
                    plate: vehicle.plate,
                    brand: vehicle.brand,
                    model: vehicle.model,
                    color: vehicle.color,
                    year: vehicle.year
                }
            })
        }
    )
        .then(ApiUtils.checkStatus)
        .then(() => {
            callback()
        })
        .catch((error) => {
            callback({
                error: error.message
            })
        })
};

export default { inspectFBAccessToken, registerVehicle }