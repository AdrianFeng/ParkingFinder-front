import React, { PropTypes } from 'react'
import { StyleSheet, Text, Image, View } from 'react-native';

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#6B6B76',
  },
  avatarContainer: {
    marginBottom: 20,
    marginTop: 40,
    marginLeft: 20,
    height: 48,
    flex: 1,
    flexDirection: 'row'
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
  },
  name: {
    color: '#F9F9F9',
    marginLeft: 15,
    marginTop: 15
  },
});

const MenuProfile = (props) => {
  const { children, profileUrl } = props

  return (
    <View style={styles.container}>
    <View style={styles.avatarContainer}>
      <Image
        style={styles.avatar}
        source={{uri: profileUrl}}/>
      <Text style={styles.name}>{children}</Text>
    </View>
    </View> 
  )
}

MenuProfile.PropTypes = {
  children: PropTypes.string.isRequired,
  profileUrl: PropTypes.string.isRequired
}

export default MenuProfile