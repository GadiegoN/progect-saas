/**
 * Formata uma string numérica como número de telefone brasileiro.
 *
 * Exemplo:
 * - Entrada: "11987654321"
 * - Saída: "(11) 98765-4321"
 *
 * @param {string} value - Valor contendo o número de telefone, possivelmente com caracteres não numéricos.
 * @returns Número de telefone formatado no padrão brasileiro.
 */
export function formatPhone(value: string) {
  const cleaned = value.replace(/\D/g, "");

  if (cleaned.length > 11) {
    return value.slice(0, 15);
  }

  const formatted = cleaned
    .replace(/^(\d{2})(\d{4,5})(\d{4})$/, "($1) $2-$3")
    .replace(/(\d{4,5})(\d{4})$/, "$1$2");

  return formatted;
}

export function extractPhoneNumber(value: string) {
  const cleaned = value.replace(/[\(\)\s-]/g, "");

  return cleaned.length > 11 ? cleaned.slice(0, 15) : cleaned;
}
