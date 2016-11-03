import React, { PropTypes, Component } from 'react'
import { StyleSheet, View, Text, Image, MapView, TextInput, TouchableOpacity, Dimensions, NavigatorIOS,} from 'react-native'
import { connect } from 'react-redux'

import { Menu, MenuButton, MyInfo, History, Help, Settings, AvailableParkingList} from './../../components'
import * as actions from './actions'

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

class EmptyPage extends React.Component {
  render() {
    return (
      <View style={styles.emptyPage}>
        <Text style={styles.emptyPageText}>
          {this.props.text}
        </Text>
      </View>
    );
  }
}

class NavigatorIOSExample extends React.Component {
  render() {
    const {onExampleExit} = this.props;
    return (
      <NavigatorIOS
        style={styles.container}
        initialRoute={{
          title: 'Share Ur Parking',
          component: App,
          passProps: {
            text: 'This is a empty page',
          },
        }}
        tintColor="#008888"/>
    );
  }
}

  gotoAvailableParking = props =>  {
     this.props.navigator.push({
              title: 'AVAILABLE PARKING',
              component: EmptyPage,
            });
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
    AvailabeParkingListVisible,
    closeModal,
    openModal,
    onAvailabeParkingClicked,
    showParkingList,
    hideParkingList,
    loadParkingList,
    dataSource,
  } = props

  return (
      <SideMenu
        menu={<Menu onItemSelected={onMenuItemSelected} userName={name} userUrl={url} popupModal={openModal}/>}
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
  )
  

}

App.displayName = 'App'

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
  myInfoVisible: PropTypes.bool.isRequired,
  historyVisible: PropTypes.bool.isRequired,
  helpVisible: PropTypes.bool.isRequired,
  settingsVisible: PropTypes.bool.isRequired,
  AvailabeParkingListVisible: PropTypes.bool.isRequired,
  loadParkingList: PropTypes.func.isRequired,
}

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
    loadParkingList: () => dispatch(actions.loadParkingList()),
  })
)(App)