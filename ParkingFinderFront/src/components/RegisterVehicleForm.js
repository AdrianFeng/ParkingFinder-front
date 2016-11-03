import React, { PropTypes } from 'react'
import TextField from 'react-native-md-textinput';
import { Modal, ScrollView, View, StyleSheet } from 'react-native';
import Button from 'apsl-react-native-button';

const VehicleRegistrationForm = (props) => {

    const { visible, requestClose, onSubmit, onChanged} = props;

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
          <ScrollView>
            <View stlye={{flex: 1}}>
              <View style={styles.formStyle}>
                {textFields}
              </View>
              <View style={styles.buttonGroupStyle}>
                <Button
                  style={styles.submitStyle} textStyle={styles.submitTextStyle}
                  onPress={onSubmit}>
                    Submit
                </Button>
                <Button
                  style={styles.cancelStyle} textStyle={styles.cancelTextStyle}
                  onPress={requestClose}>
                    Cancel
                </Button>
              </View>
            </View>
          </ScrollView>
      </Modal>
    );
};

const styles = StyleSheet.create({
  innerContainer: {
    paddingTop: 20
  },
  formStyle: {
    flex: 5,
    padding: 20,
  },
  buttonGroupStyle: {
    padding: 20,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    bottom: 0,
  },
  submitStyle: {
    padding: 2,
    flex: 1,
    borderColor: 'black',
    backgroundColor: 'white',
    borderRadius: 0,
    borderWidth: 3,
  },
  cancelStyle: {
    padding: 2,
    flex: 1,
    borderColor: 'black',
    backgroundColor: 'black',
    borderRadius: 0,
    borderWidth: 3,
  },
  submitTextStyle: {
    color: 'black',
    fontFamily: 'Avenir',
    fontWeight: 'bold'
  },
  cancelTextStyle: {
    color: 'white',
    fontFamily: 'Avenir',
    fontWeight: 'bold'
  },
});

export default VehicleRegistrationForm
