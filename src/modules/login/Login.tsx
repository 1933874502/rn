import React, {useState} from 'react';
import {
  Image,
  LayoutAnimation,
  StyleSheet,
  Text,
  TextInput,
  ToastAndroid,
  View,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import icon_main_logo from '../../assets/icon_main_logo.png';
import icon_unselected from '../../assets/icon_unselected.png';
import {TouchableOpacity} from 'react-native-gesture-handler';
import icon_selected from '../../assets/icon_selected.png';
import icon_arrow from '../../assets/icon_arrow.png';
import icon_wx_small from '../../assets/icon_wx_small.png';
import icon_triangle from '../../assets/icon_triangle.png';
import icon_eye_open from '../../assets/icon_eye_open.png';
import icon_eye_close from '../../assets/icon_eye_close.png';
import icon_exchange from '../../assets/icon_exchange.png';
import icon_wx from '../../assets/icon_wx.png';
import icon_qq from '../../assets/icon_qq.webp';
import icon_close_modal from '../../assets/icon_close_modal.png';
import {loginAction, updateInfos} from '../../stores/modules/UserStore';
import {useAppDispatch} from '../../stores';
import {save} from '../../utils/Storage';

export default function Login() {
  const navagite = useNavigation<StackNavigationProp<any>>();
  const [loginType, setLoginType] = useState<'quick' | 'input'>('quick');
  const [check, setCheck] = useState<boolean>(false);
  const [eyeOpen, setEyeOpen] = useState<boolean>(false);
  const [phone, setPhone] = useState<string>('');
  const [pwd, setPwd] = useState<string>('');
  const dispatch = useAppDispatch();
  const onLoginPress = async () => {
    const canLogin = phone.length === 11 && pwd.length === 6;

    if (!canLogin) return;
    dispatch(loginAction({name: phone, pwd: pwd})).then(action => {
      const {data} = action.payload as any;
      if (data) {
        dispatch(updateInfos(data));
        save('userInfo', JSON.stringify(data));
        navagite.replace('HomeTab');
      } else {
        ToastAndroid.show('登录失败，请检查用户名和密码', ToastAndroid.LONG);
      }
    });
    // UserStore.requestLogin(phone, pwd, (success: boolean) => {
    //   if (success) {
    //     navagite.replace('HomeTab');
    //   } else {
    //     ToastAndroid.show('登录失败，请检查用户名和密码', ToastAndroid.LONG);
    //   }
    // });
  };
  const renderQuickLogin = () => {
    const styles = StyleSheet.create({
      root: {
        width: '100%',
        height: '100%',
        flexDirection: 'column-reverse',
        alignItems: 'center',
        paddingHorizontal: 10,
      },
      protocolLatout: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: 100,
        marginBottom: 40,
      },
      radioButton: {
        width: 20,
        height: 20,
      },
      lableTxt: {
        fontSize: 15,
        color: '#999',
        marginLeft: 6,
      },
      otherLoginButton: {
        flexDirection: 'row',
        paddingHorizontal: 20,
        paddingVertical: 10,
        marginBottom: 100,
      },
      otherLoginTxt: {
        fontSize: 16,
        color: '#303080',
      },
      icon_arrow: {
        width: 18,
        height: 18,
        marginTop: 2,
        marginLeft: 6,
        transform: [{rotate: '180deg'}],
      },
      wxLoginButton: {
        width: '100%',
        height: 56,
        backgroundColor: '#05c160',
        borderRadius: 28,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        marginBottom: 20,
      },
      icon_wx: {
        width: 40,
        height: 40,
      },
      wxLoginTxt: {
        fontSize: 18,
        color: 'white',
        marginRight: 100,
        marginLeft: 6,
      },
      singleLoginButton: {
        width: '100%',
        height: 56,
        backgroundColor: '#ff2442',
        borderRadius: 28,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        marginBottom: 20,
        paddingHorizontal: 20,
      },
      singleLoginTxt: {
        fontSize: 18,
        color: 'white',
        marginRight: 100,
      },
      mainLogo: {
        width: 180,
        height: 90,
        resizeMode: 'contain',
        marginBottom: 120,
      },
    });
    return (
      <View style={styles.root}>
        <View style={styles.protocolLatout}>
          <TouchableOpacity
            onPress={() => {
              setCheck(!check);
            }}>
            <Image
              style={styles.radioButton}
              source={check ? icon_selected : icon_unselected}
            />
          </TouchableOpacity>
          <Text style={styles.lableTxt}>我已阅读并同意《用户协议》</Text>
        </View>
        <TouchableOpacity
          style={styles.otherLoginButton}
          onPress={() => {
            LayoutAnimation.easeInEaseOut();
            setLoginType('input');
          }}>
          <Text style={styles.otherLoginTxt}>其它登录方式</Text>
          <Image style={styles.icon_arrow} source={icon_arrow} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.wxLoginButton} activeOpacity={0.7}>
          <Image style={styles.icon_wx} source={icon_wx_small} />
          <Text style={styles.wxLoginTxt}>微信登录</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.singleLoginButton} activeOpacity={0.7}>
          <Text style={styles.singleLoginTxt}>一键登录</Text>
        </TouchableOpacity>
        <Image style={styles.mainLogo} source={icon_main_logo} />
      </View>
    );
  };
  const renderInputLogin = () => {
    const styles = StyleSheet.create({
      root: {
        width: '100%',
        height: '100%',
        flexDirection: 'column',
        alignItems: 'center',
        paddingHorizontal: 56,
      },
      pwdLogin: {
        fontSize: 28,
        color: '#333',
        fontWeight: 'bold',
        marginTop: 55,
      },
      tip: {
        fontSize: 14,
        color: '#bbb',
        marginTop: 6,
      },
      phoneLayout: {
        width: '100%',
        height: 60,
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomColor: '#ddd',
        borderBottomWidth: 1,
        marginTop: 25,
      },
      pre86: {
        fontSize: 20,
      },
      triangle: {
        width: 12,
        height: 6,
        marginLeft: 6,
      },
      phoneInput: {
        flex: 1,
        height: 64,
        textAlign: 'left',
        textAlignVertical: 'center',
        fontSize: 24,
        color: '#333',
        marginLeft: 16,
      },
      pwdLayout: {
        width: '100%',
        height: 60,
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomColor: '#ddd',
        borderBottomWidth: 1,
        marginTop: 8,
      },
      pwdInput: {
        marginLeft: 0,
        marginRight: 16,
      },
      iconEye: {
        width: 30,
        height: 30,
      },
      changeLayout: {
        width: '100%',
        marginTop: 10,
        alignItems: 'center',
        flexDirection: 'row',
      },
      exchangeIcon: {
        width: 20,
        height: 20,
      },
      codeLoginTxt: {
        flex: 1,
        fontSize: 15,
        color: '#303080',
      },
      forgetPwd: {
        fontSize: 15,
        color: '#303080',
      },
      loginLayout: {
        width: '100%',
        height: 80,
        justifyContent: 'center',
        borderRadius: 28,
        marginTop: 20,
      },
      loginButton: {
        height: 56,
        backgroundColor: '#ff2442',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 28,
        marginTop: 20,
      },
      loginButtonDissable: {
        height: 56,
        backgroundColor: '#dddddd',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 28,
        marginTop: 20,
      },
      loginTxt: {
        fontSize: 20,
        color: 'white',
      },
      wxqqLayout: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 60,
      },
      iconWx: {
        width: 56,
        height: 56,
        marginRight: 60,
      },
      iconQQ: {
        width: 56,
        height: 56,
        marginLeft: 60,
      },
      closeButton: {
        position: 'absolute',
        left: 35,
        top: 25,
      },
      closeImg: {
        width: 30,
        height: 30,
      },
    });
    const canLogin = phone.length === 11 && pwd.length === 6;
    return (
      <View style={styles.root}>
        <Text style={styles.pwdLogin}>密码登录</Text>
        <Text style={styles.tip}>未注册的手机号登录成功后将自动注册</Text>
        <View style={styles.phoneLayout}>
          <Text style={styles.pre86}>+86</Text>
          <Image style={styles.triangle} source={icon_triangle} />
          <TextInput
            style={styles.phoneInput}
            value={phone}
            onChangeText={value => setPhone(value)}
            placeholderTextColor="#bbb"
            placeholder="请输入手机号码"
            autoFocus={false}
            keyboardType="number-pad"
            maxLength={11}
          />
        </View>
        <View style={styles.pwdLayout}>
          <TextInput
            style={[styles.phoneInput, styles.pwdInput]}
            placeholderTextColor="#bbb"
            placeholder="请输入密码"
            autoFocus={false}
            keyboardType="number-pad"
            maxLength={6}
            secureTextEntry={eyeOpen}
            value={pwd}
            onChangeText={value => setPwd(value)}
          />
          <TouchableOpacity
            onPress={() => {
              setEyeOpen(!eyeOpen);
            }}>
            <Image
              style={styles.iconEye}
              source={eyeOpen ? icon_eye_close : icon_eye_open}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.changeLayout}>
          <Image style={styles.exchangeIcon} source={icon_exchange} />
          <Text style={styles.codeLoginTxt}>验证码登录</Text>
          <Text style={styles.forgetPwd}>忘记密码</Text>
        </View>
        <View style={styles.loginLayout}>
          <TouchableOpacity
            style={canLogin ? styles.loginButton : styles.loginButtonDissable}
            activeOpacity={canLogin ? 0.7 : 1}
            onPress={onLoginPress}>
            <Text style={styles.loginTxt}>登录</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.wxqqLayout}>
          <Image style={styles.iconWx} source={icon_wx} />
          <Image style={styles.iconQQ} source={icon_qq} />
        </View>
        <View style={styles.closeButton}>
          <TouchableOpacity
            onPress={() => {
              LayoutAnimation.easeInEaseOut();
              setLoginType('quick');
            }}>
            <Image style={styles.closeImg} source={icon_close_modal} />
          </TouchableOpacity>
        </View>
      </View>
    );
  };
  return (
    <View style={styles.root}>
      {loginType === 'quick' ? renderQuickLogin() : renderInputLogin()}
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    width: '100%',
    height: '100%',
    backgroundColor: 'white',
  },
  logo_main: {
    width: 200,
    height: 110,
    marginTop: 200,
    resizeMode: 'contain',
  },
});
