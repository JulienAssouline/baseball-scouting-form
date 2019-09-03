import React, {useState} from 'react';
import { useQuery } from '@apollo/react-hooks';
import { GET_PITCHERS } from "../gql/queries"
import { Paper, Modal, makeStyles } from '@material-ui/core'
import "../css/pitchersReports.css"

const useStyles = makeStyles(theme => ({
    paper: {
      position: 'absolute',
      width: 500,
      backgroundColor: theme.palette.background.paper,
      border: '2px solid #000',
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },
  }));

function PitchersScoutingReports() {
    const classes = useStyles();

    const [open, setOpen] = useState({});

    const {loading, error, data} = useQuery(GET_PITCHERS)

    if (loading) return <p>Loading...</p>
    if (error) return <p>Error :(</p>

    function handleOpen(id) {
        setOpen({[id]: true})
    }

    function handleClose() {
        setOpen(false)
    }

    data.getPitchers.forEach((d,i) => {
        d.getPitches.sort((a,b) => {
            return Number(a.id) - Number(b.id)
        })
    })

return (
    <div className = "pitchers-reports-page">
        <h1> Pitcher Prospect Report </h1>
        <div className = "pitchers-reports">
            {data.getPitchers.map((d,i) => (
                <div key = {"card"+i}>
                <Paper onClick={() => handleOpen(d.id)} className = "card container">
                    <h1 className = "full-name">{d.fullname}</h1>
                    <p> {d.position.toUpperCase()} </p>
                    <p className = "team-text"> {d.team} </p>
                </Paper>
                <Modal
                     aria-labelledby="simple-modal-title"
                     aria-describedby="simple-modal-description"
                     open={open[d.id] ? open[d.id] : false}
                     onClose={handleClose}
                     className = {"pitcher modal"}
                   >
                     <div className={classes.paper}>
                       <div className = "modal-header">
                         <h2 className = "full-name">{d.fullname}</h2> <h3 className = "pip">|</h3><h3>Grade: {d.scouting_future_value}</h3>
                       </div>
                       <div>
                            <p> Position: {d.position.toUpperCase()} </p>
                            <p className = "team-text"> Team: {d.team} </p>
                       </div>
                       <span className = "grades-title">Scouting grades:</span>
                       <div className = "pitches-container">
                            {d.getPitches.map((pitch, index) => (
                                <div className = "grades-container" key = {"pitches"+index}>
                                    <p className = "pitches">{`${pitch.pitch_name}: ${pitch.grade}`}</p><div className="space"></div>
                                </div>
                            ))}
                       </div>
                       <span className = "grades-title">Scouting velocity:</span>
                       <div className = "pitches-container">
                            {d.getPitches.map((pitch, index) => (
                                <div className = "velocity-container" key = {"pitches"+index}>
                                    <p className = "pitches">{`${pitch.pitch_name}: ${pitch.velocity}`}</p><div className="space"></div>
                                </div>
                            ))}
                       </div>
                       <p className="scounting-report-modal-text">
                         {d.scouting_report}
                       </p>
                     </div>
                   </Modal>
                   </div>
            ))}
        </div>
   </div>
  );
}

export default PitchersScoutingReports;
