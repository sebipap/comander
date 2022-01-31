import React, {useState} from 'react';
import {View} from 'react-native';
import {Button, Text, TextInput, Title} from 'react-native-paper';
import {properties} from '../scripts/data';
import {Course} from './Course';
import {Property} from './Property';

export const Command = props => {
  const [command, setCommand] = useState(props.command);

  const deleteCourse = deletedCourse => {
    setCommand({
      ...command,
      courses: command.courses.filter(
        course => course.index != deletedCourse.index,
      ),
    });
  };

  const editCourse = newCourse => {
    let newCourses = command.courses;
    newCourses[newCourse.index] = newCourse;

    setCommand({
      ...command,
      courses: newCourses,
    });
  };

  const editProp = property => {
    setCommand({
      ...command,
      [property.name]: property.value,
    });
  };

  const sendCommand = () => {
    fetch('http://192.168.1.60:5000/api/command/new', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(command),
    })
      .then(res => res.json())
      .then(res => {
        console.log(res.message)

        props.setActiveScreen('Success');

      })
      .catch(e => {
        console.log("gv!")

        props.setActiveScreen('Error');

        console.error(e);
      });

      console.log("C")

  };

  const PropsScreen = () =>
    properties.map(property => (
      <Property
        property={property}
        value={command[property.name]}
        editProp={editProp}
      />
    ));

  const FoodScreen = () => {
    const starterCourses = command.courses.filter(course => course.isStarter);
    const mainCourses = command.courses.filter(course => !course.isStarter);

    return (
      <View>
        <Title>Entradas</Title>
        {starterCourses.map(course => (
          <Course
            course={course}
            editCourse={editCourse}
            deleteCourse={deleteCourse}
          />
        ))}
        <Title>Principales</Title>
        {mainCourses.map(course => (
          <Course
            course={course}
            editCourse={editCourse}
            deleteCourse={deleteCourse}
          />
        ))}
      </View>
    );
  };

  return (
    <View style={{margin: 15}}>
      <PropsScreen />
      <FoodScreen />
      <Button onPress={sendCommand}>Enviar</Button>
      <Button onPress={() => props.setActiveScreen("HomeScreen")}>Volver</Button>

    </View>
  );
};
