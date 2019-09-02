import React, {useState} from 'react';
import { useQuery } from '@apollo/react-hooks';
import { GET_HITTERS } from "../gql/queries"
import { Paper, Modal, makeStyles } from '@material-ui/core'
import "../css/hittersReports.css"

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

function HittersScoutingReports() {
    const classes = useStyles();

    const [open, setOpen] = useState({});

    const {loading, error, data} = useQuery(GET_HITTERS)

    if (loading) return <p>Loading...</p>
    if (error) return <p>Error :(</p>

    function handleOpen(id) {
        setOpen({[id]: true})
    }

    function handleClose() {
        setOpen(false)
    }

return (
    <div className = "hitters-reports-page">
        <h1> Hitters Prospects Reports </h1>
        <div className = "hitters-reports">
            {data.getHitters.map((d,i) => (
                <div key = {"card"+i}>
                <Paper onClick={() => handleOpen(d.id)} className = "card container">
                    <h1>{d.fullname}</h1>
                    <p> {d.position} </p>
                    <p> {d.team} </p>
                </Paper>
                <Modal
                     aria-labelledby="simple-modal-title"
                     aria-describedby="simple-modal-description"
                     open={ open[d.id] ? open[d.id] : false}
                     onClose={handleClose}
                     className = {"hitter modal"}
                   >
                     <div className={classes.paper}>
                       <div className = "modal-header">
                         <h2 id="simple-modal-title">{d.fullname}</h2> <h3 className = "pip">|</h3><h3>Grade: {d.scouting_future_value}</h3>
                       </div>
                       <div>
                            <p> Position: {d.position} </p>
                            <p> Team: {d.team} </p>
                       </div>
                       <span className = "grades-title">Scouting grades:</span>
                       <div className = "tools-container">
                            {d.getTools.map((tools, index) => (
                            <div className = "grades-container" key = {"tools"+index}>
                                <p className = "tools">{`${tools.name}: ${tools.grade}`}</p><div className="space"></div>
                            </div>
                            ))}
                       </div>
                       <p id="simple-modal-description">
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

export default HittersScoutingReports;
