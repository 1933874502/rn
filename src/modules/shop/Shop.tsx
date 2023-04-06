import {StyleSheet, Text, View} from 'react-native';
export default function Shop() {
  return (
    <View style={styles.root}>
      <Text>购物</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    width: '100%',
    height: '100%',
  },
});
