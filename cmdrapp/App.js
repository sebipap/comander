import React, {useEffect, useState} from 'react';
import {Image, SafeAreaView, ScrollView, View} from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import {
  ActivityIndicator,
  Button,
  Card,
  Paragraph,
  Title,
} from 'react-native-paper';
import TextRecognition from 'react-native-text-recognition';
import {parseCommand} from './scripts/parseCommand';
import {Command} from './components/Command';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

const App = () => {
  const [image, setImage] = useState(null);
  const [text, setText] = useState(null);
  const [command, setCommand] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [activeScreen, setActiveScreen] = useState('HomeScreen');

  useEffect(() => {
    (async () => {
      if (image) {
        setActiveScreen('LoadingScreen');
        try {
          const result = await TextRecognition.recognize(image.path);
          setText(result);
          setError(false);
          setActiveScreen('CommandScreen');
        } catch (error) {
          setError('Error: se necesita version nueva de Google Play Services');
          setActiveScreen('CommandScreen');
        }
      }
    })();
  }, [image]);

  useEffect(() => {
    if (text) {
      setCommand(parseCommand(text));
      setLoading(false);
    }
  }, [text]);

  const openCamera = () => {
    ImagePicker.openCamera({
      width: 300,
      height: 400,
      cropping: true,
    }).then(res => {
      setImage(res);
    });
  };

  const openGallery = () => {
    ImagePicker.openPicker({}).then(res => {
      setImage(res);
    });
  };

  const openGalleryAndCrop = () => {
    ImagePicker.openPicker({
      cropping: true,
    }).then(res => {
      setImage(res);
    });
  };

  const Loading = () => (
    <>
      <ActivityIndicator animating={true} size="large" style={{margin: 20}} />
        <Image
          source={{uri: image.path, width: '100%', height: '100%'}}></Image>
    </>
  );

  const HomeScreen = () => (
    <View style={{marginBottom: 0, flexDirection: 'row'}}>
      <Button onPress={openCamera}>Sacar Foto</Button>
      <Button onPress={openGallery}> Abrir</Button>
      <Button onPress={openGalleryAndCrop}> Abrir y Recortar</Button>
    </View>
  );

  const Error = () => <Title>{error}</Title>;

  const CommandScreen = () => (
    <ScrollView>
      {error ? <Error /> : null}
      {command ? (
        <Command command={command} setActiveScreen={setActiveScreen} />
      ) : null}
    </ScrollView>
  );

  const SuccessScreen = () => (
    <Card>
      <Card.Title title="Comanda Subida"></Card.Title>
      <Card.Content>
        <Button onPress={() => setActiveScreen('HomeScreen')}>Volver</Button>
      </Card.Content>
    </Card>
  );

  switch (activeScreen) {
    case 'LoadingScreen':
      return <Loading />;

    case 'HomeScreen':
      return <HomeScreen />;

    case 'CommandScreen':
      return <CommandScreen />;

    case 'Success':
      return <SuccessScreen />;

    case 'Error':
      return <Title>"erro!</Title>;

    default:
      return <Loading />;
  }
};

export default App;
