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
    flex: 1,
    marginTop:35,
    height: window.height*0.55,
    width:window.width,
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
    top:25,
    marginLeft: 65,
    height: window.height*0.05,
    width:window.width*0.8,
    borderWidth: 1.5,
    borderColor: '#E4E4E4',
    backgroundColor: '#FFFFFF',
  },
  searchBarButton: {
    borderRadius: 5,
    paddingTop: 4.5,
    paddingBottom: 4.5,
    paddingLeft: 10,
    paddingRight: 10,
    textAlign: 'left',
    fontSize: 15,
    fontWeight: 'normal',
    color:'grey',
    flexDirection: 'row',
  },
  requestButtonItem: {
    marginTop:10,
    width:350,
    height:45,
    backgroundColor: '#696969',
  },
  requestButton: {
    fontSize: 20,
    fontWeight: 'normal',
    color:'white',
    flexDirection: 'row',
    paddingTop: 10,
    textAlign: 'center',
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
    flex: 0.15,
    backgroundColor: '#F9F9F9',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop:10,
    width:350,
    height:45,
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
    width: 160,
    marginRight: 5,
  },
  cancelStyle: {
    borderColor: '#6B6B76',
    backgroundColor: '#6B6B76',
    borderRadius: 4,
    borderWidth: 1,
    width: 160,
    marginLeft: 5,
  },
  checkInTextStyle: {
    color: '#6B6B76',
    fontFamily: 'Helvetica',
    paddingTop: 5,
    paddingBottom: 5,
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'normal',
    flexDirection: 'row',
  },
  cancelTextStyle: {
    color: '#F9F9F9',
    fontFamily: 'Helvetica',
    paddingTop: 5,
    textAlign: 'center',
    fontSize: 18,
    paddingBottom: 5,
    fontWeight: 'normal',
    flexDirection: 'row',
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
    navigator,
    accessToken,
    onFBLogin,
    onLogout,
    onTextFieldChanged,
    onRegisterVehicleSubmit,
    onVehicleListEntryClicked,
    onRegisterVehicleButtonClicked,
    AvailabeParkingListVisible,
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
    selectedLong,
    selectedAl,
  } = props;

  if (!accessToken) {
    LoginManager.logOut();
    return (<FBLoginButton onFBLogin={onFBLogin}/>);

  }

  if (user && !user.activated) {
    // user have to activate current using vehicle
  }

  let markers = [];
  let cameraPosition = {auto: true, zoom: 15};
  if(location) {
    markers = [
            {
            id: 'marker-100',
            latitude: location.lat,
            longitude: location.lng,
            },   
            ];
    cameraPosition = {latitude: location.lat, longitude: location.lng, zoom: 15}
  }

  if(selectedLong && selectedAl) {
        markers = [
            {
            id: 'marker-100',
            latitude: selectedAl,
            longitude: selectedLong,
            },   
            ];
    cameraPosition = {latitude: selectedAl, longitude: selectedLong, zoom: 15}
  }

  let mainButton;
  console.log(mainButtonStatus);
  switch(mainButtonStatus) {
    //available parking list
    case 1:        
    mainButton = (
    <View style={styles.footerContainer}>
    <View style={styles.buttonGroupStyle}>
    <TouchableOpacity style={styles.requestButtonItem} onPress={showParkingList}>
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
    <TouchableOpacity style={styles.checkInStyle} onPress={checkin}>
        <Text style={styles.checkInTextStyle}>Check In</Text>
    </TouchableOpacity>
    <TouchableOpacity style={styles.cancelStyle} onPress={cancelRequest}>
        <Text style={styles.cancelTextStyle}>Cancel</Text>
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
    <TouchableOpacity style={styles.requestButtonItem} onPress={findMyVehicle}>
    <Text style={styles.requestButton}>Find My Vehicle</Text>
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
    <TouchableOpacity style={styles.requestButtonItem} onPress={checkout}>
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
            onItemSelected={onMenuItemSelected}
            userName={user.firstName + ' ' + user.lastName}
            userUrl={user.profilePictureUrl}
            popupModal={openModal}
            onLogout={() => onLogout(accessToken)}
        />}
        isOpen={isOpen}
        onChange={(isOpen) => updateMenuState(isOpen)}>
        <View style={styles.container}>
        <GoogleAutocomplete visible={searchVisible} requestClose={closeSearch}/>
          <TouchableOpacity style={styles.searchBar} onPress={showSearch}>
            <Text style={styles.searchBarButton}>{destination}</Text>
          </TouchableOpacity>
           <Mask visible={isOpen}/>           
          <GoogleMap
            style={styles.map}
            cameraPosition={cameraPosition}
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
            <MyInfo visible={myInfoVisible} requestClose={closeModal} />
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
                onEntryClicked={onVehicleListEntryClicked}
                requestClose={closeModal}
                onClicked={onRegisterVehicleButtonClicked}
            />
          <AvailableParkingList
                 visible={AvailabeParkingListVisible}
                 requestClose={hideParkingList}
                 loadParkingList={loadParkingList}
                 dataSource={dataSource}
                 selectParkingItem={selectParkingItem}/>
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
  AvailabeParkingListVisible: PropTypes.bool.isRequired,
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
    AvailabeParkingListVisible: state.app.AvailabeParkingListVisible,
    dataSource:state.app.dataSource,
    dataSourceHistory: state.app.dataSourceHistory,
    searchVisible: state.app.searchVisible,
    destination: state.app.destination,
    location: state.app.location,
    mainButtonStatus: state.app.mainButtonStatus,
    selectedLong: state.app.selectedLong,
    selectedAl: state.app.selectedAl,
  }),
  (dispatch) => ({
    toggle: () => dispatch(actions.toggleMenu()),
    showParkingList: () => dispatch(actions.showParkingList()),
    hideParkingList: () => dispatch(actions.hideParkingList()),
    onMenuItemSelected: (item) => dispatch(actions.selectMenu(item)),
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
    loadParkingList: () => dispatch(actions.loadParkingList()),
    loadHistoryList: () => dispatch(actions.loadHistoryList()),
    showSearch: ()=> dispatch(actions.showSearch()),
    closeSearch: (name, location )=> dispatch(actions.closeSearch(name, location)),
    selectParkingItem: (selectedLong, selectedAl) => dispatch(actions.selectParkingItem(selectedLong, selectedAl)),
    cancelRequest: () => dispatch(actions.cancelRequest()),
    checkin: ()=> dispatch(actions.checkin()),
    checkout: ()=> dispatch(actions.checkout()),
    findMyVehicle: () => dispatch(actions.findMyVehicle()),
  })
)(App)