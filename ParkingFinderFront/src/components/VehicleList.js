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
            <View style={[styles.container]}>
              <View style={[styles.innerContainer]}>
                <TouchableOpacity
                  onPress={requestClose}>
                  <Text>X</Text>
                </TouchableOpacity>
                <ScrollView>
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
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    innerContainer: {
        paddingTop: 20
    },
    registerStyle: {
        padding: 10,
        flex: 1,
        borderColor: 'black',
        backgroundColor: 'white',
        borderRadius: 0,
        borderWidth: 3,
    },
    registerTextStyle: {
        color: 'black',
        fontFamily: 'Avenir',
        fontWeight: 'bold'
    },
});

export default VehicleList
