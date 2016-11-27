import React, { PropTypes } from 'react'
import { StyleSheet, Text, TouchableOpacity, Modal, View, Image, Dimensions } from 'react-native';
const window = Dimensions.get('window');

const styles = StyleSheet.create({
    mainViewContainer: {
      flex: 1, 
      flexDirection:'column',
    },
    headerContainer: {
      flex: 0.1,
      backgroundColor: '#F9F9F9',
      borderBottomWidth: 1,
      borderBottomColor: '#B2B2BA',
      alignItems: 'center', 
      flexDirection: 'row', 
      justifyContent: 'center',
    },
    headerText: {
      fontFamily: 'Helvetica',
      fontSize: 18,
      fontWeight: '200',
      marginTop: 15
    },
    cancel: {
      position: 'absolute',
      left: 20,
      top: 28,
    },
    cancelText: {
      fontFamily: 'Helvetica',
      fontSize: 18,
      fontWeight: 'bold',
    },
    infoContainer: {
      flex: 0.9,
      flexDirection: 'column',
    },
    avatarContainer: {
      marginTop: 40,
      marginLeft: 25,
      height: 96,
    },
    avatar: {
      width: 96,
      height: 96,
      borderRadius: 48,
    },
    name: {
      marginLeft: 30,
      color: 'black',
      marginTop: 10,
      fontSize: 16,
      fontWeight: 'bold',
    },
    nameItem: {
      marginLeft: 30,
      color: '#B2B2BA',
      fontSize: 14,

    },
    nameContainer: {
      marginTop: 40,
      flexDirection: 'row',
      width: window.width,
    },
    innerContainer: {
      flexDirection: 'column',
      width: window.width*0.5,
    },
    emailContainer: {
      marginTop: 30,
      flexDirection: 'column',
      width: window.width,
    }
});

const MyInfo = (props) => {
  const { visible, requestClose, profileUrl, firstName, lastName, email } = props

  return (
    <Modal
      animationType='slide'
      visible={visible}>
        <View style={styles.mainViewContainer}>
          <View style={styles.headerContainer}>
            <TouchableOpacity
              style={styles.cancel}
              onPress={requestClose}>
              <Text style={styles.cancelText}>X</Text>
            </TouchableOpacity>
            <Text style={styles.headerText}>MY ACCOUNT</Text>
          </View>
          <View style={styles.infoContainer}>
            <View style={styles.avatarContainer}>
              <Image
                style={styles.avatar}
                source={{uri: profileUrl}}/>
            </View>
            <View style={styles.nameContainer}>
              <View style={styles.innerContainer}>
                <Text style={styles.nameItem}>First</Text>
                <Text style={styles.name}>{firstName}</Text>
              </View>
              <View style={styles.innerContainer}>
                <Text style={styles.nameItem}>Last</Text>
                <Text style={styles.name}>{lastName}</Text>
              </View>
            </View>
            <View style={styles.emailContainer}>
                <Text style={styles.nameItem}>Email</Text>
                <Text style={styles.name}>{email}</Text>
            </View>
          </View>
      </View>
    </Modal>
  )
};

MyInfo.PropTypes = {
  visible: PropTypes.bool.isRequired,
  requestClose: PropTypes.func,
};

export default MyInfo