import React, {useEffect} from 'react';
import {Image, StyleSheet, View} from 'react-native';
import icon_main_logo from '../../assets/icon_main_logo.png';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {load} from '../../utils/Storage';
export default function Welcome() {
  const navagite = useNavigation<StackNavigationProp<any>>();
  useEffect(() => {
    setTimeout(() => {
      getUserInfo();
    }, 3000);
  });
  const getUserInfo = async () => {
    const cacheUserInfo = await load('userInfo');
    if (cacheUserInfo && JSON.parse(cacheUserInfo)) {
      navagite.replace('HomeTab');
    } else {
      navagite.replace('Login');
    }
  };
  return (
    <View style={styles.root}>
      <Image style={styles.logo_main} source={icon_main_logo} />
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    width: '100%',
    height: '100%',
    backgroundColor: 'white',
    flexDirection: 'column',
    alignItems: 'center',
  },
  logo_main: {
    width: 200,
    height: 110,
    marginTop: 200,
    resizeMode: 'contain',
  },
});
