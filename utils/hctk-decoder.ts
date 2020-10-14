export function decode(input: string, cedict: Cedict) {
  if (/\w+/u.test(input)) {
    return '';
  }

  return input
    .split('')
    .map((char) =>
      Object.entries(cedict)
        .find(([key]) => key === char)
        ?.pop(),
    )
    .join('');
}
