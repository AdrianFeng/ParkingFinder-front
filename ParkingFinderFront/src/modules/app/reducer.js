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
} from './constants'


import React, {
    ListView
} from 'react-native';

const defaultParking = [
                    {address: '10980 Wellworth ave', distance: '100 ft', longitude: '32.47', latitude: '-107.85'},
                    {address: '10981 Whilshire ave', distance: '122 ft', longitude: '33.47', latitude: '-104.85'},
                    {address: '10982 Westwood Plaza', distance: '1 mile', longitude: '34.47', latitude: '-107.85'},
                    {address: '10983 Ohio Street', distance: '1.5 mile', longitude: '35.47', latitude: '-102.85'},
                ];
const defaultHistory = [
                    {address: '10980 Wellworth ave', date: '11/11/16, 6:27 PM', longitude: '32.47', latitude: '-107.85'},
                    {address: '10981 Whilshire ave', date: '11/11/16, 11:11 PM', longitude: '33.47', latitude: '-104.85'},
                    {address: '10982 Westwood Plaza', date: '11/11/16, 6:27 AM', longitude: '34.47', latitude: '-107.85'},
                    {address: '10983 Ohio Street', date: '11/11/16, 5:27 PM', longitude: '35.47', latitude: '-102.85'},
                ];
const defaultDataSource = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
defaultDataSource = defaultDataSource.cloneWithRows(defaultParking);

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
		            console.log("CLOSESEARCH");
		const { payload } = action;
		console.log(payload.name);
		console.log(payload.location);
		return {
			...state,
			searchVisible: false,
			destination: payload.name,
			location: payload.location,
		}
	},

}, initialState)