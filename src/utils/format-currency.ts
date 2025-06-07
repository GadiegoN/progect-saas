/**
 * Formata um valor numérico representado como string para o formato de moeda brasileira (BRL).
 *
 * Exemplo:
 * - Entrada: "123456"
 * - Saída: "1.234,56"
 *
 * @param {string} value - Valor numérico como string, contendo apenas dígitos ou com caracteres mistos.
 * @returns Valor formatado como moeda brasileira (com ponto para milhar e vírgula para decimal).
 */
export function formatCurrency(value: string) {
  value = value.replace(/\D/g, "");

  if (value) {
    value = (parseInt(value, 10) / 100).toFixed(2);
    value = value.replace(".", ",");
    value = value.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  }

  return value;
}

const CURRENCY_FORMATTER = new Intl.NumberFormat("pt-BR", {
  currency: "BRL",
  style: "currency",
  minimumFractionDigits: 0,
});

export function currencyFormat(number: number) {
  return CURRENCY_FORMATTER.format(number);
}
