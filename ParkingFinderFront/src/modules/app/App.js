import React, { PropTypes, Component } from 'react'
import { StyleSheet, TouchableWithoutFeedback, PixelRatio, Button, View, Text, Image, TextInput, TouchableOpacity, Dimensions,} from 'react-native'
import { connect } from 'react-redux'
import GoogleMap  from 'react-native-maps-google';

import {
    Menu,
    MenuButton,
    Map,
    MyInfo,
    History,
    Help,
    Settings,
    FBLoginButton,
    Form,
    VehicleRegistrationForm,
    VehicleList,
    AvailableParkingList,
    GoogleAutocomplete,
} from './../../components';

import * as actions from './actions'

const FBSDK = require('react-native-fbsdk');
const { LoginManager } = FBSDK;

const SideMenu = require('react-native-side-menu');
const window = Dimensions.get('window');

const styles = StyleSheet.create({
  caption: {
    fontSize: 20,
    fontWeight: 'bold',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  map: {
    height: window.height*0.9,
    width:window.width,
    position:'absolute',
    top: 0,
    left: 0,
  },
  textInputContainer: {
    height: window.height*0.05,
    width:window.width*0.8,
    backgroundColor: 'rgba(0,0,0,0)',
    borderTopWidth: 1,
    borderBottomWidth:1,
    marginTop:15,
    borderColor: '#E4E4E4',
  },
  textInput: {
    color: 'grey',
    height: 28,
    borderRadius: 5,
    paddingTop: 4.5,
    paddingBottom: 4.5,
    paddingLeft: 10,
    paddingRight: 10,
    marginTop: 7.5,
    marginLeft: 8,
    marginRight: 8,
    fontSize: 15,
  },
  searchBar: {
    top: 27,
    left: 60,
    height: window.height*0.05,
    width:window.width*0.8,
    backgroundColor: '#FFFFFF',
    zIndex: 10,
    position: 'absolute',
    shadowColor: "grey",
    shadowOpacity: 0.8,
    shadowRadius: 4,
    shadowOffset: {
      height: 1,
      width: 0,
    }
  },
  searchBarButton: {
    paddingTop: 6.5,
    paddingBottom: 6.5,
    paddingLeft: 10,
    paddingRight: 10,
    textAlign: 'left',
    fontSize: 15,
    fontWeight: 'normal',
    color:'grey',
    zIndex: 10,
  },
  requestButtonItem: {
    borderColor: '#6B6B76',
    backgroundColor: '#F9F9F9',
    borderRadius: 4,
    borderWidth: 1,
    width: 160,
    marginRight: 5,
  },
  requestButton: {
    color: '#6B6B76',
    fontFamily: 'Helvetica',
    paddingTop: 5,
    paddingBottom: 5,
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'normal',
    flexDirection: 'row',
  },
  emptyPage: {
    flex: 1,
    paddingTop: 64,
  },
  emptyPageText: {
    margin: 10,
  },
  mask: {
    position: 'absolute',
    top:0,
    height: window.height,
    width:window.width,
    backgroundColor: 'black',
    opacity: 0.5,
    zIndex:1000000,
  },
  noMask: {
    position: 'absolute',
    top:0,
    height: 0,
    width: 0,
  },
  footerContainer: {
    backgroundColor: '#F9F9F9',
    justifyContent: 'center',
    alignItems: 'center',
    width:window.width,
    height: window.height*0.1,
    borderTopWidth: 1,
    borderTopColor: '#B2B2BA',
    position: 'absolute',
    bottom: 0,
    left: 0,
  },
  buttonGroupStyle: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  checkInStyle: {
    borderColor: '#6B6B76',
    backgroundColor: '#F9F9F9',
    borderRadius: 4,
    borderWidth: 1,
    width: 170,
    marginRight: 5,
    justifyContent: 'center',
    alignItems: 'center',
    height: window.height*0.07,
  },
  requestButtonItem: {
    borderColor: '#6B6B76',
    backgroundColor: '#6B6B76',
    borderRadius: 4,
    borderWidth: 1,
    width: 170,
    marginLeft: 5,
    justifyContent: 'center',
    alignItems: 'center',
    height: window.height*0.07,
  },
  checkInTextStyle: {
    color: '#6B6B76',
    fontFamily: 'Helvetica',
  },
  requestButton: {
    color: '#F9F9F9',
    fontFamily: 'Helvetica',
  },
})

const Mask = (props) => {
  const {visible} = props;

  if (visible == true) {
    return (
      <View style={styles.mask}></View>
    );
  }
  else {
    return (
      <View style={styles.noMask}></View>
    );
  }
}

const App = (props) => {
  const {
    onMenuItemSelected,
    name,
    url,
    isOpen,
    updateMenuState,
    selectedItem,
    toggle,
    myInfoVisible,
    historyVisible,
    loadHistoryList,
    helpVisible,
    settingsVisible,
    registerVehicleVisible,
    vehicleListVisible,
    closeModal,
    openModal,
    accessToken,
    onFBLogin,
    onLogout,
    onTextFieldChanged,
    onRegisterVehicleSubmit,
    onVehicleListEntryClicked,
    onRegisterVehicleButtonClicked,
    availableParkingListVisible,
    showParkingList,
    hideParkingList,
    loadParkingList,
    dataSource,
    dataSourceHistory,
    user,
    form,
    searchVisible,
    showSearch,
    closeSearch,
    destination,
    location,
    selectParkingItem,
    mainButtonStatus,
    cancelRequest,
    checkin,
    findMyVehicle,
    checkout,
    selectedLng,
    selectedLat,
    loadingAvailableParkingSpaces,
    updateCurrentLocation,
    navigation,
    markers,
    cameraLatLng,
    error,
    clearError,
    rejectAllParkingSpaces,
  } = props;
  if (error) {
    alert(error);
    clearError();
  }

  if (!accessToken) {
    LoginManager.logOut();
    return (<FBLoginButton onFBLogin={onFBLogin}/>);

  }

  if (user && !user.activated_vehicle) {
    // user have to activate current using vehicle
  }

  let cameraPosition = {};
  if (cameraLatLng && cameraLatLng.longitude) {
    cameraPosition = {auto: false, latitude: cameraLatLng.latitude, longitude: cameraLatLng.longitude, zoom: cameraLatLng.zoom};
  }
  else {
      cameraPosition = {auto: false, zoom: 18};
  }

  navigator.geolocation.watchPosition((_location) => {
      updateCurrentLocation(_location);
  });
  let mainButton;
  console.log(mainButtonStatus);
  switch(mainButtonStatus) {
    //available parking list
    case 1:        
    mainButton = (
    <View style={styles.footerContainer}>
    <View style={styles.buttonGroupStyle}>
      <TouchableOpacity style={styles.checkInStyle} onPress={() => {
        checkin(user.userId, accessToken.accessToken, location, user.activatedVehicle)
    }}>
        <Text style={styles.checkInTextStyle}>CHECK IN</Text>
      </TouchableOpacity>
    <TouchableOpacity style={styles.requestButtonItem} onPress={() => {
        showParkingList(user.userId, accessToken.accessToken, location)
    }}>
    <Text style={styles.requestButton}>AVAILABLE PARKING</Text>
    </TouchableOpacity>
    </View>
    </View>
    );
    break;
    //check in
    case 2:
    mainButton = (
    <View style={styles.footerContainer}>
    <View style={styles.buttonGroupStyle}>
    <TouchableOpacity style={styles.checkInStyle} onPress={() => {
        checkin(user.userId, accessToken.accessToken, location, user.activatedVehicle)
    }}>
        <Text style={styles.checkInTextStyle}>CHECK IN</Text>
    </TouchableOpacity>
    <TouchableOpacity style={styles.requestButtonItem} onPress={cancelRequest}>
        <Text style={styles.requestButton}>CANCEL</Text>
    </TouchableOpacity>
    </View>
    </View>
    );
    break;
    //find my vehicle
    case 3:        
    mainButton = (
    <View style={styles.footerContainer}>
    <View style={styles.buttonGroupStyle}>
    <TouchableOpacity style={styles.requestButtonItem} onPress={() => findMyVehicle(user.userId, accessToken.accessToken)(user.activatedVehicle)}>
    <Text style={styles.requestButton}>FIND MY VEHICLE</Text>
    </TouchableOpacity>
    </View>
    </View>
    );
    break;
    //check out
    case 4:        
    mainButton = (
    <View style={styles.footerContainer}>
    <View style={styles.buttonGroupStyle}>
    <TouchableOpacity style={styles.requestButtonItem} onPress={() => checkout(user.userId, accessToken.accessToken)(user.activatedVehicle)}>
    <Text style={styles.requestButton}>CHECK OUT</Text>
    </TouchableOpacity>
    </View>
    </View>
    );
    break;
    default:
    break;
  }

  return (
      <SideMenu
        menu={<Menu
            onItemSelected={onMenuItemSelected(user.userId, accessToken.accessToken)}
            userName={user.firstName + ' ' + user.lastName}
            userUrl={user.profilePictureUrl}
            popupModal={openModal}
            onLogout={() => onLogout(accessToken)}
        />}
        isOpen={isOpen}
        onChange={(isOpen) => updateMenuState(isOpen)}>
        <View style={styles.container}>
        <GoogleAutocomplete visible={searchVisible} requestClose={closeSearch(user.userId, accessToken.accessToken)}/>
          <TouchableOpacity style={styles.searchBar} onPress={showSearch}>
            <Text style={styles.searchBarButton}>{destination}</Text>
          </TouchableOpacity>
           <Mask visible={isOpen}/>           
          <GoogleMap
            style={styles.map}
            cameraPosition={{latitude: cameraPosition.latitude, longitude: cameraPosition.longitude, zoom: cameraPosition.zoom, auto: cameraPosition.auto}}
            showsUserLocation={true}
            scrollGestures={true}
            zoomGestures={true}
            tiltGestures={true}
            rotateGestures={true}
            myLocationButton={true}
            indoorPicker={true}
            allowScrollGesturesDuringRotateOrZoom={true}
            markers={markers} 
            />
          {mainButton}
            <MyInfo visible={myInfoVisible} 
                requestClose={closeModal} 
                profileUrl={user.profilePictureUrl} 
                firstName={user.firstName} 
                lastName={user.lastName}
                email={user.email}/> 
            <History 
                visible={historyVisible} 
                requestClose={closeModal} 
                loadHistoryList={loadHistoryList}
                dataSource={dataSourceHistory}/>
            <Help visible={helpVisible} requestClose={closeModal} />
            <Settings visible={settingsVisible} requestClose={closeModal} />
            <VehicleRegistrationForm
                visible={registerVehicleVisible}
                onChanged={onTextFieldChanged}
                onSubmit={() => onRegisterVehicleSubmit(user, accessToken, form)}
                requestClose={closeModal}
            />
            <VehicleList
                visible={vehicleListVisible}
                vehicles={user.ownedVehicles}
                activatedVehicle={user.activatedVehicle}
                onEntryClicked={onVehicleListEntryClicked(user.userId, accessToken.accessToken)}
                requestClose={closeModal}
                onClicked={onRegisterVehicleButtonClicked}
            />
          <AvailableParkingList
                 visible={availableParkingListVisible}
                 requestClose={hideParkingList}
                 loadParkingList={loadParkingList(user.userId, accessToken.accessToken)}
                 loading={loadingAvailableParkingSpaces}
                 rejectAllParkingSpaces={rejectAllParkingSpaces(user.userId, accessToken.accessToken)}
                 dataSource={dataSource}
                 selectParkingItem={selectParkingItem(user.userId, accessToken.accessToken)}/>
        </View>
        <MenuButton onClick={toggle}>
          <Image
              source={require('./../../assets/menu.png')} resizeMode='contain' style={{width: 32, height: 32}} />
        </MenuButton>
      </SideMenu>
  );
};

App.displayName = 'App';

App.propTypes = {
  onMenuItemSelected: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  isOpen: PropTypes.bool.isRequired,
  updateMenuState: PropTypes.func.isRequired,
  selectedItem: PropTypes.string.isRequired,
  toggle: PropTypes.func.isRequired,
  closeModal: PropTypes.func.isRequired,
  showParkingList: PropTypes.func.isRequired,
  hideParkingList: PropTypes.func.isRequired,
  openModal: PropTypes.func.isRequired,
  onFBLogin: PropTypes.func.isRequired,
  myInfoVisible: PropTypes.bool.isRequired,
  historyVisible: PropTypes.bool.isRequired,
  helpVisible: PropTypes.bool.isRequired,
  settingsVisible: PropTypes.bool.isRequired,
  availableParkingListVisible: PropTypes.bool.isRequired,
  loadParkingList: PropTypes.func.isRequired,
  loadHistoryList: PropTypes.func.isRequired,
  onTextFieldChanged: PropTypes.func.isRequired,
  onRegisterVehicleSubmit: PropTypes.func.isRequired,
  onRegisterVehicleButtonClicked: PropTypes.func.isRequired,
  user: PropTypes.object,
  form: PropTypes.object,
  searchVisible: PropTypes.bool.isRequired,
  showSearch:PropTypes.func.isRequired,
  closeSearch:PropTypes.func.isRequired,
  destination: PropTypes.string.isRequired,
  location: PropTypes.object,
  selectParkingItem: PropTypes.func.isRequired,
  cancelRequest: PropTypes.func.isRequired,
  checkin: PropTypes.func.isRequired,
  findMyVehicle: PropTypes.func.isRequired,
  checkout: PropTypes.func.isRequired,
  onVehicleListEntryClicked: PropTypes.func.isRequired,
  clearError: PropTypes.func.isRequired,
  rejectAllParkingSpaces: PropTypes.func.isRequired,
  loadingAvailableParkingSpaces: PropTypes.bool,
  markers: PropTypes.array,
};

export default connect(
  (state) => ({
    isOpen: state.app.isOpen,
    selectedItem: state.app.selectedItem,
    name: state.app.name,
    url: state.app.url,
    myInfoVisible: state.app.myInfoVisible,
    historyVisible: state.app.historyVisible,
    helpVisible: state.app.helpVisible,
    settingsVisible: state.app.settingsVisible,
    vehicleListVisible: state.app.vehicleListVisible,
    registerVehicleVisible: state.app.registerVehicleVisible,
    accessToken: state.app.accessToken,
    user: state.app.user,
    form: state.app.form,
    availableParkingListVisible: state.app.availableParkingListVisible,
    dataSource:state.app.dataSource,
    dataSourceHistory: state.app.dataSourceHistory,
    searchVisible: state.app.searchVisible,
    destination: state.app.destination,
    location: state.app.location,
    mainButtonStatus: state.app.mainButtonStatus,
    selectedLng: state.app.selectedLng,
    selectedLat: state.app.selectedLat,
    loadingAvailableParkingSpaces: state.app.loadingAvailableParkingSpaces,
    markers: state.app.markers,
    cameraLatLng: state.app.cameraLatLng,
    error: state.app.error,
    isProgressBarStop: state.app.isProgressBarStop,
    progress: state.app.progress
  }),
  (dispatch) => ({
    toggle: () => dispatch(actions.toggleMenu()),
    showParkingList: (userId, accessToken, location) => actions.showParkingList(userId, accessToken, location, dispatch),
    hideParkingList: () => dispatch(actions.hideParkingList()),
    onMenuItemSelected: (userId, accessToken) => (item) => actions.selectMenu(userId, accessToken, item, dispatch),
    updateMenuState: (isOpen) => dispatch(actions.updateMenu(isOpen)),
    closeModal: () => dispatch(actions.closeModal()),
    openModal: () => dispatch(actions.openModal()),
    onFBLogin: (accessToken) => actions.onFBLogin(accessToken, dispatch),
    onLogout: (accessToken) => actions.onLogout(accessToken, dispatch),
    onTextFieldChanged: (key, value) => actions.onTextFieldChanged(key, value, dispatch),
    onRegisterVehicleSubmit:
        (user, accessToken, data) =>
          actions.onRegisterVehicleSubmit(user.userId, accessToken, data,dispatch),
    onRegisterVehicleButtonClicked: () => dispatch(actions.openRegisterVehicleForm()),
    loadParkingList: () => (userId, accessToken) => (location) => actions.loadParkingList(userId, accessToken, location),
    loadHistoryList: () => dispatch(actions.loadHistoryList()),
    showSearch: ()=> dispatch(actions.showSearch()),
    closeSearch: (userId, accessToken) => (name, location)=> actions.closeSearch(userId, accessToken, name, location, dispatch),
    selectParkingItem: (userId, accessToken) => (plate)=> actions.selectParkingItem(userId, accessToken, plate, dispatch),
    cancelRequest: () => dispatch(actions.cancelRequest()),
    checkin: (userId, accessToken, location, plate) => actions.checkin(userId, accessToken, plate, location, dispatch),
    checkout: (userId, accessToken)=> (plate) => actions.checkout(userId, accessToken, plate, dispatch),
    findMyVehicle: (userId, accessToken) => (plate) => actions.findMyVehicle(userId, accessToken, plate, dispatch),
    onVehicleListEntryClicked: (userId, accessToken) => (plate) => actions.activeVehicle(userId, accessToken, plate, dispatch),
    updateCurrentLocation: (location) => dispatch(actions.updateCurrentLocation(location)),
    clearError: () => dispatch(actions.clearError()),
    rejectAllParkingSpaces: (userId, accessToken)   => () => actions.rejectAllParkingSpaces(userId, accessToken, dispatch),
  })
)(App)