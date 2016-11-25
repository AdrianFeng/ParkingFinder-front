
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
            callback()
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
            callback()
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
    const payload = {
        availableParkingSpaces: [
            {
                'longitude': location['lat'] + 0.00004,
                'latitude': location['lng'] + 0.00004,
            },
            {
                'longitude': location['lat'] - 0.00004,
                'latitude': location['lng'] - 0.00004,
            },
            {
                'longitude': location['lat'] - 0.00004,
                'latitude': location['lng'] + 0.00004,
            },
            {
                'longitude': location['lat'] + 0.00004,
                'latitude': location['lng'] - 0.00004,
            }
        ]
    };
    return callback(payload)
};

const requestParkingSpaces = (
    userId,
    accessToken,
    location,
    callback
) => {
    console.log('requestParkingSpace not implement');
    location = {'lat': 50.11112, 'lng': 40.1112};
    const payload = {
        availableParkingSpaces: [
            {
                plate: '1111111',
                longitude: location['lat'] + 0.00004,
                latitude: location['lng'] + 0.00004,
                address: '10980 Wellworth ave',
                distance: '100 ft'
            },
            {
                plate: '2222222',
                longitude: location['lat'] - 0.00004,
                latitude: location['lng'] - 0.00004,
                address: '10981 Whilshire Blvd',
                distance: '122 ft'
            },
            {
                plate: '3333333',
                longitude: location['lat'] - 0.00004,
                latitude: location['lng'] + 0.00004,
                address: '10982 Westwood Plaza',
                distance: '1 mile'
            },
            {
                plate: '4444444',
                longitude: location['lat'] + 0.00004,
                latitude: location['lng'] - 0.00004,
                address: '103 Ohio Ave',
                distance: '1.5 mile',
            }
        ]
    };
    return callback(payload);

};

const reserveParkingSpace = (
    userId,
    accessToken,
    plate,
    callback
) => {
    console.log('reserveParkingSpace not implement');
    const payload = {
        reservation: {
            parkingSpace: {
                "plate": "1234567",
                "latitude": 54.123,
                "longitude": 54.123,
                "address": 'ucla parking lot 7'

            },
            vehicle: {
                "plate": "1234567",
                "model": "civic",
                "brand": "honda",
                "color": "white",
                "year": "year",
            }
        }
    };

    return callback(payload)
};

const checkin = (
    userId,
    accessToken,
    plate,
    location,
    callback
) => {
    console.log('checkin not implement');
    location = {'longitude': 43.123, 'latitude': 54.123};
    const payload = {
        "parkingSpace": {
            "plate": "123456",
            "longitude": location['longitude'],
            "latitude": location['latitude'],
            "address": "ucla parking lot 7"
        }
    };
    return callback(payload);
};

const checkout = (
    userId,
    accessToken,
    plate,
    location,
    callback
) => {
    console.log('checkin not implement');
    const payload = {};
    return callback(payload);
};

const postParkingSpace = (
    userId,
    accessToken,
    plate,
    callback
) => {
    console.log('post parking space not implement');
    const payload = {
        "plate": "1111111",
        "parking_space": {
            "plate": "1234567",
            "latitude": 12.123,
            "longitude": 20.144,
            "address": "parking lot 7"
        }
    };
    return callback(payload);
};


export default {
    fetchAvailableParkingSpaces,
    inspectFBAccessToken,
    registerVehicle,
    requestParkingSpaces,
    reserveParkingSpace,
    checkin,
    checkout,
    postParkingSpace
}