import * as React from "react";
import { StyleSheet, View, Button } from "react-native";
import { Kinesis } from 'aws-sdk';
import { AWSError } from 'aws-sdk/lib/error'

interface Props {}
interface State {}

const styles: any = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF"
  },
  welcome: {
    fontSize: 20,
    textAlign: "center",
    margin: 10
  },
  instruction: {
    textAlign: "center",
    color: "#333333",
    marginBottom: 5
  }
});

export default class Root extends React.Component<Props, State> {
  private onPressButton() {
    let kinesis = new Kinesis();
    let params = {
      ShardId: 'shardId-000000000000',
      ShardIteratorType: 'LATEST',
      StreamName: 'NativeTest',
    };

    kinesis.getShardIterator(params, (err: AWSError, data: Kinesis.GetShardIteratorOutput) => {
      if (err) {
        console.error(err);
        return
      }

      let shardIterator = data.ShardIterator

      if (shardIterator == null || shardIterator == undefined) {
        return
      }

      let params = {
        ShardIterator: shardIterator,
        Limit: 0
      }
      kinesis.getRecords(params, (err: AWSError, data: Kinesis.GetRecordsOutput) => {
        if (err) {
          console.error(err);
          return;
        }

        console.log(data);
      });
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <Button title="send" onPress={this.onPressButton}/>
      </View>
    );
  }
}
