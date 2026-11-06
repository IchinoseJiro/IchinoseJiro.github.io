// Syntax highlighting for comments, strings, keywords, and punctuation.
const codeTokenPattern =
  /\/\/[^^\n]*|\/\*[\s\S]*?\*\/|'(?:\\.|[^'\\])*'|"(?:\\.|[^"\\])*"|`(?:\\.|[^`\\])*`|\b\d+(?:\.\d+)?\b|\b[A-Za-z_$][\w$]*\b|[{}()[\].,:;]|=>|[=+*/<>!-]+/g
const codeKeywords = new Set([
  'const',
  'let',
  'var',
  'function',
  'return',
  'export',
  'default',
  'import',
  'from',
  'if',
  'else',
  'new',
  'true',
  'false',
  'null',
  'undefined',
  'async',
  'await',
])
export default function highlightCode(source) {
  const nodes = []
  let position = 0
  let key = 0
  for (const match of source.matchAll(codeTokenPattern)) {
    const token = match[0]
    const start = match.index
    if (start > position) nodes.push(source.slice(position, start))
    const kind =
      token.startsWith('//') || token.startsWith('/*')
        ? 'comment'
        : /^['"`]/.test(token)
          ? 'string'
          : codeKeywords.has(token)
            ? 'keyword'
            : /^\d/.test(token)
              ? 'number'
              : /^[A-Za-z_$]/.test(token)
                ? 'identifier'
                : 'punctuation'
    nodes.push(
      <span className={`syntax-${kind}`} key={key++}>
        {token}
      </span>,
    )
    position = start + token.length
  }
  if (position < source.length) nodes.push(source.slice(position))
  return nodes
}
