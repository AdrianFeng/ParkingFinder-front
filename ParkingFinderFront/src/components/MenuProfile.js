import React, { PropTypes } from 'react'
import { StyleSheet, Text, Image, View } from 'react-native';

const styles = StyleSheet.create({
  avatarContainer: {
    marginBottom: 20,
    marginTop: 20,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    flex: 1,
  },
  name: {
    position: 'absolute',
    left: 70,
    top: 20,
  },
});

const MenuProfile = (props) => {
  const { children, profileUrl } = props

  return (
    <View style={styles.avatarContainer}>
      <Image
        style={styles.avatar}
        source={{uri: profileUrl}}/>
      <Text style={styles.name}>{children}</Text>
    </View>
  )
}

MenuProfile.PropTypes = {
  children: PropTypes.string.isRequired,
  profileUrl: PropTypes.string.isRequired
}

export default MenuProfile