import { FaUserAlt } from "react-icons/fa";
import { RiLockPasswordFill } from "react-icons/ri";
import { useFormik } from "formik";
import * as Yup from "yup";

const Login = ({ setIsLogedIn }) => {
  // useFormik hook to help with form validation,form submission manage state
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email()
        .required("Required")
        .max(50, "Can't be more than 50 characters"),
      password: Yup.string()
        .min(4, "Must be at least 4 characters")
        .max(16, "Can't be more than 16 characters")
        .required("Required"),
    }),
    onSubmit: (values, submitProps) => {
      // make API call when login form submits
      const payload = { email: values.email, password: values.password };
      fetch("http://dev.rapptrlabs.com/Tests/scripts/user-login.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams(payload),
      })
        .then((response) => {
          if (response.status === 200) {
            // Change the state of isLogedIn so it can render the Todos Component.
            setIsLogedIn(true);
          }
          return response.json();
        })
        .then((data) => alert(JSON.stringify(data)))
        .catch((error) => console.log("Error", error));
      // Set is submitting to false at the end of the form submission because formik makes it true when form is submited to avoid submiting form again before it finish the first submission
      submitProps.setSubmitting(false);
    },
  });
  return (
    <div className="w-[90%] max-w-xl bg-white p-7 rounded-sm drop-shadow-2xl">
      <h1 className="text-4xl font-bold mb-7 text-center ">Rapptr Labs</h1>
      <form onSubmit={formik.handleSubmit}>
        <div className="inputContainer flex flex-col ">
          <label htmlFor="email" className="font-semibold">
            Email
          </label>
          <div className="form-input relative ">
            <FaUserAlt className="absolute h-10 ml-2" />
            <input
              type="text"
              id="email"
              placeholder="user@rapptrlabs.com"
              // if input was touched and theres and error make the input border red
              className={`w-full py-2 px-7 border-2 ${
                formik.touched.email && formik.errors.email
                  ? "border-red-500"
                  : "border-gray-200"
              }`}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
            />
            {formik.touched.email && formik.errors.email ? (
              <div className="text-red-500">{formik.errors.email}</div>
            ) : null}
          </div>
        </div>
        <div className="inputContainer flex flex-col w-full">
          <label htmlFor="password" className="font-semibold">
            Password
          </label>
          <div className="form-input relative ">
            <RiLockPasswordFill className="absolute h-11 ml-2" />
            <input
              type="password"
              id="password"
              placeholder="Must be at leat 4 characters"
              className={`w-full py-2 px-7 border-2 ${
                formik.touched.password && formik.errors.password
                  ? "border-red-500"
                  : "border-gray-200"
              }`}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.password}
            />
            {formik.touched.password && formik.errors.password ? (
              <div className="text-red-500">{formik.errors.password}</div>
            ) : null}
          </div>
        </div>
        <input
          type="submit"
          value="Login"
          className={`text-xl mt-3 w-full py-1 border-blue-500 border-2  text-white font-semibold cursor-pointer ${
            formik.isValid ? "bg-blue-400" : "bg-blue-100"
          }`}
          // disable submit button if theres a validation error or if form is submitting
          disabled={!formik.isValid || formik.isSubmitting}
        />
      </form>
    </div>
  );
};

export default Login;
