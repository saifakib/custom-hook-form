import useForm from "../../hooks/useForm";
import React from 'react'

const init = {
    text: '',
    checked: '',
    group: '',
    radio: '',
    file: null
}

const Task = () => {
    const { formState, handleChange, handleSubmit } = useForm({ init, validate: true});

    const submitCB = ({ hasError, errors, values}) => {
        if(hasError) {
            console.log('[Error]:'+ JSON.stringify(errors))
        } else {
            console.log('[SUCCESS]: '+ JSON.stringify(values))
        }
    }
    
  return (
    <>
      <h1>Task</h1>
      <form onSubmit={(e) => handleSubmit(e, submitCB)}>
          <input type="text" name={'text'} value={formState.text.value} onChange={handleChange} />

          <input type="checkbox" name={'checked'} value={formState.checked.value} onChange={handleChange}/>

          <select name={"group"} value={formState.group.value} onChange={handleChange}>
              <option value="Home">Home</option>
              <option value="Office">Office</option>
          </select>

          <input type="radio" name={'radio'} value={'Low'} onChange={handleChange}/> Low
          <input type="radio" name={'radio'} value={'Medium'} onChange={handleChange}/> Medium
          <input type="radio" name={'radio'} value={'High'} onChange={handleChange}/> High

          <input type="file" name={'file'} value={formState.file.value} onChange={handleChange}/>

          <input type="submit" value={'Submit'}/>
      </form>
    </>
  )
}

export default Task;
