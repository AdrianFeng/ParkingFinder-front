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
} from './constants'

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
	}
}, initialState)