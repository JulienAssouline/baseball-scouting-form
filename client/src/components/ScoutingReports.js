import React, {useState} from 'react';
import { useQuery } from '@apollo/react-hooks';
import { GET_HITTERS } from "../gql/queries"
import { Paper, Modal, makeStyles } from '@material-ui/core'
import "../css/hittersReports.css"

const useStyles = makeStyles(theme => ({
    paper: {
      position: 'absolute',
      width: 400,
      backgroundColor: theme.palette.background.paper,
      border: '2px solid #000',
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },
  }));

function ScoutingReports() {
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

    

        console.log(open)
   return (
    <div className = "hitters-reports-page">
        <h1> Prospects Reports </h1>
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
                     open={open[d.id]}
                     onClose={handleClose}
                     className = {"hitter modal"}
                   >
                     <div className={classes.paper}>
                       <h2 id="simple-modal-title">{d.fullname}</h2>
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

export default ScoutingReports;
