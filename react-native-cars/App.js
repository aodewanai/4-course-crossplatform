import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, TextInput } from 'react-native';
import { useEffect, useState, useCallback } from "react";
import { getCars, addCar, editCar, deleteCar } from "./api";
import { DataTable } from 'react-native-paper';
import { Formik } from 'formik';

const defaultCar = {
  brand: "bmw",
  type: "sedan",
  yearOfManufacture: 2022,
  cost: 10000
};

export default function App() {
  const [cars, setCars] = useState([]);
  const [car, setCar] = useState(defaultCar);

  useEffect(() => {
    getCars().then((data) => setCars(data));
  }, []);

  return (
    <View style={styles.container}>
      <Form {...{ car, setCar, cars, setCars }} />
      <Table {...{ car, setCar, cars, setCars }} />
    </View>
  );
}

function Table({ car, setCar, cars, setCars }) {

  return (<View>{
    cars?.length ?
      <DataTable>
        <DataTable.Header>
          <DataTable.Title>brand</DataTable.Title>
          <DataTable.Title>type</DataTable.Title>
          <DataTable.Title>cost</DataTable.Title>
          <DataTable.Title>yearOfManufacture</DataTable.Title>
          <DataTable.Title>Edit</DataTable.Title>
          <DataTable.Title>Delete</DataTable.Title>
        </DataTable.Header>
        {cars.map((el) =>
          <DataTable.Row key={el.id}>
            <DataTable.Cell>{el.brand}</DataTable.Cell>
            <DataTable.Cell>{el.type}</DataTable.Cell>
            <DataTable.Cell>{el.cost}</DataTable.Cell>
            <DataTable.Cell>{el.yearOfManufacture}</DataTable.Cell>
            <DataTable.Cell><Button onPress={() => {
              setCar(el);
            }} title="e" /></DataTable.Cell>
            <DataTable.Cell><Button onPress={() => {
              const shallowCars = [...cars];
              deleteCar(el).then(res => {
                const index = shallowCars.findIndex((item) => item.id === res.id);
                shallowCars.splice(index, 1);
                setCars(shallowCars);
              });
            }} title="d" /></DataTable.Cell>
          </DataTable.Row>)}
      </DataTable> : <Text>empty</Text>
  }</View>);
}

function Form({ car, setCar, cars, setCars }) {
  const submitForm = useCallback((values, { resetForm }) => {
    console.log(values)
    if (!values.brand || !values.type || !values.cost) {
      return error('error pashov nahui');
    }
    const shallowCars = [...cars];
    if (values.id) {
      editCar(values).then(res => {
        console.log("sfdbjosifdsjsvioj ", res);
        const index = shallowCars.findIndex((item) => item.id === res._id);
        shallowCars[index] = res;
        shallowCars[index].id = shallowCars[index]._id;
        setCars(shallowCars);
      });
    } else {
      try {
        addCar(values).then(res => setCars([...cars, res]));
      } catch (e) {
        error('error!');
      }
    }
    resetForm({ values: defaultCar })
    setCar(defaultCar);
  }, [cars, defaultCar]);
  return <Formik
    initialValues={{ ...car }}
    onSubmit={submitForm}
    enableReinitialize
  >
    {({ handleChange, handleBlur, handleSubmit, values }) => (
      <View>{Object.entries(car).map(([key, value]) => {
        if (key !== 'id') {
          return <View
            key={key}>
            <Text>{key}</Text>
            <TextInput
              onChangeText={handleChange(key)}
              onBlur={handleBlur(key)}
              value={values[key]}
            />
          </View>
        }
      }
      )}
        <Button onPress={handleSubmit} title="Submit" />
      </View>
    )}
  </Formik>
}

const styles = StyleSheet.create({
  container: {
    padding: 5
  },
});
