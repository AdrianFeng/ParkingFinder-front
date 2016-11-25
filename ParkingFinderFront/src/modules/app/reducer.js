import { handleActions } from 'redux-actions'
import {
	TOGGLE,
	SELECTMENU,
	UPDATEMENU,
	OPENMODAL,
	CLOSEMODAL,
	FBLOGIN,
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
} from './constants'


import React, {
    ListView
} from 'react-native';

const defaultParking = [
                    {address: '10980 Wellworth ave', distance: '100 ft', longitude: -118.4453886, latitude: 34.0561251, plate: '6DAY434'},
                    {address: '10981 Whilshire Blvd', distance: '122 ft', longitude: -118.4472583, latitude: 34.0579264, plate: '6DAY444'},
                    {address: '10982 Westwood Plaza', distance: '1 mile', longitude: -118.4448444, latitude: 34.0693954, plate: '6DAY454'},
                    {address: '103 Ohio Ave', distance: '1.5 mile', longitude: -118.4484161, latitude: 34.0493621, plate: '6DAY464'},
                ];
const defaultHistory = [
                    {address: '10980 Wellworth ave', date: '11/11/16, 6:27 PM', longitude: '32.47', latitude: '-107.85'},
                    {address: '10981 Whilshire ave', date: '11/11/16, 11:11 PM', longitude: '33.47', latitude: '-104.85'},
                    {address: '10982 Westwood Plaza', date: '11/11/16, 6:27 AM', longitude: '34.47', latitude: '-107.85'},
                    {address: '10983 Ohio Street', date: '11/11/16, 5:27 PM', longitude: '35.47', latitude: '-102.85'},
                ];
let defaultDataSource = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
defaultDataSource = defaultDataSource.cloneWithRows(defaultParking);
let historyDefaultDataSource = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
historyDefaultDataSource = historyDefaultDataSource.cloneWithRows(defaultParking);

const initialState = {
	isOpen: false,
	selectedItem: "default",
	name: "Yao Zhang",
	url: "https://breakinggeek.files.wordpress.com/2013/11/c0a80f0578993697efb53100a772f162.png",
	myInfoVisible: false,
	historyVisible: false,
    helpVisible: false,
    settingsVisible: false,
	registerVehicleVisible: false,
    vehicleListVisible: false,
    AvailabeParkingListVisible: false,
    searchVisible: false,
    destination: "Enter Destination",
   	location: null,
   	selectedLng: null,
   	selectedLat: null,
   	mainButtonStatus:1,
	dataSource: defaultDataSource,
    dataSourceHistory: historyDefaultDataSource,
	markers: [],
};

export default handleActions({
	[TOGGLE]: (state, action) => {
		const { isOpen } = state
		const newIsOpen = !isOpen

		return {
			...state,
			isOpen: newIsOpen
		}
	},
	[SELECTMENU]: (state, action) => {
		const { payload: { item } } = action

		return {
			...state,
			isOpen: false,
			selectedItem: item
		}

	},
	[UPDATEMENU]: (state, action) => {
		const { payload: { isOpen } } = action

		return {
			...state,
			isOpen: isOpen
		}
	},
	[OPENMODAL]: (state, action) => {
		const { selectedItem } = state

		switch(selectedItem) {
			case "MY INFO": 
				return {
					...state,
					myInfoVisible: true
				};
				break;
			case "HISTORY": 
				return {
					...state,
					historyVisible: true
				};
				break;
			case "HELP": 
				return {
					...state,
					helpVisible: true
				};
				break;
			case "SETTINGS": 
				return {
					...state,
					settingsVisible: true
				};
				break;
			case "VEHICLES":
				return {
					...state,
					vehicleListVisible: true
				};
			default:
				return {
					...state,
				};
				break;
		}
	},
	[SHOWPARKINGLIST]: (state, action) => {
		return {
			...state,
			AvailabeParkingListVisible: true
		}
	},
	[HIDEPARKINGLIST]: (state, action) => {
		return {
			...state,
			AvailabeParkingListVisible: false
		}
	},
	[CLOSEMODAL]: (state, action) => {
		return {
			...state,
			myInfoVisible: false,
			historyVisible: false,
			helpVisible: false,
			settingsVisible: false,
			registerVehicleVisible: false,
            vehicleListVisible: false,
			selectedItem: "default",
		}
	},
	[FBLOGIN]: (state, action) => {
		const { payload } = action;
		if (payload.error) {
			return {
				...state,
				error: payload.error.message,
				accessToken: null,
			}
		} else {
			let registerVehicleVisible = false;
            if (!payload.user.ownedVehicles) {
                registerVehicleVisible = true;
			}

			return {
				...state,
				accessToken: payload.accessToken,
				user: payload.user,
				registerVehicleVisible
			}
		}
	},
	[OPENREGISTERVEHICLEFORM]: (state, action) => {
        return {
			...state,
			myInfoVisible: false,
			historyVisible: false,
			helpVisible: false,
			settingsVisible: false,
			registerVehicleVisible: true,
			vehicleListVisible: false,
		}
	},
	[UPDATEFORMFIELD]: (state, action) => {
        const fields = state.form || {};
		const {
			key,
			value
		} = action.payload;
        fields[key.toLowerCase()] = value;

		return {
			...state,
			form: fields,
		}
	},
	[REGISTERVEHICLE]: (state, action) => {
		if (action.error) {
			alert(state.error);
			return {
				...state,
			}
		} else {
			const ownedVehicles = state.user.ownedVehicles || [];
			if (action.payload.vehicle) {
				ownedVehicles.push(action.payload.vehicle);
			}
			const user = Object.assign(state.user, {
				ownedVehicles
			});
			return {
				...state,
				form: null,
				registerVehicleVisible: false,
                vehicleListVisible: true,
                user
			}
		}
	},
	[LOADPARKINGLIST]: (state, action) => {
		var dataSource = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
        dataSource = dataSource.cloneWithRows(defaultParking);
        return {
            ...state,
            dataSource,
        }
	},
	[LOADHISTORYLIST]: (state, action) => {
		var dataSourceHistory = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
        dataSourceHistory = dataSourceHistory.cloneWithRows(defaultHistory);
        return {
            ...state,
            dataSourceHistory,
        }
	},
	[SHOWSEARCH]: (state, action) => {
		return {
			...state,
			searchVisible: true,
		}
	},
	[CLOSESEARCH]: (state, action) => {
		const { payload } = action;
		console.log(payload.name);
		console.log("location");
		console.log(payload.location);
		return {
			...state,
			searchVisible: false,
			destination: payload.name,
			location: payload.location,
			cameraLatLng: {
				longitude: location.lng,
				latitude: location.lat
			}
		}
	},
	[SELECTPARKINGITEM]: (state, action) => {
		const { payload } = action;
		if (payload.error) {
            const dataSource = defaultDataSource.cloneWithRows([]);
			return {
				...state,
				navigation: null,
				displayNavigation: false,
				AvailableParkingListVisible: true,
				dataSource,
				error: payload.error
			}
		}
		else {
            const markers = [];
            const { reservation } = payload;
		    markers.push({
		    	id: reservation.parkingSpace.plate,
		    	latitude: reservation.parkingSpace.latitude,
				longitude: reservation.parkingSpace.longitude
			});

			return {
				...state,
				navigation: {
					vehicle: reservation.vehicle,
					parkingSpace: reservation.parkingSpace,
				},
				markers,
				mainButtonStatus:2,
				displayNavigation: true,
				AvailabeParkingListVisible: false,
				cameraLatLng: null
			}
		}
	},
	[CANCELREQUEST]: (state, action) => {
		return {
			...state,
			selectedLng: null,
			selectedLat: null,
			mainButtonStatus:1,
		}
	},
	[CHECKIN]: (state, action) => {
        const { payload } = action;
        if (payload.error) {
			console.log('UNCAUGHT Exception reducer: checkin' + payload.error);
            return {
				...state,
			}
		}
		else {
            const parkingLot = state.parkingLot || {};
			const parkingSpace = payload.parkingSpace;
			parkingLot[parkingSpace.plate] = parkingSpace;

			return {
				...state,
				navigation: null,
				parkingLot,
				displayNavigation: false,
				mainButtonStatus:3,
				markers: [],
				cameraLatLng: null
			}
		}
	},
	[POST_PARKING_SPACE]: (state, action) => {
		return {
			...state
		}
	},
	[FINDMYVEHICLE]: (state, action) => {
		const { payload } = action;
		if (payload.error) {
			return {
				...state,
				error: payload.error,
				mainButtonStatus: 4
			}
		}
		else {

			const plate = payload.plate;
            const parkingSpace = state.parkingLot[plate];
            const markers = [];
            markers.push({
            	id: parkingSpace.plate,
				latitude: parkingSpace.latitude,
				longitude: parkingSpace.longitude
			});
            const cameraLatLng = {
                latitude: parkingSpace.latitude,
                longitude: parkingSpace.longitude
			};
			return {
				...state,
				navigation: {
					parkingSpace
				},
				markers,
				cameraLatLng,
				displayNavigation: true,
				mainButtonStatus:4,
			}
		}
	},
	[CHECKOUT]: (state, action) => {
		const { payload } = action;
		const parkingLot = state.parkingLot || {};
        delete parkingLot[payload.plate];
		return {
			...state,
            parkingLot,
			cameraLatLng: null,
			markers: [],
			navigation: null,
			displayNavigation: false,
			mainButtonStatus:1,
		}
	},
	[DISPLAY_AVAILABLE_PARKING_SPACES]: (state, action) => {
		const payload = action.payload;
		if (payload.error) {
			return {
				...state,
				availableParkingSpaces: [],
				error: action.error.message
			}
		}
		else {

		    const markers = payload.availableParkingSpaces.map((parkingSpace, id) => {
		    	return {
		    		id: '' + id,
					latitude: parkingSpace.latitude,
					longitude: parkingSpace.longitude
				}
			});
		    let cameraLatLng = null;
		    if (payload.availableParkingSpaces && payload.availableParkingSpaces.length > 0) {
		    	cameraLatLng = {
		    		latitude: payload.availableParkingSpaces[0].latitude,
					longitude: payload.availableParkingSpaces[0].longitude
		    	}
			}

			return {
				...state,
                markers,
                cameraLatLng
			}
		}
	},
	[REQUEST_PARKING_SPACES]: (state, action) => {
		// TODO if user terminate the service, do not modify states
		const payload = action.payload;
		let dataSource = [];
		if (!(action.error || payload.loadingAvailableParkingSpaces) && payload.availableParkingSpaces) {
            dataSource = payload.availableParkingSpaces || [];
		}

		dataSource = defaultDataSource.cloneWithRows(dataSource);
		if (payload.loadingAvailableParkingSpaces) {
			return {
				...state,
				loadingAvailableParkingSpaces: true,
                dataSource: dataSource,
				AvailabeParkingListVisible: true
			}
		}
		else if (payload.error) {
			return {
				...state,
				dataSource: dataSource,
				error: action.error.message
			}
		}
		else {
			return {
				...state,
				dataSource: dataSource,
			}
		}
	},
	[SAVE_TO_HISTORY]: (state, action) => {
		console.log('reducer:SAVE_TO_HISTORY not implement');
        return {
			...state,
		}
	},
	[ACTIVE_VEHICLE]: (state, action) => {
		const { payload } = action;

        if (payload.error) {
            return {
				...state,
				error: payload.error
			}
		}
		else {
			const user = state.user;
			user['activated_vehicle'] = payload.activated_vehicle;
			return {
				...state,
				user
			};
		}
	},
	[UPDATE_CURRENT_LOCATION]: (state, action) => {
		const { payload } = action;
		return {
			...state,
			location: {
				lng: payload.longitude,
				lat: payload.latitude
			}
		}
	},
}, initialState)