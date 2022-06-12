import { useState } from "react";
import InputGroup from "../components/shared/forms/InputGroup";
import { Button } from "../components/UI/buttons/Button";
import { isObjEmpty, deepClone } from "../utils/object-utils";

const init = {
  title: {
    value: "",
    error: "",
    focus: false,
  },
  bio: {
    value: "",
    error: "",
    focus: false,
  },
  skills: {
    value: "",
    error: "",
    focus: false,
  },
};

const App = () => {
  const [state, setState] = useState({ ...init });

  const mapStateToValues = (state) => {
    return Object.keys(state).reduce((acc, cur) => {
      acc[cur] = state[cur].value;
      return acc;
    }, {});
  };
  
  const changeInputHandler = (e) => {
    const { name: key, value } = e.target;
    // setState((prev) => ({
    //   ...prev,
    //   [key]: {
    //     ...prev[key],
    //     value: value
    //   }
    // }));
    const oldState = deepClone(state);
    oldState[key].value = value;

    const values = mapStateToValues(oldState);
    const { errors } = checkValidity(values);
    if (errors[key]) {
      oldState[key].error = "";
    }
 
    setState(oldState);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const values = mapStateToValues(state);

    const { isValid, errors } = checkValidity(values);
    if (isValid) {
      console.log(state);
    } else {
      console.log(errors);
      const oldState = deepClone(state);
      Object.keys(errors).forEach((key) => {
        oldState[key].error = errors[key];
      });
      setState(oldState);
    }
  };

  const handleFocus = (e) => {
    const { name } = e.target;
    const oldState = deepClone(state);
    oldState[name].focus = true;
    setState(oldState);
  };

  const handleBlur = (e) => {
    const key = e.target.name;
    const values = mapStateToValues(state);
    const { errors } = checkValidity(values);
    const oldState = deepClone(state);

    if (oldState[key].focus === true && errors[key]) {
      oldState[key].error = errors[key];
    } else {
      oldState[key].error = "";
    }
    setState(oldState);
  };

  const checkValidity = (values) => {
    const errors = {};
    const { title, bio, skills } = values;
    if (!title) errors.title = "Invalid Title";
    if (!bio) errors.bio = "Invalid Bio";
    if (!skills) errors.skills = "Invalid Skills";

    return {
      isValid: isObjEmpty(errors),
      errors,
    };
  };

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
            value={state.title.value}
            label={"title"}
            name={"title"}
            placeholder={"Software Engineer"}
            onChange={changeInputHandler}
            error={state.title.error}
            onFocus={handleFocus}
            onBlur={handleBlur}
          />
          <InputGroup
            value={state.bio.value}
            label={"bio"}
            name={"bio"}
            placeholder={"I am a Software Engineer..."}
            onChange={changeInputHandler}
            error={state.bio.error}
            onFocus={handleFocus}
            onBlur={handleBlur}
          />
          <InputGroup
            value={state.skills.value}
            label={"skills"}
            name={"skills"}
            placeholder={"Javascript, React"}
            onChange={changeInputHandler}
            error={state.skills.error}
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
