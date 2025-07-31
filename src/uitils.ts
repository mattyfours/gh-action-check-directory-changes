export function matchPattern(file: string, pattern: string): boolean {
  const regexStr =
    '^' +
    pattern
      .replace(/\./g, '\\.')
      .replace(/\*\*/g, '.*')
      .replace(/\*/g, '[^/]*') +
    '$'

  const regex = new RegExp(regexStr)
  return regex.test(file)
}
