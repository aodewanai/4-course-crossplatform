import axios from "axios";

const uri = "https://car-company-5.herokuapp.com/api";

function getCars() {
  return axios
    .get(uri + "/cars")
    .then((res) => {
      //console.log(res.data.result);
      return res.data.result;
    })
    .catch((err) => {
      return err.message;
    });
}

function addCar(car) {
  return axios
    .post(uri + "/cars/add", car)
    .then((res) => {
      return res.data.result;
    })
    .catch((err) => {
      return err.message;
    });
}

function editCar(car) {
  return axios
    .post(uri + "/cars/edit", car)
    .then((res) => {
      console.log(res.data);
      return res.data.result;
    })
    .catch((err) => {
      console.log(err);
      return err.message;
    });
}

function deleteCar(car) {
  return axios
    .delete(uri + "/cars/" + car.id, car)
    .then((res) => {
      return res.data.result;
    })
    .catch((err) => {
      return err.message;
    });
}
export { getCars, addCar, editCar, deleteCar };
