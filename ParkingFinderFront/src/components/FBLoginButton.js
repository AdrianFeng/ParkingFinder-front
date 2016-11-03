import React, { PropTypes } from 'react'
import { StyleSheet, View } from 'react-native';
const FBSDK = require('react-native-fbsdk');
const {
  LoginButton,
  AccessToken
} = FBSDK;

const FBLoginButton = (props) => {
  const {
      onFBLogin
  } = props;

  return (
      <View style={styles.loginContainer}>
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
          }
        />
      </View>
  );
};

const styles = StyleSheet.create({
    loginContainer: {
        paddingTop: 500,
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        bottom: 0,
    },
});

export default FBLoginButton;
