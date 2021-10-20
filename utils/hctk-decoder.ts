export const decode = (input: string, cedict: Cedict = {}) =>
  /\w+/u.test(input)
    ? ''
    : input
        .split('')
        .map((char) =>
          Object.entries(cedict)
            .find(([key]) => key === char)
            ?.pop(),
        )
        .join('');
