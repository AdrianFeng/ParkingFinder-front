import React, { PropTypes, Component } from 'react'
import { StyleSheet, TouchableWithoutFeedback, PixelRatio, View, Text, Image, MapView, TextInput, TouchableOpacity, Dimensions,} from 'react-native'
import { connect } from 'react-redux'

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
    marginTop:50,
    height: window.height*0.6,
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
    height:50,
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
    user,
    form,
    searchVisible,
    showSearch,
    closeSearch,
    destination,
    location,
  } = props;

  if (!accessToken) {
    LoginManager.logOut();
    return (<FBLoginButton onFBLogin={onFBLogin}/>);

  }

  if (user && !user.activated) {
    // user have to activate current using vehicle
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
        <TextInput
           style={styles.searchBar}
           placeholder="Enter Destination" />
           <Mask visible={isOpen}/>           
          <MapView
            style={styles.map}
            showsUserLocation={true}
            followUserLocation={true}/>
        <TouchableOpacity style={styles.requestButtonItem} onPress={showParkingList}>
            <Text style={styles.requestButton}>AVAILABLE PARKING</Text>
        </TouchableOpacity>
            <MyInfo visible={myInfoVisible} requestClose={closeModal} />
            <History visible={historyVisible} requestClose={closeModal} />
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
                 dataSource={dataSource}/>
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
    searchVisible: state.app.searchVisible,
    destination: state.app.destination,
    location: state.app.location,
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
    showSearch: ()=> dispatch(actions.showSearch()),
    closeSearch: (name, location )=> dispatch(actions.closeSearch(name, location)),
  })
)(App)