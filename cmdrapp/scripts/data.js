const plates = [
  {
    token: 'BURRATA',
    name: '🧀 Burrata',
  },
  {
    token: 'BUNUELOS',
    name: '🍘 Buñuelos',
  },
  {
    token: 'EMPANADASX2',
    name: '🥟 Empanadas X 2',
  },
  {
    token: 'PAPASFRITASDIA',
    name: '🍟 Papas Fritas del Día',
  },
  {
    token: 'PRIMERIB',
    name: '🍖 Primer Rib',
  },
  {
    token: '1/2POLLODIA',
    name: '🍗 1/2 Pollo del Día',
  },
  {
    token: 'ARROZVEGETARIANO',
    name: '🍚 Arroz Vegetariano',
  },
  {
    token: 'VEGETALESDIA',
    name: '🥦 Vegetales del Día',
  },
  {
    token: 'ARROZNEGRODIA',
    name: '🍙 Arroz Negro del Día',
  },
  {
    token: 'ZUCCHINIALASBRASAS',
    name: '🥒 Zucchini a las Brasas',
  },
  {
    token: 'PAN MASA MADRE',
    name: '🍞 Pan de Masa Madre',
  },
  {
    token: 'OJO DE BIFE',
    name: '🥩 Ojo de Bife',
    specialOrders: [{token: 'ENTRE JUGOSO Y APUNTO', name: 'Entre jugoso y apunto'}],
  },

  {
    token: 'FIRE',
    name: '🔥FIRE🔥',
  },
];
const plateTokens = plates.map(plate => plate.token);

const kitchens = [
  {
    token: '<<SALON>>',
    name: 'Salón',
  },
  {
    token: '<<BAR>>',
    name: 'Bar',
  },
];

const properties = [
  {
    token: 'FECHA',
    name: 'date',
    label: 'Fecha'
  },
  {
    token: 'HORA',
    name: 'time',
    label: 'Hora'
  },
  {
    token: 'MOZO',
    name: 'waiter',
    label: 'Mozo'
  },
  {
    token: 'MESA',
    name: 'table',
    label: 'Mesa'
  },
  {
    token: 'COCINA',
    name: 'kitchen',
    values: kitchens,
    label: 'Cocina'

  },
  {
    token: 'COMBINA CON',
    name: 'extras',
    label: 'Combina Con'

  },
];

const propertiesTokens = properties.map(prop => prop.token);

const tokens = propertiesTokens.concat(plateTokens);

module.exports = {
  plates,
  plateTokens,
  kitchens,
  properties,
  propertiesTokens,
  tokens,
};
