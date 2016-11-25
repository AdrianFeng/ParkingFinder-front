import React, { PropTypes, Component } from 'react'
import TextField from 'react-native-md-textinput';
import { Modal, ListView, View, StyleSheet, Text } from 'react-native';
import Button from 'apsl-react-native-button';
import ParkingItem from './ParkingItem'
import ProgressBar from './ProgressBar'

export default class AvailableParkingList extends Component {
  constructor(props) {
    super(props);
  }

  renderRow(dataRow) {
    return (
      <ParkingItem
      address={dataRow.address}
      distance={dataRow.distance}
      longitude={dataRow.longitude}
      latitude = {dataRow.latitude}
      plate = {dataRow.plate}
      selectParkingItem={this.props.selectParkingItem}/>
      )
  } 

  renderList() {
    return (
      <ListView 
      style={styles.formContainer}
      dataSource={this.props.dataSource}
      renderRow={this.renderRow.bind(this)} />
      );
  }

  renderIndicator() {
    return (
      <ActivityIndicatorIOS animating={true} color={'#808080'} size={'small'} />
      );
  }

  render() {
    return (
      <Modal
      animationType='slide'
      visible={this.props.visible}>
      <View style={styles.mainViewContainer}>
      <View style={styles.headerContainer}>
      <Text style={styles.headerText}>AVAILABLE PARKING</Text>
      <ProgressBar style={styles.ProgressBarStyle} callback={this.props.loadParkingList}/>
      </View>
      {this.renderList()}
      <View style={styles.footerContainer}>
      <Button
      style={styles.cancelStyle} textStyle={styles.cancelTextStyle}
      onPress={this.props.requestClose}>
      Cancel
      </Button>
      </View>
      </View>
      </Modal>
      );
  }
}

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
  cancelStyle: {
    borderColor: '#6B6B76',
    backgroundColor: '#6B6B76',
    borderRadius: 4,
    borderWidth: 1,
    width: 350,
    marginLeft: 10,
  },
  cancelTextStyle: {
    color: '#F9F9F9',
    fontFamily: 'Helvetica',
  },
  ProgressBarStyle: {
    flex:1,
    marginLeft:10,
    marginRight:10,
    width: 300,
  }
});
