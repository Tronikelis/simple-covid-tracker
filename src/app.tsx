import React from "react";
import { BottomNavigation, BottomNavigationTab } from "@ui-kitten/components";
import { BottomTabBarProps, createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";

import { Country, History, Weekly } from "./pages";

const Stack = createBottomTabNavigator();

const BottomTabBar = ({ navigation, state }: BottomTabBarProps) => (
    <BottomNavigation
        selectedIndex={state.index}
        onSelect={index => navigation.navigate(state.routeNames[index])}
    >
        <BottomNavigationTab title="Weekly" />
        <BottomNavigationTab title="History" />
        <BottomNavigationTab title="Country" />
    </BottomNavigation>
);

export default function Navigation() {
    return (
        <NavigationContainer>
            <Stack.Navigator tabBar={props => <BottomTabBar {...props} />}>
                <Stack.Screen name="Weekly" component={Weekly} />
                <Stack.Screen name="History" component={History} />
                <Stack.Screen name="Country" component={Country} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}
