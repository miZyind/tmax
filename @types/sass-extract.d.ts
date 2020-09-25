declare module 'sass-extract' {
  interface CompileOptions {
    file: string;
  }
  interface ExtenstionOptions {
    plugins: string[];
  }
  interface Rendered {
    vars: {
      global: {
        [key: string]: { value: string };
      };
    };
  }

  export function renderSync(
    opt: CompileOptions,
    extOpt: ExtenstionOptions,
  ): Rendered;
}
