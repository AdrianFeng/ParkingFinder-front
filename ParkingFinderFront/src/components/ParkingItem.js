import React, { PropTypes } from 'react'
import TextField from 'react-native-md-textinput';
import { Image, Modal, ScrollView, View, StyleSheet, Text, MapView } from 'react-native';
import Button from 'apsl-react-native-button';

const ParkingItem = (props) => {

  const { longitude, latitude, address, distance , selectParkingItem } = props;
  var region = {
        latitude: parseFloat(latitude),
        longitude: parseFloat(longitude),
        latitudeDelta: parseFloat('0.2f'),
        longitudeDelta: parseFloat('0.2f'),
      };
  var annotation = 
  [{
    longitude: region.longitude,
    latitude: region.latitude,
    view: <Image
            style={{width: 90, height: 65, resizeMode: 'cover'}}
            source={require('./../assets/pin-in-the-map-red.png')}/>,
  }];

  return (
    <View style={styles.mainViewContainer}>
    <MapView
    style={styles.map}
    zoomEnabled={false}
    scrollEnabled ={false}
    region={region}
    annotations={annotation}/>
    <View style={styles.textViewContainer}>
    <Text style={styles.textStyle}>{address}</Text>
    <Text style={styles.textStyle}>{distance}</Text>
    </View>
    <Button
      style={styles.requestStyle} textStyle={styles.requestTextStyle}
      onPress={()=>{selectParkingItem(longitude,latitude)}}>
        Request
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
