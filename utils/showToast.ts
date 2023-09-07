import Toast from 'react-native-simple-toast';

function showToast(message: any, duration?: any, styles?: any) {
        Toast.showWithGravity(message, duration ?? Toast.LONG, Toast.BOTTOM, styles ?? { backgroundColor: 'blue',width: '300px'});
}
export {
    showToast
}