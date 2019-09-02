import React from 'react';
import { TextField, FormHelperText } from '@material-ui/core'


function ToolsField(props) {
    const {grade, handleChange, errors, getIn, index, handleBlur, touched} = props
    const name = `scouting_hitter_tools[${index}].grade`
    const errorMessage = getIn(errors, name)
    
  return (
    <>
    <TextField
        name={name}
        value={grade}
        id= "hitter-tools"
        label= {"20-80 grade"}
        className = "hitter-tool-grade"
        onChange={handleChange}
        onBlur = {handleBlur}
        type = "text"
        margin="normal"
    /> 
    {!touched.scouting_hitter_tools ? null : errorMessage && touched.scouting_hitter_tools[index] ? <FormHelperText className={"form error"}>
            {errorMessage}
        </FormHelperText> : null
    }
    </>
  );
}

export default ToolsField;
