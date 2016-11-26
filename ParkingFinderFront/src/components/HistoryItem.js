import React, { PropTypes } from 'react'
import { Image, Modal, ScrollView, View, StyleSheet, Text, MapView } from 'react-native';

const HistoryItem = (props) => {

  const { longitude, latitude, address, date } = props;
  var region = {
        latitude: parseFloat(latitude),
        longitude: parseFloat(longitude),
        latitudeDelta: parseFloat('0.2f'),
        longitudeDelta: parseFloat('0.2f'),
      };

  return (
    <View style={styles.mainViewContainer}>
    <MapView
    style={styles.map}
    zoomEnabled={false}
    scrollEnabled ={false}
    region={region}/>
    <View style={styles.textViewContainer}>
    <Text style={styles.textAddress}>{address}</Text>
    <Text style={styles.textDate}>{date}</Text>
    </View>
    </View>
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
  textDate: {
    color: '#6B6B76',
    fontFamily: 'Helvetica',
    fontSize: 12,
    marginTop: 5,
  },
});

export default HistoryItem
