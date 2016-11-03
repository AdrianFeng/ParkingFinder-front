import React, { PropTypes } from 'react';
import { TouchableOpacity, Text, Modal, ScrollView, View, StyleSheet } from 'react-native';
import VehicleEntry from  './VehicleEntry';
import Button from 'apsl-react-native-button';

const VehicleList = (props) => {

    const { visible, requestClose,  vehicles, onEntryClicked, onClicked } = props;
    const _vehicles = vehicles || [];

    let components = [];
    if (vehicles) {
        components = _vehicles.map((vehicle) => (
            <View key = {vehicle.plate}>
                <VehicleEntry vehicle={vehicle} onEntryPressed={() => onEntryClicked(vehicle)}/>
            </View>
        ))
    }
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
                <Text style={styles.headerText}>YOUR VEHICLES</Text>
              </View>
              <ScrollView style={styles.infoContainer}>
                {components}
                <View style={{padding:10}}>
                    <Button
                      style={styles.registerStyle} textStyle={styles.registerTextStyle}
                      onPress={onClicked}>
                      Register New Vehicle
                    </Button>
                </View>
              </ScrollView>
          </View>
        </Modal>
    );
};

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
    innerContainer: {
        paddingTop: 20
    },
    registerStyle: {
        padding: 10,
        flex: 1,
        borderColor: '#6B6B76',
        backgroundColor: '#6B6B76',
        borderRadius: 4,
        borderWidth: 1,
    },
    registerTextStyle: {
        color: 'white',
        fontFamily: 'Helvetica',
        fontWeight: 'bold'
    },
});

export default VehicleList
