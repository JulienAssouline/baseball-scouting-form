import React from 'react';
import { Field, getIn } from 'formik'
import PitchInput from "./PitchInput"

function PitchesField(props) {
    const {index} = props
   return (
    <>
        <Field label = "Pitch" getIn= {getIn} name = {`scouting_pitches[${index}].pitch_name`} component = {PitchInput} />
        <Field label = "20-80 grade" getIn= {getIn} name = {`scouting_pitches[${index}].grade`} component = {PitchInput} />
        <Field label = "velocity" getIn= {getIn} name = {`scouting_pitches[${index}].velocity`} component = {PitchInput} />
    </>
  );
}

export default PitchesField;
