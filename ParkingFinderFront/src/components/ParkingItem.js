import React, { PropTypes } from 'react'
import TextField from 'react-native-md-textinput';
import { Modal, ScrollView, View, StyleSheet, Text, MapView } from 'react-native';
import Button from 'apsl-react-native-button';

const ParkingItem = (props) => {

    const { longtitude, latitude, address, distance , selectItem } = props;

    return (
		<View style={styles.mainViewContainer}>
          <MapView
            style={styles.map}
            showsUserLocation={true}
            followUserLocation={true}/>
		<View style={styles.textViewContainer}>
            <Text style={styles.textStyle}>{address}</Text>
            <Text style={styles.textStyle}>{distance}</Text>
		</View>
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
});

export default ParkingItem
