import React, { PropTypes } from 'react'
import { StyleSheet, Text, TouchableOpacity, Modal, View } from 'react-native';

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
    }
});

const MyInfo = (props) => {
  const { visible, requestClose } = props

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