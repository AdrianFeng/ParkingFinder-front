import React, { PropTypes, Component } from 'react'
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete'
import { Modal} from 'react-native';

const homePlace = {description: 'Home', geometry: { location: { lat: 48.8152937, lng: 2.4597668 } }};
const workPlace = {description: 'Work', geometry: { location: { lat: 48.8496818, lng: 2.2940881 } }};

var GoogleAutocomplete = React.createClass({
  render() {
    return (
      <Modal
        animationType='slide'
        visible={this.props.visible}>
        <GooglePlacesAutocomplete
          placeholder='Enter Destination'
          minLength={2} // minimum length of text to search
          autoFocus={false}
          listViewDisplayed='auto'    // true/false/undefined
          fetchDetails={true}
          onPress={(data, details = null) => { // 'details' is provided when fetchDetails = true
            this.props.requestClose(details.name, details.geometry.location);
          }}
          getDefaultValue={() => {
            return ''; // text input default value
          }}
          query={{
            // available options: https://developers.google.com/places/web-service/autocomplete
            key: 'AIzaSyB1WhOjxLjjrhLbEun_XWIA4MtIdA8-C3U',
            language: 'en', // language of the results
            types: 'address', // default: 'geocode'
          }}
          styles={{
            textInputContainer: {
              backgroundColor: 'rgba(0,0,0,0)',
              borderTopWidth: 0,
              borderBottomWidth:0,
              marginTop:15,
            },
            textInput: {
              marginLeft: 20,
              marginRight: 10,
              height: 38,
              color: '#5d5d5d',
              fontSize: 16
            },
            predefinedPlacesDescription: {
              color: '#1faadb'
            },
            z:999,
          }}
          nearbyPlacesAPI='GoogleReverseGeocoding' // Which API to use: GoogleReverseGeocoding or GooglePlacesSearch
          GoogleReverseGeocodingQuery={{
            // available options for GoogleReverseGeocoding API : https://developers.google.com/maps/documentation/geocoding/intro
          }}
          predefinedPlaces={[homePlace, workPlace]}/>
      </Modal>
    );
  }
});

export default GoogleAutocomplete;
