import {StyleSheet, Text, View} from 'react-native';
export default function Message() {
  return (
    <View style={styles.root}>
      <Text>消息</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    width: '100%',
    height: '100%',
  },
});
