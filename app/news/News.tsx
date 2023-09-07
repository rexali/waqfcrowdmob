import * as React from 'react';
import {
  StyleSheet,
  View
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { getNews, getNewsData, setStatus } from './newsSlice';
import NewsList from './NewsList';
import SplashScreen from '../../components/common/SplashScreen';
import Constants from 'expo-constants';

export default function News() {
  const mountRef = React.useRef(true);
  const dispatch = useDispatch<any>();

  const news = useSelector(getNews);

  React.useEffect(() => {
    if (mountRef.current) {
      dispatch(getNewsData()).unwrap();
    }
    return () => {
      mountRef.current = false;
    }
  });

  if (!news.length) {
    return <SplashScreen flex={1} />
  }

  return (
    <View style={styles.container}>
      <NewsList newsData={news} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 10,
    marginTop: Constants.statusBarHeight,
  },
});
