import React, { PropTypes } from 'react'
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

const styles = StyleSheet.create({
  button: {
    position: 'absolute',
    top: 20,
    padding: 10,
  },
});

const MenuButton = (props) => {
  const { children, onClick } = props

  return (
    <TouchableOpacity
      onPress={onClick}
      style={styles.button}>
      <Text>{children}</Text>
    </TouchableOpacity>
  )
}

MenuButton.PropTypes = {
  children: PropTypes.string,
  onClick: PropTypes.func.isRequired
}

export default MenuButton