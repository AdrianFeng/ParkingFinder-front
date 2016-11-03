import React, { PropTypes } from 'react'
import { View, StyleSheet, Image } from 'react-native';
const FBSDK = require('react-native-fbsdk');
const {
  LoginButton,
  AccessToken
} = FBSDK;

const styles = StyleSheet.create({
  mainViewContainer: {
    flex: 1, 
    flexDirection:'column',
  },
  mainViewLogoContainer: {
    flex: 0.85, 
    alignItems: 'center', 
    flexDirection: 'column', 
    justifyContent: 'center'
  },
  mainIcon: {
    width: 60,
    height: 60,
    marginBottom: 80,
  },
  buttonContainer: {
    flex: 0.15,
    backgroundColor: '#F9F9F9',
    borderTopWidth: 1,
    borderTopColor: '#979797',
    justifyContent: 'center',
    alignItems: 'center',
  }
});

const FBLoginButton = (props) => {
  const {
      onFBLogin
  } = props;

  return (
    <View style={styles.mainViewContainer}>
      <View style={styles.mainViewLogoContainer}>
        <Image style={styles.mainIcon} resizeMode='contain' source={require('./../assets/icon.png')} />
      </View>
      <View style={styles.buttonContainer}>
        <LoginButton
          publishPermissions={["publish_actions"]}
          onLoginFinished={
            (error, result) => {
              if (error) {
                alert("login has error: " + error);
              } else if (result.isCancelled){

              } else {
                AccessToken.getCurrentAccessToken().then(
                  (data) => {
                    onFBLogin(data.accessToken.toString())
                  }
                )
              }
            }
          }/>
      </View>
    </View>
  );
};

export default FBLoginButton;
