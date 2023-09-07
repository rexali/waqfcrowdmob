import {Alert, Share,} from 'react-native';
import { shareWaqf } from '../app/(waqfs)/utils/shareWaqf';

  export const shareCPW = async (id: any, data?:any, dispatch?:any) => {

    try {
      const result = await Share.share({
        message:
          `To partner or donate to Almubarak Waqf Foundation's Cause, Project or Waqf. Visit: https://almubarakwaqf.org/cpw/${id}`
      });

      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
          console.log("Test");
        } else {
          // shared 
          shareWaqf(data,dispatch);
          console.log("shared");
          
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error: any) {
      Alert.alert(error.message);
    }
    
  };

  export const shareLink = async () => {

    try {
      const result = await Share.share({
        message:
          `Almubarak Waqf Foundation. Learn About Waqf & Zakat on AWF!. Visit: https://almubarakwaqf.org/blog`
      });

      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error: any) {
      Alert.alert(error.message);
    }
    
  };