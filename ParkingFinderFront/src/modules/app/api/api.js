
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
        `${BASE_URL}/user/${userId}`,
        {
            method: "POST",
            headers: HEADERS,
            body: JSON.stringify({
                access_token: accessToken,
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
            callback({})
        })
        .catch((error) => {
            callback({
                error: error.message
            })
        })
};

const activeVehicle = (
    userId,
    accessToken,
    plate,
    callback
) => {

    fetch(
        `${BASE_URL}/user/${userId}`,
        {
            method: "POST",
            headers: HEADERS,
            body: JSON.stringify({
                access_token: accessToken,
                activated_vehicle: plate
            })
        }
    )
        .then(ApiUtils.checkStatus)
        .then(() => {
            callback({})
        })
        .catch((error) => {
            callback({
                error: error.message
            })
        })
};

const fetchAvailableParkingSpaces = (
    userId,
    accessToken,
    location,
    callback
) => {
    console.log('fetchAvailableParkingSpace not implement');
    fetch(
        `${BASE_URL}/parkingSpace/fetchnearby/${userId}?latitude=${location.lat}&longitude=${location.lng}&access_token=${accessToken}`,
        {
            headers: HEADERS,
        }
    )
        .then(ApiUtils.checkStatus)
        .then(response  => response.json())
        .then(responseJson => {
            if (responseJson) {
                const availableParkingSpaces = responseJson.available_parking_spaces;
                const res = availableParkingSpaces.map((parkingSpace) => {
                        return {
                            'longitude': parkingSpace.longitude,
                            'latitude': parkingSpace.latitude,
                        }
                    }
                );
                return callback({
                    availableParkingSpaces: res
                });
            }
            else {
                return callback({
                    availableParkingSpaces: []
                })
            }
        })
        .catch((error) =>
            callback({error: error})
        );
};

const requestParkingSpaces = (
    userId,
    accessToken,
    location,
    callback
) => {
    fetch(
        `${BASE_URL}/parkingSpace/request/${userId}`,
        {
            method: "PUT",
            headers: HEADERS,
            body: JSON.stringify({
                access_token: accessToken,
                latitude: location.lat,
                longitude: location.lng
            })
        }
    )
        .then(ApiUtils.checkStatus)
        .then(response  => response.json())
        .then(responseJson => {
            const available_parking_spaces = responseJson['available_parking_spaces'];
            const res = available_parking_spaces.map((space) => {
                if (space.address) {
                    space['address'] = space.address.split(',')[0];
                }
                return space
            });
            return callback({
                availableParkingSpaces: res
            })
        })
        .catch((error) =>
            callback({error: error})
        )
};

const reserveParkingSpace = (
    userId,
    accessToken,
    plate,
    callback
) => {
    fetch(
        `${BASE_URL}/parkingSpace/reserve/${userId}`,
        {
            method: "POST",
            headers: HEADERS,
            body: JSON.stringify({
                access_token: accessToken,
                plate: plate
            })
        }
    )
        .then(ApiUtils.checkStatus)
        .then(response  => response.json())
        .then(responseJson => {
            const parkingSpace = responseJson['parking_space'];
            const vehicle = responseJson['vehicle'];
            return callback({
                reservation: {
                    parkingSpace,
                    vehicle
                }
            });
        })
        .catch((error) =>
            callback({error: error})
        );};

const checkin = (
    userId,
    accessToken,
    plate,
    location,
    callback
) => {
    console.log('checkin not implement');
    fetch(
        `${BASE_URL}/parkingSpace/checkin/${userId}`,
        {
            method: "PUT"
            ,
            headers: HEADERS,
            body: JSON.stringify({
                access_token: accessToken,
                plate: plate,
                longitude: location.lng,
                latitude: location.lat,
            })
        }
    )
        .then(ApiUtils.checkStatus)
        .then(response  => response.json())
        .then(responseJson => {
            const parkingSpace = responseJson.parking_space;
            return callback({
                parkingSpace
            });
        })
        .catch((error) =>
            callback({error: error})
        );
};

const checkout = (
    userId,
    accessToken,
    plate,
    callback
) => {
    console.log('checkout not implement');
    fetch(
        `${BASE_URL}/parkingSpace/checkout/${userId}`,
        {
            method: "POST"
            ,
            headers: HEADERS,
            body: JSON.stringify({
                access_token: accessToken,
                plate: plate,
            })
        }
    )
        .then(ApiUtils.checkStatus)
        .then(() => callback({}))
        .catch((error) =>
            callback({error: error})
        );
};

const postParkingSpace = (
    userId,
    accessToken,
    plate,
    callback
) => {
    console.log('post parking space not implement');
    fetch(
        `${BASE_URL}/parkingSpace/post/${userId}`,
        {
            method: "PUT"
            ,
            headers: HEADERS,
            body: JSON.stringify({
                access_token: accessToken,
                plate: plate,
            })
        }
    )
        .then(ApiUtils.checkStatus)
        .then(response  => response.json())
        .then(responseJson => {
            const parkingSpace = responseJson['parking_space'];
            callback({
                plate,
                parkingSpace
            })
        })
        .catch((error) =>
            callback({error: error})
        );
};


export default {
    fetchAvailableParkingSpaces,
    inspectFBAccessToken,
    registerVehicle,
    requestParkingSpaces,
    reserveParkingSpace,
    checkin,
    checkout,
    postParkingSpace,
    activeVehicle,
}