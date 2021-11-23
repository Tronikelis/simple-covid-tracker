import React from "react";
import { Provider as PaperProvider, DefaultTheme } from "react-native-paper";

import App from "./app";

const theme: typeof DefaultTheme = {
    ...DefaultTheme,
    colors: {
        ...DefaultTheme.colors,
        primary: "#2196f3",
        accent: "#212121",
    },
};

export default function Entry() {
    return (
        <PaperProvider theme={theme}>
            <App />
        </PaperProvider>
    );
}
