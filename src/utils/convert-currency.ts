/**
 * Converte um valor monetário em reais (BRL), representado como string, para centavos.
 *
 * Exemplo:
 * - Entrada: "1.234,56"
 * - Saída: 123456
 *
 * @param {string} amount - Valor monetário formatado como string (ex: "1.234,56").
 * @returns {number} Valor convertido em centavos (inteiro).
 */
export function convertRealToCents(amount: string) {
  const numericPrice = parseFloat(amount.replace(/\./g, "").replace(",", "."));
  const priceInCents = Math.round(numericPrice * 100);

  return priceInCents;
}
