import React from 'react';
import { getIn } from 'formik'
import { TextField, FormHelperText } from '@material-ui/core'

const PitchInput = ({field, form, label}) => {
    const {errors, touched} = form
    const errorMessage = getIn(errors, field.name)
    const touchedMessage = getIn(touched, field.name)
    
    return(
    <>
        <TextField
            {...field}
            id= "pitcher-reports"
            label = {label}
            className = "pitch input"
            type = "text"
            margin="normal"
        /> 
        {errorMessage && touchedMessage ? <FormHelperText className={"form error"}>
                {errorMessage}
            </FormHelperText> : null
        }
        </>
    )
}

export default PitchInput