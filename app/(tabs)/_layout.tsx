import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import { Link, Tabs } from 'expo-router';
import { Pressable, useColorScheme, Text } from 'react-native';

import Colors from '../../constants/Colors';
import { useDispatch, useSelector } from 'react-redux';
import { getAuth } from '../(users)/usersSlice';
import { useAuth } from '../../hooks/useAuth';
import { FontAwesome, MaterialCommunityIcons, MaterialIcons, Octicons } from '@expo/vector-icons';
import SplashScreen from '../../components/common/SplashScreen';
import OverflowMenu from '../../components/OverflowMenu';
import SignIn from '../auth/SignIn';
import HeaderLogo from '../../components/HeaderLogo';
import HeaderSearch from '../../components/HeaderSearch';
/**
 * You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
 */
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome5>['name'];
  color: string;
}) {

  return <FontAwesome5 size={28} style={{ marginBottom: -3 }} {...props} />;
}

export default function TabLayout() {

  const colorScheme = useColorScheme();
  const state = useSelector(getAuth);
  const dispatch = useDispatch<any>();

  useAuth(dispatch);

  return <>{

    state.isLoading ? (<SplashScreen flex={1} />

    ) : state.userToken === null ? (
      <>
        <SignIn />
      </>
    ) : (
      // user is sign in
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: Colors['green'].tint
        }}>

        <Tabs.Screen
          name="index"
          options={{
            title: 'Home',
            tabBarIcon: ({ color }) => <TabBarIcon name="donate" color={color} />,
            headerTitleAlign:"center",
            headerRight: () => <OverflowMenu />,
            headerLeft: (props:any) => <HeaderLogo {...props} />,
            headerTitle: (props:any) => <HeaderSearch {...props} />,
          }}
        />

        <Tabs.Screen
          name="message"
          options={{
            title: 'Messages',
            tabBarIcon: ({ color }) => <TabBarIcon name="envelope" color={color} />,
            headerRight: () => (
              <Link href="/(messages)/AddMessage" asChild>
                <Pressable>
                  {({ pressed, }) => (
                    <MaterialCommunityIcons
                      name="plus-circle"
                      size={28}
                      color={Colors[colorScheme ?? 'light'].text}
                      style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
                    />
                  )}
                </Pressable>
              </Link>
            ),
          }}
        />

        <Tabs.Screen
          name="notification"
          options={{
            title: 'Notifications',
            tabBarIcon: ({ color }) => <MaterialIcons name='notifications' size={28} color={color} />,
            headerRight: () => (
              <Link href="/(notifications)/AddNotification" asChild>
                <Pressable>
                  {({ pressed, }) => (
                    <MaterialCommunityIcons
                      name="plus-circle"
                      size={28}
                      color={Colors[colorScheme ?? 'light'].text}
                      style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
                    />
                  )}
                </Pressable>
              </Link>
            ),
          }}
        />

        <Tabs.Screen
          name="waqf"
          options={{
            title: 'Waqfs',
            tabBarIcon: ({ color }) => <Octicons name='project' size={28} color={color} />,
            headerRight: () => (
              <Link href="/(waqfs)/AddWaqf" asChild>
                <Pressable>
                  {({ pressed, }) => (
                    <FontAwesome5
                      name="plus-circle"
                      size={25}
                      color={Colors[colorScheme ?? 'light'].text}
                      style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
                    />
                  )}
                </Pressable>
              </Link>
            ),
          }}
        />

        <Tabs.Screen
          name="profile"
          options={{
            title: 'Profiles',
            tabBarIcon: ({ color }) => <TabBarIcon name="user" color={color} />,
            headerRight: () => (
              <Link href="/EditUser" asChild>
                <Pressable>
                  {({ pressed }) => (
                    <FontAwesome
                      name="pencil-square"
                      size={30}
                      color={Colors[colorScheme ?? 'light'].text}
                      style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
                    />
                  )}
                </Pressable>
              </Link>
            ),
          }}
        />
        <Tabs.Screen
          name="new"
          options={{
            title: 'Posts',
            tabBarIcon: ({ color }) => <TabBarIcon name="info-circle" color={color} />,
            headerRight: () => (
              <Link href="/news/AddPost" asChild>
                <Pressable>
                  {({ pressed }) => (
                    <FontAwesome5
                      name="plus-circle"
                      size={25}
                      color={Colors[colorScheme ?? 'light'].text}
                      style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
                    />
                  )}
                </Pressable>
              </Link>
            ),
          }}
        />
      </Tabs>
    )
  }
  </>
}
