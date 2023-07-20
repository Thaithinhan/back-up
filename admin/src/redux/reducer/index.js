import reducerOrder from "./orderSlice";
import reducerUser from "./userSlice";

const rootReuducer = {
  user: reducerUser,
  order: reducerOrder,
};

export default rootReuducer;
