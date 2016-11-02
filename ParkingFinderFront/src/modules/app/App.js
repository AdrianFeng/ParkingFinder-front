import React, { PropTypes, Component } from 'react'
import { StyleSheet, View, Text, Image, MapView, TextInput, TouchableOpacity, Dimensions} from 'react-native'
import { connect } from 'react-redux'

import { Menu, MenuButton, MyInfo, History, Help, Settings, } from './../../components'
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
  }
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
    closeModal,
    openModal,
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
        <TouchableOpacity>
          <View style={styles.requestButtonItem}>
            <Text style={styles.requestButton}>AVAILABLE PARKING</Text>
            </View>
        </TouchableOpacity>
          <MyInfo visible={myInfoVisible} requestClose={closeModal} />
          <History visible={historyVisible} requestClose={closeModal} />
          <Help visible={helpVisible} requestClose={closeModal} />
          <Settings visible={settingsVisible} requestClose={closeModal} />
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
  openModal: PropTypes.func.isRequired,
  myInfoVisible: PropTypes.bool.isRequired,
  historyVisible: PropTypes.bool.isRequired,
  helpVisible: PropTypes.bool.isRequired,
  settingsVisible: PropTypes.bool.isRequired,
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
  }),
  (dispatch) => ({
    toggle: () => dispatch(actions.toggleMenu()),
    onMenuItemSelected: (item) => dispatch(actions.selectMenu(item)),
    updateMenuState: (isOpen) => dispatch(actions.updateMenu(isOpen)),
    closeModal: () => dispatch(actions.closeModal()),
    openModal: () => dispatch(actions.openModal()),
  })
)(App)