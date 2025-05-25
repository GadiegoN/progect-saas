export const brazilianTimeZones = Intl.supportedValuesOf("timeZone").filter(
  (zone) =>
    zone.startsWith("America/") &&
    [
      "America/Sao_Paulo",
      "America/Fortaleza",
      "America/Recife",
      "America/Bahia",
      "America/Manaus",
      "America/Belem",
      "America/Campo_Grande",
      "America/Cuiaba",
      "America/Sao_Luis",
      "America/Porto_Velho",
      "America/Rio_Branco",
      "America/Araguaina",
      "America/Boa_Vista",
      "America/Noronha",
      "America/Santarem",
      "America/Palmas",
      "America/Brasilia",
    ].includes(zone)
);
