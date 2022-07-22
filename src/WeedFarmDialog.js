import * as React from 'react';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import { Carousel } from 'react-responsive-carousel';
import DialogActions from '@mui/material/DialogActions';
import { Avatar, Button, Grid, Paper, Typography } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import Draggable from 'react-draggable';

function PaperComponent(props) {
  return (
    <Draggable
      handle="#alert-dialog-title"
      cancel={'[class*="MuiDialogContent-root"]'}
    >
      <Paper {...props} />
    </Draggable>
  );
}

function WeedFarmDialog({ item, onClose }) {
  if (!item) {
    return null;
  }

  return (
    <Dialog
      open={true}
      onClose={onClose}
      aria-labelledby="alert-dialog-title"
      PaperComponent={PaperComponent}
    >
      <DialogTitle id="alert-dialog-title" style={{ cursor: 'move' }} >
        <Grid container alignItems="center" spacing={1}>
          <Grid item>
            <Avatar src="/weed.png" sx={{ width: 36, height: 36 }}/>
          </Grid>
          <Grid item xs>
            <Typography variant="h6">Plantação</Typography>
          </Grid>
        </Grid>
      </DialogTitle>
      <DialogContent dividers>
        <Grid container spacing={1}>
          <Grid item xs={12}>
            <Grid container spacing={1}>
              <Grid item xs={2}>
                <Typography variant="caption">Relatório</Typography>
                <Typography variant="subtitle2">{item.report}</Typography>
              </Grid>
              <Grid item xs={3}>
                <Typography variant="caption">Data</Typography>
                <Typography variant="subtitle2">{item.date}</Typography>
              </Grid>
              <Grid item xs={7}>
                <Typography variant="caption">Strain</Typography>
                <Typography variant="subtitle2">{item.strain}</Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Carousel dynamicHeight showArrows renderIndicator={false}>
              {item.photos?.map((photo, index) => (
                <div key={photo}>
                  <img src={photo} alt={`#${index}`}/>
                </div>
              ))}
            </Carousel>
          </Grid>
        </Grid>

      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Close</Button>
      </DialogActions>
    </Dialog>
  );
}

export default WeedFarmDialog;
