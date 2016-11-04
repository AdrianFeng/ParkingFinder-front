import { handleActions } from 'redux-actions'
import { TOGGLE, SELECTMENU, UPDATEMENU, OPENMODAL, CLOSEMODAL, SHOWPARKINGLIST, HIDEPARKINGLIST, LOADPARKINGLIST } from './constants'
import React, {
    ListView
} from 'react-native';

const defaultParking = [
                    {address: '10980 Wellworth ave', distance: '100 ft', longitude: '32.47', latitude: '-107.85'},
                    {address: '10981 Whilshire ave', distance: '122 ft', longitude: '33.47', latitude: '-104.85'},
                    {address: '10982 Westwood Plaza', distance: '1 mile', longitude: '34.47', latitude: '-107.85'},
                    {address: '10983 Ohio Street', distance: '1.5 mile', longitude: '35.47', latitude: '-102.85'},
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
    AvailabeParkingListVisible: false,
    dataSource: defaultDataSource,
}

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
				}
				break;
			case "HISTORY": 
				return {
					...state,
					historyVisible: true
				}
				break;
			case "HELP": 
				return {
					...state,
					helpVisible: true
				}
				break;
			case "SETTINGS": 
				return {
					...state,
					settingsVisible: true
				}
				break;
			default: 
				return {
					...state,
				}
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
			selectedItem: "default",
		}
	},
	[LOADPARKINGLIST]: (state, action) => {
		var dataSource = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
        dataSource = dataSource.cloneWithRows(defaultParking);
        return {
            ...state,
            dataSource,
        }
	}
}, initialState)