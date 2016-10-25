import React, { PropTypes } from 'react'
import { StyleSheet, View, Dimensions, Image, Text, TouchableOpacity } from 'react-native'

import MenuProfile from './MenuProfile'

const window = Dimensions.get('window');

const styles = StyleSheet.create({
  menu: {
    width: window.width,
    height: window.height,
    backgroundColor: '#F9F9F9',
  },
  menuIcon: {
    width: 12,
    height: 12,
    marginLeft: 20,
    paddingRight: 20,
    marginTop: 3
  },
  menuItem: {
    flex: 1,
    flexDirection: 'row',
    paddingTop: 10,
    paddingBottom: 10,
  },
  menuItemText: {
    fontSize: 16,
    fontWeight: '300',
    color: '#6B6B76',
  }
})

const Menu = (props) => {
  const { onItemSelected, userName, userUrl, popupModal } = props

  return (
    <View scrollsToTop={false} style={styles.menu}>
        <MenuProfile profileUrl={userUrl}>
        	{userName}
        </MenuProfile>

        <TouchableOpacity onPress={() => {onItemSelected('MY INFO'), popupModal()}}>
          <View style={styles.menuItem}>
            <Image style={styles.menuIcon} resizeMode='contain' source={require('./../assets/menuHome.png')} />
            <Text style={styles.menuItemText}>MY INFO</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => {onItemSelected('HISTORY'), popupModal()}}>
          <View style={styles.menuItem} onPress={() => onItemSelected('HISTORY')}>
            <Image style={styles.menuIcon} resizeMode='contain' source={require('./../assets/menuHistory.png')} />
            <Text style={styles.menuItemText}>HISTORY</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => {onItemSelected('HELP'), popupModal()}}>
          <View style={styles.menuItem} onPress={() => onItemSelected('HELP')}>
            <Image style={styles.menuIcon} resizeMode='contain' source={require('./../assets/menuHelp.png')} />
            <Text style={styles.menuItemText}>HELP</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => {onItemSelected('SETTINGS'), popupModal()}}>
          <View style={styles.menuItem} onPress={() => onItemSelected('SETTINGS')}>
            <Image style={styles.menuIcon} resizeMode='contain' source={require('./../assets/menuSetting.png')} />
            <Text style={styles.menuItemText}>SETTINGS</Text>
          </View>
        </TouchableOpacity>

    </View>
  )
}

Menu.propTypes = {
  onItemSelected: PropTypes.func.isRequired,
  userName: PropTypes.string.isRequired,
  userUrl: PropTypes.string.isRequired,
  popupModal: PropTypes.func.isRequired,
}

export default Menu