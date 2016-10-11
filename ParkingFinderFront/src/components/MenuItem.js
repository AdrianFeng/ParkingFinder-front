import React, { PropTypes } from 'react'
import { StyleSheet, Text } from 'react-native';

const styles = StyleSheet.create({
  menuitem: {
  	fontSize: 14,
    fontWeight: '300',
    paddingTop: 5,
  }
});

const MenuItem = (props) => {
  const { children, onClick } = props

  return (
    <Text onPress={onClick} style={styles.menuitem}>
        {children}
    </Text>
  )
}

 MenuItem.PropTypes = {
  children: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired
}

export default MenuItem