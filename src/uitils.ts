export function matchPattern(file: string, pattern: string): boolean {
  console.log(`Matching file: ${file} against pattern: ${pattern}`)

  const regexStr =
    '^' +
    pattern
      .trim()
      .replace(/\./g, '\\.')
      .replace(/\*\*/g, '.*')
      .replace(/\*/g, '[^/]*') +
    '$'

  const regex = new RegExp(regexStr)
  return regex.test(file)
}
