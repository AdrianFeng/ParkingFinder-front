import React, { PropTypes } from 'react'
import { View } from 'react-native';
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
      <View>
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

export default FBLoginButton;
