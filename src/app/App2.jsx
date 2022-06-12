import { useState } from "react";
import InputGroup from "../components/shared/forms/InputGroup";
import { Button } from '../components/UI/buttons/Button';

const init = {
  title: "",
  bio: "",
  skills: "",
};

const App = () => {
  const [values, setValues] = useState({ ...init });
  const [errors, setErrors] = useState({ ...init });
  const [focuses, setFocueses] = useState({
    title: false,
    bio: false,
    skills: false
  });

  const changeInputHandler = (e) => {
    const key = e.target.name;
    setValues((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));

    const { errors } = checkValidity(values)

    if(errors[key]) {
      setErrors((prev) => ({
        ...prev,
        [key]: ""
      }))
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const { isValid, errors } = checkValidity(values);
    if(isValid) {
      console.log(values)
      setErrors({ ...errors });
    } else {
      console.log(errors)
      setErrors({ ...errors }) // set new errror
    }
  }

  const handleFocus = (e) => {
    setFocueses((prev) => ({
      ...prev,
      [e.target.name]: true
    }))
  }

  const handleBlur = (e) => {
    const key = e.target.name;
    const { errors } = checkValidity(values)

    if(errors[key] && focuses[key] === true) {
      setErrors((prev) => ({
        ...prev,
        [key]: errors[key]
      }));
    } else {
      setErrors((prev) => ({
        ...prev,
        [key]: "",
      }));
    }

  }

  const checkValidity = (values) => {
    const errors = {};
    const { title, bio, skills } = values;
    if(!title) errors.title = "Invalid Title";
    if(!bio) errors.bio = "Invalid Bio";
    if(!skills) errors.skills = "Invalid Skills";

    return {
      isValid: Object.keys(errors).length === 0,
      errors
    }
  }

  return (
    <div className="root">
      <form onSubmit={handleSubmit}>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "1rem",
          }}
        >
          <InputGroup
            value={values.title}
            label={"title"}
            name={"title"}
            placeholder={"Software Engineer"}
            onChange={changeInputHandler}
            error={errors.title}
            onFocus={handleFocus}
            onBlur={handleBlur}
          />
          <InputGroup
            value={values.bio}
            label={"bio"}
            name={"bio"}
            placeholder={"I am a Software Engineer..."}
            onChange={changeInputHandler}
            error={errors.bio}
            onFocus={handleFocus}
            onBlur={handleBlur}
          />
          <InputGroup
            value={values.skills}
            label={"skills"}
            name={"skills"}
            placeholder={"Javascript, React"}
            onChange={changeInputHandler}
            error={errors.skills}
            onFocus={handleFocus}
            onBlur={handleBlur}
          />
          <Button type="submit">Submit</Button>
        </div>
      </form>
    </div>
  );
};

export default App;
