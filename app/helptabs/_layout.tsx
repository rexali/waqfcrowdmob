import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import Colors from '../../constants/Colors';

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: 'index',

};

const HelpLayout = () => {

  return (
    <Tabs  screenOptions={{
      tabBarActiveTintColor: Colors['green'].tint
    }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Questions & Answers',
          headerTitleAlign: "center",
          tabBarIcon: ({ color }) => <MaterialCommunityIcons name="email" color={color} size={28} />,
          // headerRight: ({pressColor}) => <MaterialCommunityIcons name="plus-circle" color={pressColor} style={{marginRight:10}}  size={28}/>,
        }}
      />

      <Tabs.Screen
        name="AddHelp"
        options={{
          title: 'Add Question & Answer',
          headerTitleAlign: "center",
          tabBarIcon: ({ color }) => <MaterialCommunityIcons name="plus" color={color} size={28} />,
          // headerRight: ({pressColor}) => <MaterialCommunityIcons name="map" color={pressColor} style={{marginRight:10}} size={28}/>,
        }}
      />

    </Tabs>
  )
}

export default HelpLayout;