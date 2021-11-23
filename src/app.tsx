import React, { useState } from "react";
import { useWindowDimensions } from "react-native";
import { register } from "react-native-bundle-splitter";
import { TabView, SceneMap, TabBar } from "react-native-tab-view";

const Weekly = register({ loader: () => import("./pages/weekly") });
const History = register({ loader: () => import("./pages/history") });
const Country = register({ loader: () => import("./pages/country") });

const renderScene = SceneMap({
    Weekly,
    History,
    Country,
});

const renderTabBar = (props: any) => (
    <TabBar
        {...props}
        indicatorStyle={{ backgroundColor: "#2196f3" }}
        style={{ backgroundColor: "#212121" }}
    />
);

export default function App() {
    const { width } = useWindowDimensions();

    const [index, setIndex] = useState(0);
    const [routes] = useState([
        { key: "Weekly", title: "Weekly" },
        { key: "History", title: "History" },
        { key: "Country", title: "Country" },
    ]);

    return (
        <TabView
            renderTabBar={renderTabBar}
            renderScene={renderScene}
            navigationState={{ index, routes }}
            onIndexChange={setIndex}
            initialLayout={{ width }}
            tabBarPosition="bottom"
        />
    );
}
