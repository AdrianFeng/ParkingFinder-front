import {
    TOGGLE,
    SELECTMENU,
    UPDATEMENU,
    OPENMODAL,
    CLOSEMODAL,
    FBLOGIN,
    FBLOGOUT,
    OPENREGISTERVEHICLEFORM,
    UPDATEFORMFIELD,
    REGISTERVEHICLE,
    SHOWPARKINGLIST,
    HIDEPARKINGLIST,
    LOADPARKINGLIST,
    LOADHISTORYLIST,
    SHOWSEARCH,
    CLOSESEARCH,
    SELECTPARKINGITEM,
    CANCELREQUEST,
    CHECKIN,
    FINDMYVEHICLE,
    CHECKOUT,
    DISPLAY_AVAILABLE_PARKING_SPACES,
    REQUEST_PARKING_SPACES,
    SAVE_TO_HISTORY,
    ACTIVE_VEHICLE,
    UPDATE_CURRENT_LOCATION,
    POST_PARKING_SPACE,
    CLEAR_ERROR,
    LOGOUT
} from './constants'
import api from './api/api'

export const toggleMenu = () => {
  return {
    type: TOGGLE,
  }
};

export const selectMenu = (userId, accessToken, item, dispatch) => {
  if (item == 'LOGOUT') {
      api.logout(
          userId,
          accessToken,
          ( ) => {
              dispatch({
                  type: LOGOUT,
              })

          }
      )
  }

  dispatch({
    type: SELECTMENU,
    payload: {
    	item
    }
  })
};

export const updateMenu = (isOpen) => {
  return {
    type: UPDATEMENU,
    payload: {
    	isOpen
    }
  }
};

export const closeModal = () => {
  return {
    type: CLOSEMODAL,
  }
};

export const openModal = () => {
  return {
    type: OPENMODAL,
  }
};

export const onFBLogin = (accessToken, dispatch) => {

  return api.inspectFBAccessToken(
      accessToken,
      ( payload ) => {
        dispatch({
          type: FBLOGIN,
          payload
        })
      }
  );
};

export const onLogout = (accessToken, dispatch) => {
  return api.logout(
      accessToken,
      () => {
        dispatch({
          type: FBLOGOUT
        })
      }
  )
};

export const openRegisterVehicleForm = () => {
  return {
    type: OPENREGISTERVEHICLEFORM
  }
};

export const onTextFieldChanged = (key, value, dispatch) => {
    dispatch({
        type: UPDATEFORMFIELD,
        payload: {
            key,
            value
        }
    });
};

export const onRegisterVehicleSubmit = (userId, accessToken, data, dispatch) => {
    if (!(data.color && data.model && data.brand && data.year && data.plate)) {
        dispatch({
            type: REGISTERVEHICLE,
            payload: {
                error: 'Missing Argument'
            }
        })
    }
    else {
        const vehicle = {
            color: data.color,
            model: data.model,
            brand: data.brand,
            year: data.year,
            plate: data.plate,
        };
        api.registerVehicle(
            userId,
            accessToken.accessToken,
            vehicle,
            ( payload ) => {
                payload = payload || {};
                const _payload = Object.assign(payload, {
                    vehicle
                });
                dispatch({
                    type: REGISTERVEHICLE,
                    payload: _payload
                })
            }
        );
    }
};

export const showParkingList = (
    userId,
    accessToken,
    location,
    dispatch
) => {
    dispatch({
        type: REQUEST_PARKING_SPACES,
        payload: {loadingAvailableParkingSpaces : true},
    });
    navigator.geolocation.getCurrentPosition((_location) => {
        api.requestParkingSpaces(
            userId,
            accessToken,
            {lat: _location.coords.latitude, lng: _location.coords.longitude},
            (payload) => {
                payload['loadingAvailableParkingSpaces'] = false;
                dispatch({
                    type: REQUEST_PARKING_SPACES,
                    payload: payload,
                });
            }
        );
    });
};

export const hideParkingList = () => {
  return {
    type: HIDEPARKINGLIST,
  }
};

export const loadParkingList = (
    userId,
    accessToken,
    location,
    dispatch
) => {
    const payload = {};
    payload['availableParkingSpaces'] = true;
    dispatch({
        type: REQUEST_PARKING_SPACES,
        payload: payload,
    });
    api.requestParkingSpaces(
        userId,
        accessToken,
        location,
        ( payload ) => {
            payload['availableParkingSpaces'] = false;
            dispatch({
                type: REQUEST_PARKING_SPACES,
                payload: payload,
            })
        }
    )
};

export const loadHistoryList = () => {
  return (dispatch) => {
    setTimeout(() => {
        dispatch({ type: LOADHISTORYLIST });
     }, 1000);
        // fetch().then() => dispatch in promise 
    }
};

export const showSearch = () => {
  return {
    type: SHOWSEARCH,
  }
};

export const closeSearch = (userId, accessToken, name, location, dispatch) => {
  // fetch available parking spaces around the destination from backend
  api.fetchAvailableParkingSpaces(
      userId,
      accessToken,
      location,
      ( payload ) => {
          dispatch({
              type: CLOSESEARCH,
              payload: {
                  name: name,
                  location: location,
              }
          });
          if (payload.availableParkingSpaces) {
              dispatch({
                  type: DISPLAY_AVAILABLE_PARKING_SPACES,
                  payload
              })
          }
      }
  );
};

export const selectParkingItem = (userId, accessToken, plate, dispatch) => {
    api.reserveParkingSpace(
        userId,
        accessToken,
        plate,
        ( payload ) => {
            dispatch({
                type: SELECTPARKINGITEM,
                payload: payload
            });
        }
    );
};

export const cancelRequest = () => {
  return {
    type: CANCELREQUEST,
  }
};

export const checkin = (userId, accessToken, plate, location, dispatch) => {
    navigator.geolocation.getCurrentPosition((_location) => {
        api.checkin(
            userId,
            accessToken,
            plate,
            {lat: _location.coords.latitude, lng: _location.coords.longitude},
            ( payload ) => {
                dispatch({
                    type: SAVE_TO_HISTORY,
                    payload: payload
                });

                dispatch({
                    type: CHECKIN,
                    payload:payload
                })

            }
        );
    });
};

export const checkout = (userId, accessToken, plate, dispatch) => {
    api.checkout(
        userId,
        accessToken,
        plate,
        ( payload ) => {
            dispatch({
                type: SAVE_TO_HISTORY,
                payload: payload
            });

            dispatch({
                type: CHECKOUT,
                payload:payload
            })
        }
    );
};

export const findMyVehicle = (userId, accessToken, plate, dispatch) => {

    dispatch({
        type: FINDMYVEHICLE,
        payload: {
            plate
        }
    });
    api.postParkingSpace(
        userId,
        accessToken,
        plate,
        ( payload ) => {
            dispatch({
                type: POST_PARKING_SPACE,
                payload: payload
            })
        }
    );
};

export const activeVehicle = (userId, accessToken, plate, dispatch) => {
    api.activeVehicle(
        userId,
        accessToken,
        plate,
        ( payload ) => {
            dispatch({
                type: ACTIVE_VEHICLE,
                payload: payload
            })
        }
    );
};

export const updateCurrentLocation = (location) => {
    return {
        type: UPDATE_CURRENT_LOCATION,
        payload: {
            latitude: location.coords.latitude,
            longitude: location.coords.longitude
        }
    }
};

export const rejectAllParkingSpaces = (userId, accessToken, dispatch) => {
    dispatch({
        type: REQUEST_PARKING_SPACES,
        payload: {loadingAvailableParkingSpaces : true},
    });
    api.rejectAllParkingSpaces(
        userId,
        accessToken,
        ( payload ) => {
            payload['loadingAvailableParkingSpaces'] = false;
            dispatch({
                type: REQUEST_PARKING_SPACES,
                payload: payload,
            });
        }
    );
};

export const clearError = () => {
    return {
        type: CLEAR_ERROR
    }
};
