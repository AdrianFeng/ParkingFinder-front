import React, { PropTypes, Component } from 'react'
import TextField from 'react-native-md-textinput';
import { Modal, ListView, View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import Button from 'apsl-react-native-button';
import HistoryItem from './HistoryItem'

export default class HISTORY extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.loadHistoryList();
  }

  renderRow(dataRow) {
    return (
      <HistoryItem
      address={dataRow.address}
      date={dataRow.date}
      longitude={dataRow.longitude}
      latitude = {dataRow.latitude}/>
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
            <TouchableOpacity
              style={styles.cancel}
              onPress={this.props.requestClose}>
              <Text style={styles.cancelText}>X</Text>
            </TouchableOpacity>
            <Text style={styles.headerText}>HISTORY</Text>
          </View>
      <View style={styles.infoContainer}>
      {this.renderList()}
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
    backgroundColor: '#F9F9F9'
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
  cancel: {
    position: 'absolute',
    left: 20,
    top: 28,
  },
  cancelText: {
    fontFamily: 'Helvetica',
    fontSize: 18,
    fontWeight: 'bold',
  },
  infoContainer: {
    flex: 0.9,
  }
});
