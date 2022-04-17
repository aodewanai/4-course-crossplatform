import "./styles.css";
import { useEffect, useState, useCallback } from "react";
import { getCars, addCar, editCar, deleteCar } from "./api";

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
    <div className="App">
      <h1>Слава Україні</h1>
      <img
        alt="ua"
        width="50%"
        src="https://www.scdnipro1.com.ua/wp-content/uploads/2022/02/2515351.jpg"
      ></img>
      <CarForm {...{ car, setCar, cars, setCars }} />

      <div className="CarsList">
        {cars.map((el) => (
          <Car key={el.id} {...{ el, setCar, cars, setCars }} />
        ))}
      </div>
    </div>
  );
}

function CarForm({ car = defaultCar, setCar, cars, setCars }) {
  useEffect(() => {
    console.log(car);
  }, [car]);

  const submitForm = useCallback(
    async (e) => {
      e.preventDefault();
      if (car.id) {
        editCar(car).then((data) => {
          const index = cars.findIndex((el) => el.id === car.id);
          const temp = [...cars];
          temp[index] = data;
          setCars([...temp]);
        });
      } else {
        addCar(car).then((data) => setCars([...cars, data]));
      }
      setCar({ ...defaultCar });
    },
    [car, setCars, cars, setCar]
  );

  return (
    <form className="CarForm" onSubmit={submitForm}>
      <select
        value={car.brand}
        onChange={(e) => {
          setCar({ ...car, brand: e.target.value });
        }}
      >
        <option key="brand" value="brand" disabled>
          Brand
        </option>
        <option key="bmw" value="BMW">
          BMW
        </option>
        <option key="toyota" value="Toyota">
          Toyota
        </option>
        <option key="nisan" value="Nisan">
          Nisan
        </option>
        <option key="volkswagen" value="Volkswagen">
          Volkswagen
        </option>
        <option key="honda" value="Honda">
          Honda
        </option>
        <option key="mercedes-benz" value="Mercedes-Benz">
          Mercedes-Benz
        </option>
      </select>
      <select
        value={car.type}
        onChange={(e) => {
          setCar({ ...car, type: e.target.value });
        }}
      >
        <option key="type" value="type" disabled>
          Type
        </option>
        <option key="sedan" value="sedan">
          sedan
        </option>
        <option key="hatchback" value="hatchback">
          hatchback
        </option>
        <option key="van" value="van">
          van
        </option>
        <option key="cabriolet" value="cabriolet">
          cabriolet
        </option>
        <option key="supercar" value="supercar">
          supercar
        </option>
        <option key="pickup" value="pickup">
          pickup
        </option>
      </select>
      <input
        type="number"
        value={car?.yearOfManufacture}
        min="1886"
        step="1"
        max="2022"
        onChange={(e) => {
          setCar({ ...car, yearOfManufacture: +e.target.value });
        }}
      />
      <input
        type="number"
        value={car?.cost}
        min="0"
        onChange={(e) => {
          setCar({ ...car, cost: +e.target.value });
        }}
      />
      <input type="submit" value={car.id ? "Edit" : "Add"} />
      <input
        type="reset"
        value="Reset"
        onClick={() => {
          setCar(defaultCar);
        }}
      />
    </form>
  );
}

function Car({ el, setCar, cars, setCars }) {
  return (
    <div className="Car">
      <h1>{el.brand}</h1>
      <p>type: {el.type}</p>
      <p>cost: {el.cost}</p>
      <p>year of issue: {el.yearOfManufacture}</p>
      <button
        className="Edit"
        onClick={() => {
          setCar({ ...el });
        }}
      >
        Edit
      </button>
      <button
        className="Delete"
        onClick={() => {
          deleteCar({ ...el }).then((data) => {
            const index = cars.findIndex((item) => item.id === el.id);
            const temp = [...cars];
            temp.splice(index, 1);
            setCars([...temp]);
          });
        }}
      >
        Delete
      </button>
    </div>
  );
}
