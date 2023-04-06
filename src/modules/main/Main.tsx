import {
  Dimensions,
  FlatList,
  Image,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {useSelector} from 'react-redux';
import store, {RootState, useAppDispatch} from '../../stores';
import React, {useState} from 'react';
import {useEffect} from 'react';
import {
  listAction,
  updateList,
  updatePage,
  updateRefresh,
} from '../../stores/modules/MainStore';
import icon_heart from '../../assets/icon_heart.png';
import icon_heart_empty from '../../assets/icon_heart_empty.png';
import HomeTab from '../home/HomeTab';
const SIZE = 10;
const {width: SCREEN_WIDTH} = Dimensions.get('window');
function Main() {
  //let refreshing: boolean = true;
  //const page = useSelector((state: RootState) => state.main.page);
  //const mainList = useSelector((state: RootState) => state.main.mainList);
  //const refreshing = useSelector((state: RootState) => state.main.refreshing);
  const dispatch = useAppDispatch();
  //const [refreshing, setrefreshing] = useState(false);
  useEffect(() => {
    console.log(store.getState().main.page);

    dispatch(listAction({page: store.getState().main.page, size: SIZE}));
  }, []);

  const refreshNewData = () => {
    dispatch(updatePage(1));
    dispatch(listAction({page: store.getState().main.page, size: SIZE}));
  };
  const loadMoreData = () => {
    console.log(store.getState().main.page);

    dispatch(listAction({page: store.getState().main.page, size: SIZE}));
    //console.log(store.getState().main.refreshing);
  };

  // store.subscribe(() => {
  //   //console.log('数据变化');
  //   console.log(refreshing);
  // });
  const renderItem = ({item, index}: {item: ArticleSimple; index: number}) => {
    return (
      <View style={styles.item}>
        <Image style={styles.itemImage} source={{uri: item.image}} />
        <Text style={styles.titleTxt}>{item.title}</Text>
        <View style={styles.nameLayout}>
          <Image style={styles.avatarImg} source={{uri: item.avatarUrl}} />
          <Text style={styles.nameTxt}>{item.userName}</Text>
          <Image style={styles.heart} source={icon_heart_empty} />
          <Text style={styles.countTxt}>{item.favoriteCount}</Text>
        </View>
      </View>
    );
  };
  return (
    <View style={styles.root}>
      <FlatList
        contentContainerStyle={styles.content}
        data={store.getState().main.mainList}
        extraData={[store.getState().main.refreshing]}
        renderItem={renderItem}
        numColumns={2}
        refreshing={store.getState().main.refreshing}
        onRefresh={refreshNewData}
        onEndReachedThreshold={0.2}
        onEndReached={loadMoreData}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    width: '100%',
    height: '100%',
    backgroundColor: '#f0f0f0',
  },
  content: {
    paddingTop: 6,
  },
  faltList: {
    width: '100%',
    height: '100%',
  },
  item: {
    width: (SCREEN_WIDTH - 18) >> 1,
    backgroundColor: 'white',
    marginLeft: 6,
    marginBottom: 6,
    borderRadius: 8,
    overflow: 'hidden',
  },
  itemImage: {
    width: '100%',
    height: 250,
    resizeMode: 'cover',
  },
  titleTxt: {
    fontSize: 14,
    color: '#333',
    marginHorizontal: 12,
    marginVertical: 4,
  },
  nameLayout: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  avatarImg: {
    width: 20,
    height: 20,
    resizeMode: 'cover',
    borderRadius: 10,
  },
  nameTxt: {
    fontSize: 12,
    color: '#999',
    marginLeft: 10,
    flex: 1,
  },
  heart: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
  },
  countTxt: {
    fontSize: 14,
    color: '#999',
    marginLeft: 5,
  },
});
export default Main;
