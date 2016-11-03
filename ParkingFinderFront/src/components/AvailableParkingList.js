import React, { PropTypes } from 'react'
import TextField from 'react-native-md-textinput';
import { Modal, ScrollView, View, StyleSheet, Text } from 'react-native';
import Button from 'apsl-react-native-button';

const AvailableParkingList = (props) => {

    const { visible, requestClose, } = props;

    const fields = [
      'Brand',
      'Model',
      'Color',
      'Year',
      'Plate'
    ];
    const textFields = fields.map((field, index) =>
        <TextField
            key={index}
            label={field}
            highlightColor={'#00BCD4'}
            onChangeText={
              (text) => (onChanged(field, text))
            }/>
    );

    return (
      <Modal
        animationType='slide'
        visible={visible}>
        <View style={styles.mainViewContainer}>
          <View style={styles.headerContainer}>
            <Text style={styles.headerText}>AVAILABLE PARKING</Text>
          </View>
          <ScrollView style={styles.formContainer}>
          </ScrollView>
          <View style={styles.footerContainer}>
          <View style={styles.buttonGroupStyle}>
            <Button
              style={styles.cancelStyle} textStyle={styles.cancelTextStyle}
              onPress={requestClose}>
                Cancel
            </Button>
          </View>
          </View>
        </View>
      </Modal>
    );
};

const styles = StyleSheet.create({
  mainViewContainer: {
    flex: 1, 
    flexDirection:'column',
  },
  headerContainer: {
    flex: 0.1,
    backgroundColor: '#F9F9F9',
    borderBottomWidth: 1,
    borderBottomColor: '#B2B2BA',
    alignItems: 'center', 
    flexDirection: 'column', 
    justifyContent: 'center'
  },
  formContainer: {
    flex: 0.75,
  },
  footerContainer: {
    flex: 0.15,
    backgroundColor: '#F9F9F9',
    borderTopWidth: 1,
    borderTopColor: '#B2B2BA',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerText: {
    fontFamily: 'Helvetica',
    fontSize: 18,
    fontWeight: '200',
    marginTop: 15
  },
  innerContainer: {
    paddingTop: 20
  },
  formStyle: {
    padding: 20,
  },
  buttonGroupStyle: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  cancelStyle: {
    borderColor: '#6B6B76',
    backgroundColor: '#6B6B76',
    borderRadius: 4,
    borderWidth: 1,
    width: 350,
    marginLeft: 5,
  },
  submitTextStyle: {
    color: '#6B6B76',
    fontFamily: 'Helvetica',
  },
  cancelTextStyle: {
    color: '#F9F9F9',
    fontFamily: 'Helvetica',
  },
});

export default AvailableParkingList