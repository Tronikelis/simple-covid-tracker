import React, { useEffect, useState } from "react";
import { SafeAreaView, View } from "react-native";
import { Text, Layout, Autocomplete, AutocompleteItem } from "@ui-kitten/components";
import { useRedaxios } from "use-redaxios";
import { API_URL } from "../../constants";
import { AxiosGetCases } from "../../types";
import { useMMKVStorage } from "react-native-mmkv-storage";
import { storage } from "../../storage";

const filter = (item: string, query: string) =>
    item.toLowerCase().includes(query.toLowerCase());

export default function Country() {
    const [, setCountry] = useMMKVStorage<string>("country", storage, "Global");
    const [countries, setCountries] = useMMKVStorage<string[]>("countries", storage, []);

    const { get } = useRedaxios<AxiosGetCases>(`${API_URL}/cases`);

    const [data, setData] = useState(countries);
    const [query, setQuery] = useState("");

    useEffect(() => {
        if ((countries?.length as any) < 1) return;

        get().then(data => {
            const keys = Object.keys(data);
            setCountries(keys);
            setData(keys);
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const onChangeText = (query: string) => {
        setData(countries?.filter(item => filter(item, query)) ?? null);
        setQuery(query);
    };
    const onSelect = (idx: number) => {
        setCountry(data?.[idx] ?? "Global");
        setQuery(data?.[idx] ?? "Global");
    };

    return (
        <Layout style={{ flex: 1 }}>
            <View
                style={{
                    flex: 1,
                    justifyContent: "flex-start",
                    alignItems: "center",
                    padding: 20,
                }}
            >
                <Autocomplete
                    placeholder="Choose country"
                    onChangeText={onChangeText}
                    onSelect={onSelect}
                    value={query}
                    style={{ width: "100%" }}
                >
                    {data?.map((value, i) => (
                        <AutocompleteItem key={i} title={value} />
                    ))}
                </Autocomplete>
            </View>
        </Layout>
    );
}
