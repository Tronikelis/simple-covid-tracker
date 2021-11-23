import React, { useState } from "react";
import { View, ScrollView, ActivityIndicator } from "react-native";
import { Text, Surface, Button } from "react-native-paper";
import { useMMKVStorage } from "react-native-mmkv-storage";
import useRedaxios from "use-redaxios";
import { dequal as isEqual } from "dequal";
import { AxiosGetHistory } from "../../types";
import { API_URL } from "../../constants";
import { storage } from "../../storage";

export default function Weekly() {
    const [country] = useMMKVStorage<string>("country", storage, "Global");
    const [cache, setCache] = useMMKVStorage<AxiosGetHistory>("cache", storage, null);

    const [index, setIndex] = useState(10);

    const onSuccess = (data: AxiosGetHistory) => {
        if (isEqual(data, cache)) return;
        setCache(data);
    };

    const { fetching } = useRedaxios<AxiosGetHistory>(
        `${API_URL}/history?country=${country}&status=Confirmed`,
        { onSuccess },
        [country]
    );

    return (
        <View
            style={{
                flex: 1,
                backgroundColor: "white",
                flexDirection: "column",
                display: "flex",
            }}
        >
            <View
                style={{
                    display: "flex",
                    justifyContent: "space-around",
                    alignItems: "center",
                    width: "100%",
                    flexDirection: "row",
                }}
            >
                <Text style={{ fontSize: 40, fontWeight: "900" }}>{country}</Text>
                {fetching && <ActivityIndicator size="small" color="#212121" />}
            </View>

            <ScrollView
                contentContainerStyle={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    flexDirection: "row",
                    flexWrap: "wrap",
                }}
            >
                {cache &&
                    Object.keys(cache.All.dates)
                        .slice(0, index)
                        .map((value, i) => (
                            <Surface
                                key={i}
                                style={{
                                    padding: 10,
                                    paddingHorizontal: 20,
                                    margin: 10,
                                    elevation: 4,
                                }}
                            >
                                <Text style={{ fontSize: 15, fontWeight: "600" }}>
                                    {value}
                                </Text>
                                <Text style={{ fontSize: 15, color: "red" }}>
                                    {"+ "}
                                    {cache.All.dates[value] -
                                        cache.All.dates[Object.keys(cache.All.dates)[i + 1]]}
                                </Text>
                            </Surface>
                        ))}
                
            </ScrollView>
        </View>
    );
}
