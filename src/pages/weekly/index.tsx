import React from "react";
import { Text } from "react-native-paper";
import { View, ScrollView } from "react-native";
import { useMMKVStorage } from "react-native-mmkv-storage";
import useRedaxios from "use-redaxios";
import { dequal as isEqual } from "dequal";
import { AxiosGetHistory, Cache } from "../../types";
import { API_URL } from "../../constants";
import { storage } from "../../storage";

export default function Weekly() {
    const [country] = useMMKVStorage<string>("country", storage, "Global");
    const [cache, setCache] = useMMKVStorage<Cache>("cache", storage, {});

    const onSuccess = (data: AxiosGetHistory) => {
        if (cache && isEqual(data.All, cache[country ?? "null"])) {
            return;
        }

        setCache(prev => ({ ...prev, [country ?? "null"]: data.All }));
    };

    const { data } = useRedaxios<AxiosGetHistory>(
        `${API_URL}/history?country=${country}&status=Confirmed`,
        { onSuccess },
        [country]
    );

    return (
        <View style={{ flex: 1, backgroundColor: "white" }}>
            <Text style={{ textAlign: "center" }}>{country ?? ""}</Text>

            <ScrollView style={{ flex: 1 }}>
                <Text>{JSON.stringify(data ?? cache, null, 2)}</Text>
            </ScrollView>
        </View>
    );
}
