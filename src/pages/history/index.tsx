import React from "react";
import { Layout, Text } from "@ui-kitten/components";
import { SafeAreaView } from "react-native";

export default function History() {
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <Layout style={{ flex: 1 }}>
                <Text>History</Text>
            </Layout>
        </SafeAreaView>
    );
}