import typescript from "@rollup/plugin-typescript";
import terser from "@rollup/plugin-terser";

export default {
  input: "src/ndit-icons.ts",
  output: {
    file: "dist/ndit-icons.js",
    format: "iife",
    sourcemap: false,
  },
  plugins: [
    typescript({
      tsconfig: "./tsconfig.json",
    }),
    terser({
      format: {
        comments: false,
      },
    }),
  ],
};

