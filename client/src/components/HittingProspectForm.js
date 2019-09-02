import React from 'react';
import { useMutation } from '@apollo/react-hooks';
import "../css/hittersForm.css"
import { Formik, Form, FieldArray, getIn } from 'formik'
import { hitterValidation } from '../validationSchemas'
import { TextField, Button, Paper, FormHelperText } from '@material-ui/core'
import ToolsField from "./ToolsField"
import {ADD_HITTERS} from "../gql/mutations"

const initialFormValues = {
	firstname: '',
	lastname: '',
	fullname: '',
	position: '',
	team: '',
	scouting_report: '',
	scouting_future_value: '',
	scouting_hitter_tools: [
        {name: "Hitting", grade: ""},
        {name: "Power", grade: ""},
        {name: "Running", grade: ""},
        {name: "Fielding", grade: ""},
        {name: "Throwing", grade: ""},
    ],
} 

function HittingProspectForm() {
    const [addHitter, {data}] = useMutation(ADD_HITTERS)
  
    return (
        <div className="hitters-form">
          <Formik
              initialValues = {initialFormValues}
              onSubmit={(values, { setSubmitting }) => {
                  values.scouting_future_value = Number(values.scouting_future_value)
                  values.scouting_hitter_tools.forEach(tools => {
                    tools.grade = Number(tools.grade)
                  })
                  addHitter({variables: {input: values}})
                setSubmitting(false);
            }}
              validationSchema = {
                hitterValidation
              }
              >
                {
                   propsFormik => {
                        const {
                          values,
                          touched,
                          errors,
                          dirty,
                          isSubmitting,
                          handleChange,
                          handleBlur,
                          handleSubmit,
                          handleReset,
                        } = propsFormik;
  
                        return (
                          <Form className = "form" onSubmit={handleSubmit}>
                            <h1 className = "signup-or-login"> Hitter Scouting Report </h1>
                            <Paper className = "hitters form">
                            <div className = "form-field">
                              <TextField
                                    id= "firstname"
                                    label= "First Name"
                                    value = {values.firstname}
                                    className= "hitter-firstname"
                                    onChange={handleChange}
                                    onBlur = {handleBlur}
                                    type = "text"
                                    margin="normal"
                                />
                                {errors.firstname && touched.firstname 
										?	<FormHelperText className={"form error"}>
											{errors.firstname}
										</FormHelperText>
										:	null
                                    }
                                </div>
                            <div className = "form-field">
                              <TextField
                                    id= "lastname"
                                    label= "Last Name"
                                    value = {values.lastname}
                                    className = "hitter-lastname"
                                    onChange={handleChange}
                                    onBlur = {handleBlur}
                                    type = "text"
                                    margin="normal"
                                />
                                {errors.lastname && touched.lastname 
										?	<FormHelperText className={"form error"}>
											{errors.lastname}
										</FormHelperText>
										:	null
                                    }
                            </div>
                            <div className = "form-field">
                              <TextField
                                    id= "fullname"
                                    label= "Player Full Name"
                                    value = {values.fullname}
                                    className = "hitter-fullname"
                                    onChange={handleChange}
                                    onBlur = {handleBlur}
                                    type = "text"
                                    margin="normal"
                                />
                                {errors.fullname && touched.fullname 
										?	<FormHelperText className={"form error"}>
											{errors.fullname}
										</FormHelperText>
										:	null
                                    }
                                </div>
                                <div className = "form-field">
                                    <TextField
                                        id= "position"
                                        label= "Position"
                                        value = {values.position}
                                        className = "hitter-position"
                                        onChange={handleChange}
                                        onBlur = {handleBlur}
                                        type = "text"
                                        margin="normal"
                                    />
                                    {errors.position && touched.position 
                                            ?	<FormHelperText className={"form error"}>
                                                {errors.position}
                                            </FormHelperText>
                                            :	null
                                        }
                                    </div>
                                <div className = "form-field">
                                    <TextField
                                        id= "team"
                                        label= "Team"
                                        value = {values.team}
                                        className = "hitter-team"
                                        onChange={handleChange}
                                        onBlur = {handleBlur}
                                        type = "text"
                                        margin="normal"
                                    />
                                    {errors.team && touched.team 
                                                ?	<FormHelperText className={"form error"}>
                                                    {errors.team}
                                                </FormHelperText>
                                                :	null
                                            }
                                </div>
                                <div className = "form-field">
                                    <TextField
                                        id= "scouting_report"
                                        label= "Scouting Report"
                                        multiline
                                        rowsMax="4"
                                        value = {values.scouting_report}
                                        className = "hitter-scouting-report"
                                        onChange={handleChange}
                                        onBlur = {handleBlur}
                                        type = "text"
                                        margin="normal"
                                    />
                                    {errors.scouting_report && touched.scouting_report 
                                                ?	<FormHelperText className={"form error"}>
                                                    {errors.scouting_report}
                                                </FormHelperText>
                                                :	null
                                            }
                                </div>
                                <div className = "form-field">
                                    <TextField
                                        id= "scouting_future_value"
                                        label= "Overall Grade"
                                        value = {values.scouting_future_value}
                                        className = "hitter-scouting-future-value"
                                        onChange={handleChange}
                                        onBlur = {handleBlur}
                                        type = "text"
                                        margin="normal"
                                    />
                                    {errors.scouting_future_value && touched.scouting_future_value 
                                                    ?	<FormHelperText className={"form error"}>
                                                        {errors.scouting_future_value}
                                                    </FormHelperText>
                                                    :	null
                                                }
                                </div>
                                <div className = "form-field">
                                    {
                                        <FieldArray name = "scouting_hitter_tools"> 
                                        {() => (
                                            <div className = "tool-cards">
                                                {
                                                    values.scouting_hitter_tools.map((d,index) => {
                                                        return (
                                                            <div key = {"hitter-tools" + index} className = "hitter-tools-container">
                                                                <label className = "tool-name-label"> {d.name} :</label>
                                                                <ToolsField grade = {d.grade} getIn = {getIn} errors = {errors} touched = {touched} handleBlur = {handleBlur} handleChange = {handleChange} index = {index} />
                                                            </div>
                                                        )
                                                    })
                                                }
                                            </div>
                                        )}
                                        </FieldArray>
                                    }
                                </div>
                            <div className = "submit-button-container">
                              <Button
                                variant="contained"
                                color="primary"
                                className="submit button"
                                type="submit"
                                disabled={isSubmitting}> Submit
                              </Button>
                              <Button
                                variant="contained"
                                color="secondary"
                                type="button"
                                className="reset button"
                                onClick={handleReset}
                                disabled={!dirty}
                              >
                                Reset
                              </Button>
                            </div>
                            </Paper>
                          </Form>
                       )
                    }
                  }
          </Formik>
        </div>
    )
}

export default HittingProspectForm;
