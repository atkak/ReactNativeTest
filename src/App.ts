import { AppRegistry } from 'react-native';
import Root from './root';
// import { AWS } from 'aws-sdk';
const AWS = require('aws-sdk/dist/aws-sdk-react-native');

export default function start() {
  AWS.config.credentials = new AWS.CognitoIdentityCredentials({ IdentityPoolId: 'ap-northeast-1:9494aea9-9873-466b-bb4f-85f52c7a0b02' });
  AWS.config.update({region: 'ap-northeast-1'})
  AppRegistry.registerComponent("ReactNativeTest", () => Root);
}