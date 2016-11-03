import React, { PropTypes } from 'react'
import { Text, Modal, ScrollView, View, StyleSheet } from 'react-native';
import Button from 'apsl-react-native-button';

const VehicleEntry = (props) => {

    const {
        vehicle,
        activatedVehiclePlate,
    } = props;

    return (
        <View style={{padding: 10}}>
            <View style={{
                flex:1,
                flexDirection: 'row',
                padding: 10,
                borderRadius: 0,
                borderWidth: 3,
            }}>
                <View style={{flex: 0.8, flexDirection: 'column'}}>
                    <View style={{flex: 0.5}}>
                        <Text style={styles.plateText}>
                            {vehicle.plate}
                        </Text>
                    </View>
                    <View style={{flex: 0.5}}>
                        <View style={{flex: 0.5, flexDirection: 'row'}}>
                            <View style={{flex: 0.5}}>
                                <Text>{vehicle.brand}</Text>
                            </View>
                            <View style={{flex: 0.5}}>
                                <Text>{vehicle.model}</Text>
                            </View>
                        </View>
                        <View style={{flex: 0.5, flexDirection: 'row'}}>
                            <View style={{flex: 0.5}}>
                                <Text>{vehicle.color}</Text>
                            </View>
                            <View style={{flex: 0.5}}>
                                <Text>{vehicle.year}</Text>
                            </View>
                        </View>
                    </View>
                </View>
                <View style={{flex: 0.2, justifyContent: 'center'}}>
                    <Button
                        style={styles.vehicleActivateButtonStyle} textStyle={styles.vehicleActivateTextStyle}
                        onPress={activatedVehiclePlate}>
                        Activate
                    </Button>
                </View>
            </View>
        </View>
    );
}

VehicleEntry.propTypes = {
    onEntryPressed: PropTypes.func.isRequired,
    vehicle: PropTypes.object.isRequired,
}

const styles = StyleSheet.create({
    vehicleActivateButtonStyle: {
        padding: 2,
        flex: 1,
        borderColor: 'black',
        backgroundColor: 'white',
        borderRadius: 0,
        borderWidth: 0,
        width: 65,
        height: 50,
    },
    vehicleActivateTextStyle: {
        color: 'black',
        fontFamily: 'Avenir',
        fontWeight: 'bold'
    },
    plateText: {
        flex: 1,
        fontSize: 20,
        fontWeight: 'bold',
    },
});

export default VehicleEntry
