import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Image, StyleSheet, TouchableOpacity, View} from 'react-native';
import React from 'react';
import Main from '../main/Main';
import Message from '../message/Message';
import Mine from '../mine/Mine';
import Shop from '../shop/Shop';
import icon_tab_home_normal from '../../assets/icon_tab_home_normal.png';
import icon_tab_home_selected from '../../assets/icon_tab_home_selected.png';
import icon_tab_shop_normal from '../../assets/icon_tab_shop_normal.png';
import icon_tab_shop_selected from '../../assets/icon_tab_shop_selected.png';
import icon_tab_message_normal from '../../assets/icon_tab_message_normal.png';
import icon_tab_message_selected from '../../assets/icon_tab_message_selected.png';
import icon_tab_mine_normal from '../../assets/icon_tab_mine_normal.png';
import icon_tab_mine_selected from '../../assets/icon_tab_mine_selected.png';
import icon_tab_publish from '../../assets/icon_tab_publish.png';
import {launchImageLibrary} from 'react-native-image-picker';
const Bottom = createBottomTabNavigator();
export default function HomeTab() {
  const onPublishPress = () => {
    launchImageLibrary(
      {
        mediaType: 'photo',
        quality: 1,
        includeBase64: true,
      },
      res => {
        const {assets} = res;
        if (!assets?.length) {
          console.log('选择图片失败');
          return;
        }
        const {uri, width, height, fileName, fileSize, type} = assets[0];
        console.log(`uri=${uri}`);
      },
    );
  };
  return (
    <View style={styles.root}>
      <Bottom.Navigator
        screenOptions={({route}) => ({
          tabBarActiveTintColor: '#ff2442',
          tabBarInactiveTintColor: '#999',
          tabBarIcon: ({focused, color, size}) => {
            let img;
            if (route.name === 'Main') {
              img = focused ? icon_tab_home_selected : icon_tab_home_normal;
            } else if (route.name === 'Shop') {
              img = focused ? icon_tab_shop_selected : icon_tab_shop_normal;
            } else if (route.name === 'Mine') {
              img = focused ? icon_tab_mine_selected : icon_tab_mine_normal;
            } else if (route.name === 'Message') {
              img = focused
                ? icon_tab_message_selected
                : icon_tab_message_normal;
            } else if (route.name === 'Publish') {
              img = icon_tab_publish;
              return (
                <TouchableOpacity onPress={onPublishPress}>
                  <Image
                    style={{
                      width: 2 * size,
                      height: 2 * size,
                      marginTop: 10,
                      resizeMode: 'contain',
                    }}
                    source={img}
                  />
                </TouchableOpacity>
              );
            }
            return (
              <Image
                style={{width: size, height: size, tintColor: color}}
                source={img}
              />
            );
          },
        })}>
        <Bottom.Screen name="Main" component={Main} options={{title: '首页'}} />
        <Bottom.Screen name="Shop" component={Shop} options={{title: '购物'}} />
        <Bottom.Screen name="Publish" component={Shop} options={{title: ''}} />
        <Bottom.Screen
          name="Message"
          component={Message}
          options={{title: '消息'}}
        />
        <Bottom.Screen name="Mine" component={Mine} options={{title: '我'}} />
      </Bottom.Navigator>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    width: '100%',
    height: '100%',
  },
});
