
// DEPRECATED

import {closestMatch, distance} from 'closest-match';

const plates = [
  {
    token: 'BURRATA',
    name: '🧀 Burrata',
  },
  {
    token: 'BUNUELOS',
    name: 'Buñuelos',
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
    name: '⬛ Arroz Negro del Día',
  },
  {
    token: 'ZUCCHINIALASBRASAS',
    name: '🥒 Zucchini a las Brasas',
  },
  {
    token: 'PAN MASA MADRE',
    name: 'Pan de Masa Madre',
  },
  {
    token: 'OJO DE BIFE',
    name: 'Ojo de Bife',
  },

  {
    token: '***FIRE***',
    name: '🔥FIRE🔥',
  },
];

const kitchenTokens = ['<<SALON>>', '<<BAR>>'];

const generalTokens = ['FECHA', 'HORA', 'MOZO', 'MESA'];

const tokens = generalTokens
  .concat(plates.map(plate => plate.token))
  .concat(kitchenTokens);

const plateTokens = plates.map(plate => plate.token);

const diferenciaEntrePalabras = (p1, p2) => distance(p1, p2) / p2.length;

const formatComanda = inputText => {
  const minTokenLength = 3;
  const maxTokenLength = 22;

  let text = (inputText + '').toUpperCase().replace(/,/, '');
  let output = '';
  let remainingTokens = tokens;
  let isFirstPlate = true;
  let hastaanterior = 0;
  let match = '';
  let prevMatch = '';

  for (let desde = 0; desde < text.length; desde++) {
    for (let hasta = 0; hasta < text.length; hasta++) {
      const palabra = text.substring(desde, hasta);
      const largo = hasta - desde + 1;

      if (largo > minTokenLength && largo < maxTokenLength) {
        match = closestMatch(palabra, tokens);

        const diferencia = diferenciaEntrePalabras(palabra, match);

        if (remainingTokens.includes(match)) {
          if (palabra == match || diferencia < 0.5) {
            remainingTokens = remainingTokens.filter(token => token != match);
            let description = text.substring(hastaanterior + 1, desde);

            if (kitchenTokens.includes(match)) {
              output = output.concat(`COCINA=${match},\n`);
            } else {
              if (plateTokens.includes(match)) {
                if (isFirstPlate) {
                  output = output.concat(`${prevMatch}=${description},\n`);
                  output = output.concat(`\n <>`);
                }
                isFirstPlate = false;
                output = output.concat(`\n${match},`);
              } else {
                if (!kitchenTokens.includes(prevMatch)) {
                  output = output.concat(`${prevMatch}=${description},\n`);
                }
              }
            }
            hastaanterior = hasta;
            prevMatch = match;
          }
        }
      }
    }
  }

  output = output.replace(/[\s\t]/g, '').replace(/=,/, '=');
  return output;
};

const convertStringToComanda = text => {

  let formattedText = formatComanda(text);
  let areas = formattedText
    .split(/<>/)
    .map(area => area.split(/,/).map(line => line.split(/=/)));

  let comanda = {
    kitchen: '',
    date: '',
    time: '',
    waiter: '',
    table: '',
    plates: [],
  };

  let propsArea = areas
    .filter(area => area.some(line => line.length == 2))
    .flat()
    .filter(line => line.length == 2);

  let platesArea = areas.filter(area => area.every(line => line.length == 1));

  platesArea = platesArea
    .flat()
    .map(item => item[0])
    .filter(item => item != '');

  propsArea.forEach(line => {
    let prop = line[0];
    let value = line[1];
    switch (prop) {
      case 'COCINA':
        comanda.kitchen = value;
        break;

      case 'FECHA':
        comanda.date = value;
        break;

      case 'HORA':
        comanda.time = value;
        break;

      case 'MOZO':
        comanda.waiter = value;
        break;

      case 'MESA':
        comanda.table = value;
        break;

      default:
        break;
    }
  });

  comanda.plates = procesarPlatos(platesArea);

  return comanda;
};

const procesarPlatos = areaPlatos => {
  let platosProcesados = [];

  areaPlatos.forEach(plato => {
    let plateToken = closestMatch(plato, plateTokens);
    platosProcesados.push(plates.find(plate => plate.token == plateToken));
  });
  return platosProcesados;
};

module.exports = {
  convertStringToComanda,
};
