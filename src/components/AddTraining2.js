import React from 'react';
import moment from 'moment';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

export default function AddTraining2(props) {

    const [open, setOpen] = React.useState(false);
    const [training, setTraining] = React.useState({
        activity: '', date: '', time: '', duration: '', customer: props.customer, datestamp: ''
    })

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleInputChange = (event) => {
        setTraining({ ...training, [event.target.name]: event.target.value })
        console.log(training.customer)

    }

    const AddTraining = () => {
        const date = setDate(training.date, training.time)
        training.datestamp = date;
        props.saveTraining(training)
        handleClose()
        console.log("training.datestamp: "+ training.datestamp)
        console.log("training.activity: "+ training.activity)
        console.log("training.duration: "+ training.duration)
        console.log("training.customer: " + training.customer)
        console.log("training.time: " + training.time)
        console.log("training.date: " + training.date)
        
    }

    const setDate = (day, time) => {
        //console.log("day + time = " + day + " " + time);

        const datestr = day + " " + time;
        if (!moment(datestr).isValid()) {console.log("ERROR ERRO ERROR ERROR REROROR ERROR")}
        let date = moment(datestr).toISOString(true);
        //let date = new Date(datestr);
        // eslint-disable-next-line no-extend-native
        //Date.prototype.toJSON = function(){ return moment(date.toISOString(true)).format(); }
        let datestring = JSON.stringify(date);
        console.log("PÄIVÄMÄÄRÄ: " + date);
        console.log("PÄIVÄMÄÄRÄ DATESTRINGINA: " + datestring)
        return datestring;
    }

    return (
        <div>
            <Button size="small" variant="outlined" color="secondary" onClick={handleClickOpen}>
                Add training
                </Button>

            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">New training:</DialogTitle>
                <DialogContent>

                    <TextField
                        autoFocus
                        margin="dense"
                        name="activity"
                        value={training.activity}
                        onChange={e => handleInputChange(e)}
                        label="activity"
                        fullWidth
                    />
                    <TextField
                        margin="dense"
                        name="date"
                        value={training.date}
                        onChange={e => handleInputChange(e)}
                        label="date (000-00-00)"
                        fullWidth
                    />
                    <TextField
                        margin="dense"
                        name="time"
                        value={training.time}
                        onChange={e => handleInputChange(e)}
                        label="time"
                        fullWidth
                    />
                    <TextField
                        margin="dense"
                        name="duration"
                        value={training.duration}
                        onChange={e => handleInputChange(e)}
                        label="duration"
                        fullWidth
                    />


                </DialogContent>

                <DialogActions>

                    <Button onClick={handleClose} color="primary">
                        Cancel
                    </Button>

                    <Button onClick={AddTraining} color="primary">
                        Save
                    </Button>

                </DialogActions>
            </Dialog>
        </div>
    )
}