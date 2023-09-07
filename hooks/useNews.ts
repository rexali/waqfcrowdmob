import {useEffect} from 'react';
import { getNewsData } from '../app/news/newsSlice';

export const useNews = (dispatch:any) => {

  useEffect(() => {
      dispatch(getNewsData())
  }, []);

  return;
};
