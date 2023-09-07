import React, { useState, useContext } from 'react';
import { Linking, Platform, } from 'react-native';
import { Menu, MenuItem, MenuDivider } from 'react-native-material-menu';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import * as WebBrowser from 'expo-web-browser';
import { useDispatch } from 'react-redux';
import { signOut } from '../app/(users)/usersSlice';
import { useRouter } from 'expo-router';
import { callSmsEmailUrl } from '../utils/callSmsEmailUrl';
// import * as expoLinking from 'expo-linking';


export default function OverflowMenu() {

  let [visible, setVisible] = useState(); 
  const dispatch = useDispatch<any>();
  const router = useRouter();


  const hideMenu = (bol: any) => {
    setVisible(bol);
  }

  const showMenu = (bol: any) => {
    setVisible(bol);
  }

  const _handleOpenWithLinking = (url: any) => {
    Linking.openURL(url);
  };

  const _handleOpenWithWebBrowser = async (url: any) => {
    try {
      let browserPackage: string | undefined;
      if (Platform.OS === "android") {
        const tabsSupportingBrowsers = await WebBrowser.getCustomTabsSupportingBrowsersAsync();
        browserPackage = tabsSupportingBrowsers?.defaultBrowserPackage;
      }
      await WebBrowser.openBrowserAsync(url, { browserPackage });
      // await WebBrowser.openBrowserAsync(url);
    } catch (error) {
      console.log(error);
    }

  };

  const handleSignOUt = () => {
    const token = null;
    dispatch(signOut(token))
  };

  const _handlePress = (href: any) => {
    // expoLinking.openURL(href);
  };

  return (
    <Menu
      visible={visible}
      anchor={
        <MaterialIcons
          onPress={() => showMenu(true)}
          name="menu"
          size={30}
          style={{ padding: 0, color: 'black', marginRight: 10 }}
        />
      }
      onRequestClose={() => { hideMenu(false) }}
      style={{ padding: 10 }}
    >

      <MenuItem onPress={() => { router.push('/partners') }}>
        Partners
      </MenuItem>

      <MenuItem onPress={() => { router.push('/volunteers') }}>
        Volunteers
      </MenuItem>

      <MenuItem onPress={() => { router.push('/beneficiaries') }}>
        Beneficiaries
      </MenuItem>

      <MenuItem onPress={() => router.push('/helptabs')}>
        Help
      </MenuItem>

      <MenuDivider />

      {/* <MenuItem onPress={async () => await _handleOpenWithWebBrowser("https://almubarakwaqf.org/about-us")}> */}
      <MenuItem onPress={async () => router.push('/abouts')}>
        About
      </MenuItem>

      <MenuItem onPress={() => router.push("/settings")}>
        Settings
      </MenuItem>

      <MenuItem onPress={handleSignOUt} >
        Sign out
      </MenuItem>

      {/* <MenuItem disabled>Disabled Menu Item 2</MenuItem> */}

    </Menu>
  );
}