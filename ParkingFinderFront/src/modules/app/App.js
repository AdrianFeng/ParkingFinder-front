import React, { PropTypes, Component } from 'react'
import { StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'

import { Menu, MenuButton } from './../../components'
import * as actions from './actions'

const SideMenu = require('react-native-side-menu');

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
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
})

const renderMenu = (onMenuItemSelected, name, url) => {
  return (
    <Menu onItemSelected={onMenuItemSelected} userName={name} userUrl={url} />
  )
}

const App = (props) => {
  const {
    onMenuItemSelected,
    name,
    url,
    isOpen,
    updateMenuState,
    selectedItem,
    toggle
  } = props

  return (
      <SideMenu
        menu={renderMenu(onMenuItemSelected, name, url)}
        isOpen={isOpen}
        onChange={(isOpen) => updateMenuState(isOpen)}>
        <View style={styles.container}>
          <Text style={styles.welcome}>
            Welcome to React Native!
          </Text>
          <Text style={styles.instructions}>
            This is a working version of side menu with Redux handling states
          </Text>
          <Text style={styles.instructions}>
            Press Cmd+R to reload,{'\n'}
            Cmd+Control+Z for dev menu
          </Text>
          <Text style={styles.instructions}>
            Current selected menu item is: {selectedItem}
          </Text>
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
  toggle: PropTypes.func.isRequired
}

export default connect(
  (state) => ({
    isOpen: state.app.isOpen,
    selectedItem: state.app.selectedItem,
    name: state.app.name,
    url: state.app.url
  }),
  (dispatch) => ({
    toggle: () => dispatch(actions.toggleMenu()),
    onMenuItemSelected: (item) => dispatch(actions.selectMenu(item)),
    updateMenuState: (isOpen) => dispatch(actions.updateMenu(isOpen)),
  })
)(App)