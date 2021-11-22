import React from "react";
import * as eva from "@eva-design/eva";
import { ApplicationProvider } from "@ui-kitten/components";

import App from "./app";

export default function Entry() {
    return (
        <ApplicationProvider {...eva} theme={eva.light}>
            <App />
        </ApplicationProvider>
    );
}
