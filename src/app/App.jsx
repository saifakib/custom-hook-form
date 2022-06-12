import useForm from "../hooks/useForm";
import InputGroup from "../components/shared/forms/InputGroup";
import { Button } from "../components/UI/buttons/Button";
import Task from "../components/task/Task";


const init = {
  firstname: "",
  lastname: "",
  email: "",
  password: "",
};

// User can control property errors
const validate = (values) => {
  const errors = {};

  if (!values.firstname) {
    errors.firstname = "First Name is Required";
  }
  if (!values.lastname) {
    errors.lastname = "Last Name is Required";
  }
  if (!values.email) {
    errors.email = "Email is Required";
  }
  if (!values.password) {
    errors.password = "Password is Required";
  } else if (values.password.length < 6) {
    errors.password = "Password length must be 6 Characters";
  }
  return errors;
};
// const validate = true;
// const validate = false;

const App = () => {
  const {
    formState: state,
    handleChange,
    handleFocus,
    handleBlur,
    handleSubmit,
    clear,
  } = useForm({ init, validate });

  const cb = ({ hasError, values, errors }) => {
    if (hasError) {
      alert("[ERROR]" + JSON.stringify(errors));
    } else {
      alert("[SUCCESS]" + JSON.stringify(values));
    }
  };

  return (
    <div className="root">
      <h1 style={{ textAlign: "center", fontSize: "40px"}}>Custom Hook Form</h1>
      <form onSubmit={(e) => handleSubmit(e, cb)}>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "1rem",
          }}
        >
          <InputGroup
            value={state.firstname.value}
            label={"First Name"}
            name={"firstname"}
            placeholder={"Enter First Name"}
            error={state.firstname.error}
            onChange={handleChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
          />

          <InputGroup
            value={state.lastname.value}
            label={"Last Name"}
            name={"lastname"}
            placeholder={"Enter Last Name"}
            error={state.lastname.error}
            onChange={handleChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
          />

          <InputGroup
            value={state.email.value}
            label={"Email Address"}
            name={"email"}
            placeholder={"Enter Email Address"}
            error={state.email.error}
            onChange={handleChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
          />

          <InputGroup
            value={state.password.value}
            label={"Password"}
            name={"password"}
            placeholder={"Enter password"}
            error={state.password.error}
            onChange={handleChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
          />
          <Button type="submit">
            Submit
          </Button>
          <Button type="reset" onClick={clear}>
            // Clear //
          </Button>
        </div>
      </form>
      <Task />
    </div>
  );
};

export default App;
