import devConfig from "./development";
import prodConfig from "./production";

let config = {};
/* eslint-disable */
if (process.env.NODE_ENV !== "production") {
    config = {
        ...devConfig
    };
} else {
    config = {
        ...prodConfig
    };
}

export default config;
