import React from "react";
import { FaSearch } from "react-icons/fa";

const TodoHeader = ({ handleNewTodo, items, setSearchWord }) => {
  return (
    <div className="flex justify-between items-center w-[100%]">
      {/* don't render the search bar if there is no tasks */}
      {items.length > 0 ? (
        <div className=" flex flex-col flex-1 ">
          <div className="form-input relative ">
            <FaSearch className="absolute h-11 ml-2" />
            <input
              type="text"
              placeholder="Search..."
              className={`w-full py-2 px-7 border-2 rounded-xl `}
              onChange={(e) => setSearchWord(e.target.value)}
            />
          </div>
        </div>
      ) : null}

      <div className={`flex-1`}>
        <button
          onClick={handleNewTodo}
          className={`bg-green-500 px-5 py-2 cursor-pointer text-white rounded-md w-[100%] ${
            items.length > 0 ? "ml-[5%]" : ""
          }`}
        >
          New
        </button>
      </div>
    </div>
  );
};

export default TodoHeader;
