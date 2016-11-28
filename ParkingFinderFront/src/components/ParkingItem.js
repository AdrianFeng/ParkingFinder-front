import React, { PropTypes } from 'react'
import TextField from 'react-native-md-textinput';
import { Image, Modal, ScrollView, View, StyleSheet, Text, Dimensions, TouchableOpacity, Alert } from 'react-native';
import Button from 'apsl-react-native-button';

const window = Dimensions.get('window');

const ParkingItem = (props) => {

  const { plate, longitude, latitude, address, distance , selectParkingItem } = props;

  var mapSrc = 'https://maps.googleapis.com/maps/api/staticmap?center='+latitude+','+longitude+'&zoom=17&size='+window.width+'x140&markers=color:red%7C'+latitude+','+longitude+'&scale=2';

  return (
    <TouchableOpacity style={styles.mainViewContainer} onPress={() => Alert.alert(
            'Confirm',
            'Reserve this parking space',
            [
              {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
              {text: 'OK', onPress: () => selectParkingItem(plate)},
            ]
    )}>
    <Image style={styles.map} resizeMode='contain' source={{uri: mapSrc}} />
    <View style={styles.textViewContainer}>
    <Text style={styles.textAddress}>{address}</Text>
    <Text style={styles.textDistance}>{distance}m</Text>
    </View>
    </TouchableOpacity>
    );


};

const styles = StyleSheet.create({

  mainViewContainer: {
    flex: 1, 
    flexDirection:'column',
    height: 200,
    marginTop: 5,
    marginBottom: 5,
    backgroundColor: 'white',
  },
  textViewContainer: {
    flex: 0.3,
    flexDirection:'column',
    marginLeft: 10,
  },
  map: {
    flex: 0.7,
  },
  textAddress: {
    color: 'black',
    fontFamily: 'Helvetica',
    fontSize: 14,
    marginTop: 10,
  },
  textDistance: {
    color: '#6B6B76',
    fontFamily: 'Helvetica',
    fontSize: 12,
    marginTop: 5,
  },
});

export default ParkingItem
