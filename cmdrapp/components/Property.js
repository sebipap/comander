import React, {useState} from 'react';
import {
  Button,
  Card,
  Text,
  TextInput,
  TouchableRipple,
} from 'react-native-paper';

export const Property = props => {
  const {name, label} = props.property;

  const [value, setValue] = useState(props.value);
  const [selected, setSelected] = useState(false);

  const open = () => setSelected(true);
  const close = () => {
    setSelected(false);
		props.editProp({
			...props.property,
			value
		})
  };

  return (
    <TouchableRipple onPress={open} rippleColor="rgba(0, 0, 0, .32)">
      <Card style={{margin: 5}} key={name}>
        {selected ? (
          <>
            <TextInput
              type="outlined"
              onChangeText={text => setValue(text)}
              label={label}
              value={value}
              name={name}
            />

            <Card.Actions>
              <Button onPress={close}>OK </Button>
            </Card.Actions>
          </>
        ) : (
          <>
            <Card.Content>
              <Text style={{margin: 10}}>
                <Text style={{fontSize: 15}}>{label}</Text>
                <Text style={{fontSize: 20, fontWeight: 'bold'}}>
                  {' '}
                  {value}{' '}
                </Text>
              </Text>
            </Card.Content>
          </>
        )}
      </Card>
    </TouchableRipple>
  );
};
