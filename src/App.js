import Login from "./pages/Login";
import Todos from "./pages/Todos";
import useLocalStorage from "./hooks/useLocalStorage";

function App() {
  const [isLogedIn, setIsLogedIn] = useLocalStorage("isLogedIn", false);
  return (
    <div className="bg-mainBlue h-100 h-screen flex justify-center items-center flex-column">
      {isLogedIn ? (
        <Todos setIsLogedIn={setIsLogedIn} />
      ) : (
        <Login isLogedIn={isLogedIn} setIsLogedIn={setIsLogedIn} />
      )}
    </div>
  );
}

export default App;
