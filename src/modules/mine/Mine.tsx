import {StyleSheet, Text, View} from 'react-native';
export default function Mine() {
  return (
    <View style={styles.root}>
      <Text>我</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    width: '100%',
    height: '100%',
  },
});
