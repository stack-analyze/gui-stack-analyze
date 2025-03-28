import globals from "globals";
import path from "node:path";
import { fileURLToPath } from "node:url";
import js from "@eslint/js";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
    baseDirectory: __dirname,
    recommendedConfig: js.configs.recommended,
    allConfig: js.configs.all
});

export default [...compat.extends("eslint:recommended"), {
    languageOptions: {
        globals: {
            ...globals.browser,
            ...globals.commonjs,
            ...globals.node,
        },

        ecmaVersion: "latest",
        sourceType: "commonjs",
    },
    
    ignores: ["**/*.mjs"],

    rules: {
        "no-var": "error",
        eqeqeq: "warn",
        "eol-last": "error",
        "spaced-comment": "error",
        "comma-spacing": "error",
        "block-spacing": "error",
        "prefer-const": "error",

        indent: ["error", 2, {
            SwitchCase: 1,
        }],
    },
}];
