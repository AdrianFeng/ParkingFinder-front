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
    ACTIVE_VEHICLE
} from './constants'
import api from './api/api'

export const toggleMenu = () => {
  return {
    type: TOGGLE,
  }
};

export const selectMenu = (item) => {
  return {
    type: SELECTMENU,
    payload: {
    	item
    }
  }
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
    api.requestParkingSpaces(
        userId,
        accessToken,
        location,
        ( payload ) => {
            payload['loadingAvailableParkingSpaces'] = false;
            dispatch({
                type: REQUEST_PARKING_SPACES,
                payload: payload,
            })
        }
    );
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
    dispatch({
        type: REQUEST_PARKING_SPACES,
        payload: null,
        loadingAvailableParkingSpaces: true,
    })
    api.requestParkingSpace(
        userId,
        accessToken,
        location,
        ( payload ) => {
            dispatch({
                type: REQUEST_PARKING_SPACE,
                payload: payload,
                loadingAvailableParkingSpaces: false,
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
    api.checkin(
        userId,
        accessToken,
        plate,
        location,
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
};

export const checkout = (userId, accessToken, plate, dispatch) => {
    api.checkout(
        userId,
        accessToken,
        plate,
        location,
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
    api.postParkingSpace(
        userId,
        accessToken,
        plate,
        ( payload ) => {
            dispatch({
                type: FINDMYVEHICLE,
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
