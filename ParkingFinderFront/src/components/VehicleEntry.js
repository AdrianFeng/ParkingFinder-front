import React, { PropTypes } from 'react'
import { Text, Modal, ScrollView, View, StyleSheet } from 'react-native';
import Button from 'apsl-react-native-button';

const VehicleEntry = (props) => {

    const {
        vehicle,
        activatedVehiclePlate,
    } = props;

    return (
        <View style={styles.mainContainer}>
                <View style={{flex: 0.6, flexDirection: 'column'}}>
                    <View style={{flex: 0.4, justifyContent: 'center', alignItems: 'center', marginTop: 5}}>
                        <Text style={styles.plateText}>
                            {vehicle.plate}
                        </Text>
                    </View>
                    <View style={{flex: 0.6}}>
                        <View style={{flex: 0.5, flexDirection: 'row'}}>
                            <View style={styles.innerTextContainer}>
                                <Text style={styles.innerText}>{vehicle.brand}</Text>
                            </View>
                            <View style={styles.innerTextContainer}>
                                <Text style={styles.innerText}>{vehicle.model}</Text>
                            </View>
                        </View>
                        <View style={{flex: 0.5, flexDirection: 'row'}}>
                            <View style={styles.innerTextContainer}>
                                <Text style={styles.innerText}>{vehicle.color}</Text>
                            </View>
                            <View style={styles.innerTextContainer}>
                                <Text style={styles.innerText}>{vehicle.year}</Text>
                            </View>
                        </View>
                    </View>
                </View>
                <View style={styles.buttonContainer}>
                    <Button
                        style={styles.vehicleActivateButtonStyle} textStyle={styles.vehicleActivateTextStyle}
                        onPress={activatedVehiclePlate}>
                        Activate
                    </Button>
                </View>
        </View>
    );
}

VehicleEntry.propTypes = {
    onEntryPressed: PropTypes.func.isRequired,
    vehicle: PropTypes.object.isRequired,
}

const styles = StyleSheet.create({
    mainContainer: {
        margin: 10,
        height: 120,
        flexDirection: 'column',
        borderRadius: 4,
        borderWidth: 1,
        borderColor: '#6B6B76',
        shadowColor: "#6B6B76",
        shadowOpacity: 0.8,
        shadowRadius: 2,
        shadowOffset: {
            height: 1,
            width: 0
        }
    },
    buttonContainer: {
        flex: 0.4, 
        justifyContent: 'center', 
        alignItems: 'center',
        borderTopWidth: 1,
        borderTopColor: '#B2B2BA',
    },
    vehicleActivateButtonStyle: {
        flex: 1,
        backgroundColor: 'white',
        borderRadius: 0,
        borderWidth: 0,
        marginTop: 10
    },
    vehicleActivateTextStyle: {
        color: '#6B6B76',
        fontFamily: 'Helvetica',
        fontWeight: 'bold'
    },
    plateText: {
        color: '#3A3A48',
        fontFamily: 'Helvetica',
        fontSize: 20,
        fontWeight: 'bold',
        flex: 1
    },
    innerTextContainer: {
        flex: 0.5, 
        justifyContent: 'center', 
        alignItems: 'center',
    },
    innerText: {
        color: '#6B6B76',
        fontFamily: 'Helvetica'
    }
});

export default VehicleEntry
