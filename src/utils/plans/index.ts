export type PlanDetailsProps = {
  maxServices: number;
};

export type PlansProps = {
  BASIC: PlanDetailsProps;
  PROFESSIONAL: PlanDetailsProps;
  ENTERPRISE: PlanDetailsProps;
};

export const PLANS: PlansProps = {
  BASIC: {
    maxServices: 3,
  },
  PROFESSIONAL: {
    maxServices: 10,
  },
  ENTERPRISE: {
    maxServices: 50,
  },
};

export const subscriptionPlans = [
  {
    id: "BASIC",
    name: "Básico",
    description: "Ideal para profissionais autônomos que estão começando.",
    price: "R$ 97,00",
    descountPrice: "R$ 50,00",
    features: [
      `Até ${PLANS["BASIC"].maxServices} serviços cadastrados`,
      "Agendamentos ilimitados",
      "Suporte em horário comercial",
      "Geração de relatórios detalhados",
    ],
  },
  {
    id: "PROFESSIONAL",
    name: "Profissional",
    description: "Perfeito para pequenos estabelecimentos em crescimento.",
    price: "R$ 197,00",
    descountPrice: "R$ 150,00",
    features: [
      `Até ${PLANS["PROFESSIONAL"].maxServices} serviços cadastrados`,
      "Agendamentos ilimitados",
      "Suporte em horário comercial",
      "Geração de relatórios detalhados",
    ],
  },
  {
    id: "ENTERPRISE",
    name: "Empresarial",
    description: "Solução completa para estabelecimentos com alta demanda.",
    price: "R$ 297,00",
    descountPrice: "R$ 250,00",
    features: [
      `Até ${PLANS["ENTERPRISE"].maxServices} serviços cadastrados`,
      "Agendamentos ilimitados",
      "Suporte 24 horas por dia",
      "Geração de relatórios detalhados",
    ],
  },
];
