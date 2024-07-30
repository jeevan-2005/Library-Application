import { useContext } from "react";
import AllRoutes from "./AllRoutes/AllRoutes";
import { AuthContext } from "./Contexts/AuthContext";

function App() {
  const {authState} = useContext(AuthContext)
  console.log(authState)
  return (
    <>
      <AllRoutes/>
    </>
  );
}

export default App;
