import React, { PropTypes } from 'react'
import TextField from 'react-native-md-textinput';
import { Image, Modal, ScrollView, View, StyleSheet, Text } from 'react-native';
import Button from 'apsl-react-native-button';
import GoogleMap  from 'react-native-maps-google';

const ParkingItem = (props) => {

  const { plate, longitude, latitude, address, distance , selectParkingItem } = props;
  return (
    <View style={styles.mainViewContainer}>
    <GoogleMap
    cameraPosition={{auto: false, latitude: latitude, longitude: longitude, zoom: 15}}
    style={styles.map}
    markers={[
      {
        id: plate,
        latitude: latitude,
        longitude: longitude,
      },
    ]}
      />
    <View style={styles.textViewContainer}>
    <Text style={styles.textStyle}>{address}</Text>
    <Text style={styles.textStyle}>{distance}</Text>
    </View>
    <Button
      style={styles.requestStyle} textStyle={styles.requestTextStyle}
      onPress={()=>{selectParkingItem(plate)}}>
        Reserve
    </Button>
    </View>
    );


};

const styles = StyleSheet.create({

  mainViewContainer: {
    flex: 1, 
    flexDirection:'column',
    height: 200,
    borderWidth: 0.5,
    margin: 5,
    borderColor: '#6B6B76',
    borderBottomLeftRadius: 4,
    borderBottomRightRadius: 4,
  },
  textViewContainer: {
  	flex: 0.2,
  	flexDirection:'row',
  	justifyContent: 'space-around',
    height: 20,
    alignItems: 'center', 
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  map: {
  	flex: 1,
  },
  textStyle: {
    color: '#6B6B76',
    fontFamily: 'Helvetica',
  },
  requestStyle: {
    backgroundColor: '#F5FCFF',
    borderTopColor: '#6B6B76',
    borderBottomColor: '#F5FCFF',
    borderRightColor: '#F5FCFF',
    borderLeftColor: '#F5FCFF',
    borderWidth: 1,
    height: 25,
    paddingTop:5,
    borderRadius:0,
  },
  requestTextStyle: {
    color: '#6B6B76',
    fontFamily: 'Helvetica',
  },
});

export default ParkingItem
