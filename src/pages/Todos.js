import React, { useState } from "react";
import ItemsList from "../components/ItemsList";
import NewItem from "../components/NewItem";
import TodoHeader from "../components/TodoHeader";
import useLocalStorage from "../hooks/useLocalStorage";

const Todos = ({ setIsLogedIn }) => {
  const [showAddForm, setShowAddForm] = useState(false);
  // Local storage hook to save data on local storage
  const [items, setItems] = useLocalStorage("items", []);
  const [searchWord, setSearchWord] = useState("");

  const handleNewTodo = () => {
    setShowAddForm(!showAddForm);
  };
  return (
    <div className="w-[100%] max-w-xl">
      <button
        onClick={() => {
          setIsLogedIn(false);
        }}
        className="absolute top-5 right-5 bg-red-500 px-5 py-2 ml-3 cursor-pointer text-white rounded-md"
      >
        Logout
      </button>
      <h2 className="text-center text-4xl font-bold mb-5">My TO-DO List</h2>
      <div className="bg-white p-7 rounded-sm drop-shadow-2xl w-[90%] m-auto   flex-col  justify-center items-center">
        <TodoHeader
          handleNewTodo={handleNewTodo}
          items={items}
          setSearchWord={setSearchWord}
        />
        {/* show Add form when "new" button is clicked */}
        {showAddForm && (
          <NewItem
            handleNewTodo={handleNewTodo}
            setItems={setItems}
            items={items}
          />
        )}
        <ItemsList searchWord={searchWord} items={items} setItems={setItems} />
      </div>
    </div>
  );
};

export default Todos;
