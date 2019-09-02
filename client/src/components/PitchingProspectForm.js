import React from 'react';
import "../css/pitchersForm.css"
import { ADD_PITCHERS } from "../gql/mutations"
import { useMutation } from '@apollo/react-hooks';
import { Formik, Form, FieldArray, getIn } from 'formik'
import { pitcherValidation } from '../validationSchemas'
import { TextField, Button, Paper, FormHelperText } from '@material-ui/core'
import PitchesField from "./PitchesField"

const initialFormValues = {
	firstname: '',
	lastname: '',
	fullname: '',
	position: '',
	team: '',
	scouting_report: '',
	scouting_future_value: '',
    scouting_pitches: [
        {pitch_name: "", grade: "", velocity: ""},
    ],
} 

function PitchingProspectForm(props) {

    const [addPitcher, {data}] = useMutation(ADD_PITCHERS, {
        onCompleted(data) {
            props.history.push("/pitchers/reports")
          }
    })
  
    return (
        <div className="pitchers-form">
          <Formik
              initialValues = {initialFormValues}
              onSubmit={(values, { setSubmitting }) => {
                  console.log(values)
                  values.scouting_future_value = Number(values.scouting_future_value)
                  values.scouting_pitches.forEach(pitch => {
                    pitch.grade = Number(pitch.grade)
                    pitch.velocity = Number(pitch.velocity)
                  })
                  addPitcher({variables: {input: values}})

                setSubmitting(false);
            }}
              validationSchema = {
                pitcherValidation
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
                            <h1 className = "signup-or-login"> Pitcher Scouting Report </h1>
                            <Paper className = "pitchers form">
                            <div className = "form-field">
                              <TextField
                                    id= "firstname"
                                    label= "First Name"
                                    value = {values.firstname}
                                    className= "pitcher-firstname"
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
                                    className = "pitcher-lastname"
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
                                    className = "pitcher-fullname"
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
                                        className = "pitcher-position"
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
                                        className = "pitcher-team"
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
                                        className = "pitcher-scouting-report"
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
                                        className = "pitcher-scouting-future-value"
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
                                        <FieldArray name = "scouting_pitches"> 
                                        {({push}) => (
                                            <div>
                                                <div className = "pitch-cards">
                                                    {
                                                        values.scouting_pitches.map((d,index) => {
                                                            return (
                                                                <div key = {"pitches-tools" + index} className = "pitches-inputs-container">
                                                                    <PitchesField pitch_name = {d.pitch_name} velocity = {d.velocity} grade = {d.grade} getIn = {getIn} errors = {errors} touched = {touched} handleBlur = {handleBlur} handleChange = {handleChange} index = {index} />
                                                                </div>
                                                            )
                                                        })
                                                    }
                                                </div>
                                                <Button type = "button" onClick = {() => push({pitch_name: "", grade: "", velocity: ""})}> + Add new pitch </Button>
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

export default PitchingProspectForm;
