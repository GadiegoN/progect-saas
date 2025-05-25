const zones = [
  "America/Noronha",
  "America/Sao_Paulo",
  "America/Cuiaba",
  "America/Rio_Branco",
];

export const brazilianTimeZones = Intl.supportedValuesOf("timeZone")
  .filter((zone) => zones.includes(zone))
  .map((zone) => ({ label: zone, value: zone }));
