export const previewBlockContent = (blockContent: unknown, maxLength = 100): string => {
  const block = Array.isArray(blockContent) ? blockContent.find((b) => b._type === 'block') : null

  if (!block?.children) {
    return ''
  }

  const fullText = block.children
    .filter((child: any) => child._type === 'span')
    .map((span: any) => span.text)
    .join('')

  if (fullText.length > maxLength) {
    return `${fullText.slice(0, maxLength)}...`
  }

  return fullText
}
