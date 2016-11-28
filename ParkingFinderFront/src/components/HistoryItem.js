import React, { PropTypes } from 'react'
import { Image, Modal, ScrollView, View, StyleSheet, Text, Dimensions } from 'react-native';

const window = Dimensions.get('window');

const HistoryItem = (props) => {

  const { longitude, latitude, address, date } = props;

  var mapSrc = 'https://maps.googleapis.com/maps/api/staticmap?center='+latitude+','+longitude+'&zoom=15&size='+window.width+'x140&markers=color:red%7C'+latitude+','+longitude+'&scale=2';

  return (
    <View style={styles.mainViewContainer}>
    <Image style={styles.map} resizeMode='contain' source={{uri: mapSrc}} />
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
