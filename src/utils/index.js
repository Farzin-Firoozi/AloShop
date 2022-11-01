export function formatPrice(num) {
  return '$' + num.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
}

export const generateUniqueID = () => {
  return (performance.now().toString(36) + Math.random().toString(36)).replace(
    /\./g,
    '',
  )
}
