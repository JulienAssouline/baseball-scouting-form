import * as Yup from 'yup';

export const hitterValidation = Yup.object().shape({
                firstname: Yup.string()
                    .required("Required"),
                lastname: Yup.string()
                    .required("Required"),
                fullname: Yup.string(),
                position: Yup.string()
                    .required("Required"),
                team: Yup.string()
                    .required("Required"),
                scouting_report: Yup.string()
                    .required("Required"),
                scouting_future_value: Yup.number()
                    .min(20, "Number is too low")
                    .max(80, "Number is too high")
                    .required("Required"),
                scouting_hitter_tools: Yup.array().of(
                    Yup.object().shape({
                        name: Yup.string()
                          .required("Required"),
                        grade: Yup.number()
                        .min(20, "Number is too low")
                        .max(80, "Number is too high")
                        .required("Required")
                      })
                )
              })
    
export const pitcherValidation = Yup.object().shape({
                firstname: Yup.string()
                    .required("Required"),
                lastname: Yup.string()
                    .required("Required"),
                fullname: Yup.string(),
                position: Yup.string()
                    .required("Required"),
                team: Yup.string()
                    .required("Required"),
                scouting_report: Yup.string()
                    .required("Required"),
                scouting_future_value: Yup.number()
                    .min(20, "Number is too low")
                    .max(80, "Number is too high")
                    .required("Required"),
                scouting_pitches: Yup.array().of(
                    Yup.object().shape({
                        pitch_name: Yup.string()
                          .required("Required"),
                        grade: Yup.number()
                        .min(20, "Number is too low")
                        .max(80, "Number is too high")
                        .required("Required"),
                        velocity: Yup.number()
                        .required("Required")
                      })
                )
              })

