import {closestMatch, distance} from 'closest-match';

import {
  plates,
  plateTokens,
  properties,
  tokens,
} from './data';

const parseCommand = inputText => {
  let command = {
    kitchen: '',
    date: '',
    time: '',
    waiter: '',
    table: '',
    courses: [],
    extras: '',
  };

	let courseIndex = 0

  const parseText = () => {
    const minTokenLength = 3;
    const maxTokenLength = 22;
    let text = (inputText + '').toUpperCase().replace(/,/, '');
    let remainingTokens = tokens;
    let prevEnd = 0;
    let nextToken = '';
    let token = '';

    const processSubtring = (start, end) => {
      const word = text.substring(start, end);
      const length = end - start + 1;

      if (length <= minTokenLength || length >= maxTokenLength) return;

      nextToken = closestMatch(word, tokens);

      const itsAMatch =
        remainingTokens.includes(nextToken) &&
        (word == nextToken || difference(word, nextToken) < 0.5);

      if (!itsAMatch) return;

      removeFromRemaining(nextToken);

      const description = text.substring(prevEnd + 1, start);
      pair(token, description);

      prevEnd = end;
      token = nextToken;
    };

    const removeFromRemaining = aToken => {
      remainingTokens = remainingTokens.filter(token => token != aToken);
    };

    for (let start = 0; start < text.length; start++) {
      for (let end = 0; end < text.length; end++) {
        processSubtring(start, end);
      }
    }
    pair(token, text.substring(prevEnd + 1, text.length));
  };

  const pair = (token, description) => {
    plateTokens.includes(token)
      ? addCourse(token, description)
      : setProperty(token, description);
  };

  const addCourse = (plateToken, plateExtra) => {
    const plate = plates.find(plate => plate.token == plateToken);

    if (plate) {

			let value;
      if (plate.specialOrders) {
        const possibleTokens = plate.specialOrders.map(obj => obj.token);
        const token = closestMatch(plateExtra, possibleTokens);
				difference(token, plateExtra) < 0.2 ?
        value = plate.specialOrders.find(value => value.token == token).name :
				value = plateExtra
				
      }
      const course = {
        plate: plate,
        amount: 1,
        extra: value,
				index: courseIndex,
        isStarter: false
      };
      command.courses.push(course);
    }
		courseIndex++
  };

  const setProperty = (propertyToken, inputValue) => {
    const field = properties.find(prop => prop.token == propertyToken);
    if (field) {
      let value;
      if (field.values) {
        const possibleTokens = field.values.map(obj => obj.token);
        const token = closestMatch(inputValue, possibleTokens);
        value = field.values.find(value => value.token == token).name;
      } else {
        value = inputValue;
      }

      command = {
        ...command,
        [field.name]: value,
      };
    }
  };

  parseText();
  return command;
};

const difference = (p1, p2) => distance(p1, p2) / p2.length;

module.exports = {
  parseCommand,
};
