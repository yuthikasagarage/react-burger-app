import axios from "axios";

const instance = axios.create({
  baseURL: "https://react-my-burger-7b9ce.firebaseio.com/",
});

export default instance;
