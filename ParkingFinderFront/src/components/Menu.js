import React, { PropTypes } from 'react'
import { StyleSheet, View, ScrollView, Dimensions } from 'react-native'

import MenuItem from './MenuItem'
import MenuProfile from './MenuProfile'

const window = Dimensions.get('window');

const styles = StyleSheet.create({
  menu: {
    flex: 1,
    width: window.width,
    height: window.height,
    backgroundColor: 'gray',
    padding: 20,
  },
})

const Menu = (props) => {
  const { onItemSelected, userName, userUrl } = props

  return (
    <ScrollView scrollsToTop={false} style={styles.menu}>
        <MenuProfile profileUrl={userUrl}>
        	{userName}
        </MenuProfile>

        <MenuItem onClick={() => onItemSelected('MenuOne')}>
        	MenuOne
        </MenuItem>

         <MenuItem onClick={() => onItemSelected('MenuTwo')}>
        	MenuTwo
        </MenuItem>
    </ScrollView>
  )
}

Menu.propTypes = {
  onItemSelected: PropTypes.func.isRequired,
  userName: PropTypes.string.isRequired,
  userUrl: PropTypes.string.isRequired
}

export default Menu