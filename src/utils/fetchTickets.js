import axios from "axios";

const BASE_URL = "https://crm-backend-2-uz3g.onrender.com";

const fetchTickets = async (localStorage) => {
  let result = {};
  try {
    result = await axios.get(
      BASE_URL + "/crm/api/v1/tickets",
      {
        headers: {
          "x-access-token": localStorage.getItem("token"),
        },
      },
      {
        userId: localStorage.getItem("userId"),
      }
    );
    if (result.status === 200) return result.data;
  } catch (error) {
    console.log(error);
  }
  return result;
};

export default fetchTickets;
