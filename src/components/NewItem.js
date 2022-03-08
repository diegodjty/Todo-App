import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { IoMdClose } from "react-icons/io";
import { v4 as uuidv4 } from "uuid";

const NewItem = ({ handleNewTodo, setItems, items }) => {
  const formik = useFormik({
    initialValues: {
      todo: "",
    },
    validationSchema: Yup.object({
      todo: Yup.string()
        .required("This field is required")
        .min(1, "Needs at least 1 character")
        .max(25, "Can't be more than 25 characters"),
    }),
    onSubmit: (values) => {
      setItems([...items, { task: values.todo, id: uuidv4(), isEdit: false }]);
      values.todo = "";
      handleNewTodo();
    },
  });
  return (
    <div>
      <form
        onSubmit={formik.handleSubmit}
        className={"flex justify-between mt-10 items-center "}
      >
        <IoMdClose
          className=" text-xl cursor-pointer "
          onClick={handleNewTodo}
        />
        <input
          name="todo"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.todo}
          type="text"
          className={` py-2 border-2 rounded-xl w-[60%]`}
        />

        <input
          type="submit"
          value="Save"
          className={`bg-blue-500 px-5 py-2 ml-3 cursor-pointer text-white rounded-md ${
            formik.isValid ? "bg-blue-500" : "bg-blue-100"
          }`}
          disabled={!formik.isValid || formik.isSubmitting}
        />
      </form>
      {formik.touched.todo && formik.errors.todo ? (
        <div className="text-red-500">{formik.errors.todo}</div>
      ) : null}
    </div>
  );
};

export default NewItem;
