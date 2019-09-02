import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import { AppBar, Toolbar, Button } from '@material-ui/core'
import { Link } from "react-router-dom";


const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
}));

export default function NavTabs() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  function handleChange(event, newValue) {
    setValue(newValue);
  }

  return (
    <div className={classes.root}>
      <AppBar className = "Nav bar" position="static">
        <Toolbar>
        <div className = "button-container">
                <Link to={`/`}>
                <Button className = "button link" variant="contained" color="primary">Hitters Form</Button>
            </Link>
            <Link to={`/pitching`}>
                <Button className = "button link" variant="contained" color="primary">Pitchers Form</Button>
            </Link>
            <Link to={`/hitters/reports`}>
                <Button className = "button link" variant="contained" color="primary">Hitters Reports</Button>
            </Link>
            <Link to={`/pitchers/reports`}>
                <Button className = "button link" variant="contained" color="primary">Pitchers Reports</Button>
            </Link>
        </div>
        </Toolbar>
      </AppBar>
    </div>
  );
}