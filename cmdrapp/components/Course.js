import React, {useState} from 'react';
import {View} from 'react-native';
import {
  Button,
  Card,
  Paragraph,
  RadioButton,
  Text,
  TextInput,
  TouchableRipple,
} from 'react-native-paper';

export const Course = props => {
  const [extra, setExtra] = useState(props.course.extra);
  const [plate, setPlate] = useState(props.course.plate);
  
  const [amount, setAmount] = useState(props.course.amount);
  const [selected, setVisible] = useState(false);
  
  const [checked, setChecked] = useState(props.course.isStarter ? 'starter' : 'main');


  const open = () => setVisible(true);
  const close = () => {
    props.editCourse({
      plate,
      amount,
      extra,
      index: props.course.index,
      isStarter: checked == 'starter' 
    });
    setVisible(false);
  };

  const increase = () => {
    setAmount(amount + 1);
  };

  const decrease = () => {
    setAmount(amount - 1);
  };

  const handleExtra = text => {
    setExtra(text);
  };

  const handleDelete = () => props.deleteCourse({index: props.course.index})

  const Extras = () => (
    <Card.Content>
      <Paragraph>{extra}</Paragraph>
    </Card.Content>
  );

  return (
    <TouchableRipple onPress={open} rippleColor="rgba(0, 0, 0, .32)">
      <Card style={{margin: 5}} key={plate.token}>
        <Card.Title title={`${amount}   |  ${plate.name}`} />

        {selected ? (
          <>
          <Card.Content>

            <View>
              <RadioButton
                value="starter"
                status={checked === 'starter' ? 'checked' : 'unchecked'}
                onPress={() => setChecked('starter')}
              />
              <Text>Entrada</Text>
            </View>

            <RadioButton
              value="main"
              status={checked === 'main' ? 'checked' : 'unchecked'}
              onPress={() => setChecked('main')}
            />
            <Text>Plato Principal</Text>

            <Button onPress={increase}>Aumentar </Button>
            <Button onPress={decrease}>Disminuir </Button>
            <TextInput
              value={extra}
              onChangeText={handleExtra}
              label="Pedido Especial"
            />
          </Card.Content>

            <Card.Actions>
              <Button onPress={handleDelete}>Eliminar </Button>
              <Button onPress={close}>OK </Button>
            </Card.Actions>
          </>
        ) : extra ? (
          <Extras />
        ) : null}
      </Card>
    </TouchableRipple>
  );
};
