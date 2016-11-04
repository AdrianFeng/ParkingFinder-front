import React, { PropTypes, Component } from 'react'
import { StyleSheet, View, Text, Image, MapView, TextInput, TouchableOpacity, Dimensions,} from 'react-native'
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
    position: 'absolute',
    top:0,
    height: window.height*0.87,
    width:window.width,
    zIndex:0,
  },
  searchBar: {
    position: 'absolute',
    top:25,
    zIndex: 999,
    paddingLeft: 30,
    marginLeft: 55,
    fontSize: 22,
    height: 40,
    width:300,
    flex: 0,
    borderWidth: 2,
    borderColor: '#E4E4E4',
    backgroundColor: '#FFFFFF',
  },
  requestButtonItem: {
    marginTop:window.height*0.87,
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
})

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
        <TextInput
           style={styles.searchBar}
           placeholder="Enter Destination" />
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
              source={require('./../../assets/menu.png')} style={{width: 32, height: 32}} />
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
  })
)(App)