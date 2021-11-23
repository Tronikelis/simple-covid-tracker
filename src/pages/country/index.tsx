import React, { useEffect, useState, useRef } from "react";
import { useRedaxios } from "use-redaxios";
import { Searchbar } from "react-native-paper";
import { Text, Surface } from "react-native-paper";
import { API_URL } from "../../constants";
import { AxiosGetCases } from "../../types";
import { useMMKVStorage } from "react-native-mmkv-storage";
import { storage } from "../../storage";
import { ScrollView, View } from "react-native";

const filter = (item: string, query: string) =>
    item.toLowerCase().includes(query.toLowerCase());

export default function Country() {
    const [, setCountry] = useMMKVStorage<string>("country", storage, "Global");
    const [countries, setCountries] = useMMKVStorage<string[]>("countries", storage, []);

    const { get } = useRedaxios<AxiosGetCases>(`${API_URL}/cases`);

    const [data, setData] = useState(countries);
    const [query, setQuery] = useState("");

    const listRef = useRef<ScrollView>(null);

    useEffect(() => {
        if ((countries?.length as any) > 1) return;

        get().then(data => {
            const keys = Object.keys(data);
            setCountries(keys);
            setData(keys);
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const onChangeText = (query: string) => {
        setQuery(query);
        setData(countries?.filter(item => filter(item, query)) ?? null);
        listRef.current?.scrollTo({ y: 0, animated: false });
    };
    const onSelect = (idx: number) => {
        setCountry(data?.[idx] ?? "Global");
        setQuery(data?.[idx] ?? "Global");
    };
    
    return (
        <View style={{ flex: 1, flexDirection: "column", backgroundColor: "white" }}>
            <View style={{ padding: 10 }}>
                <Searchbar
                    placeholder="Search countries"
                    value={query}
                    onChangeText={onChangeText}
                />
            </View>

            <ScrollView style={{ flex: 1, flexDirection: "column" }} ref={listRef}>
                {data?.map((value, i) => (
                    <Surface
                        key={i}
                        style={{ elevation: 4, margin: 10, padding: 10 }}
                        onTouchEnd={() => onSelect(i)}
                    >
                        <Text>{value}</Text>
                    </Surface>
                ))}
            </ScrollView>
        </View>
    );
}
