import { FaPen, FaTrash } from "react-icons/fa";
import { useFormik } from "formik";
import * as Yup from "yup";

const Items = ({ item, setItems, items, isEdit }) => {
  const handleDelete = () => {
    const newItemsArray = items.filter((current) => {
      return item.id !== current.id;
    });
    setItems(newItemsArray);
  };
  const handleEdit = () => {
    const newItemsArray = items.map((current) => {
      if (current.id === item.id) {
        current.isEdit = true;
        return current;
      } else {
        current.isEdit = false;
        return current;
      }
    });
    setItems(newItemsArray);
  };
  const formik = useFormik({
    initialValues: {
      editTodo: item.task,
    },
    validationSchema: Yup.object({
      editTodo: Yup.string()
        .required("This field is required")
        .min(1, "Needs at least 1 character")
        .max(25, "Can't be more than 25 characters"),
    }),
    onSubmit: (values) => {
      const newItemsArray = items.map((current) => {
        if (current.id === item.id) {
          current.task = values.editTodo;
          current.isEdit = false;
          return current;
        }
        return current;
      });
      console.log(newItemsArray);
      setItems(newItemsArray);
    },
  });
  return (
    <div className="">
      {!isEdit ? (
        <div className="border-b-2 border-gray-100 py-3 flex justify-between">
          <p>{item.task}</p>
          <div className="flex">
            <FaPen
              className="text-yellow-500 cursor-pointer"
              onClick={handleEdit}
            />
            <FaTrash
              onClick={handleDelete}
              className="ml-3 text-red-500 cursor-pointer"
            />
          </div>
        </div>
      ) : (
        <form onSubmit={formik.handleSubmit} className={"flex justify-between"}>
          <input
            name="editTodo"
            value={formik.values.editTodo}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            type="text"
            className={` py-2 border-2 rounded-xl  `}
          />

          <input
            type="submit"
            value="Save"
            className={`bg-blue-500 px-5 py-2 ml-5 cursor-pointer text-white rounded-md ${
              formik.isValid ? "bg-blue-500" : "bg-blue-100"
            }`}
          />
        </form>
      )}
    </div>
  );
};

export default Items;
