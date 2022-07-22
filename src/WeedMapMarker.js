import * as React from 'react';
import { Icon } from 'leaflet';
import { Marker, Popup, Tooltip } from 'react-leaflet';
import { Avatar, Button, Divider, Grid, Typography } from '@mui/material';

const weedIcon = new Icon(
  {
    iconUrl: '/weed.png',
    iconSize: [50, 50],
    iconAnchor: [25, 35]
  }
);

function WeedMapMarker({ onOpen, item }) {
  return (
    <Marker position={item.position} icon={weedIcon}>
      <Popup>
        <Grid container alignItems="center" spacing={1}>
          <Grid item>
            <Avatar src="/weed.png" sx={{ width: 32, height: 32 }}/>
          </Grid>
          <Grid item xs>
            <Typography variant="h6">Plantação</Typography>
          </Grid>
          <Grid item xs={12}>
            <Divider style={{ minWidth: 200 }}/>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="caption">Relatório</Typography>
            <Typography variant="subtitle2" gutterBottom>{item.report}</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="caption">Data</Typography>
            <Typography variant="subtitle2" gutterBottom>{item.date}</Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="caption">Strain</Typography>
            <Typography variant="subtitle2">{item.strain}</Typography>
          </Grid>
          <Grid item xs={12}>
            <Divider style={{ minWidth: 200 }}/>
          </Grid>
          <Grid item xs={12} textAlign="center">
            <Button
              variant="outlined"
              size="small"
              onClick={() => {
                onOpen(item);
              }}
            >
              Abrir
            </Button>
          </Grid>
        </Grid>
      </Popup>
      <Tooltip><Typography variant="caption">{item.strain}</Typography></Tooltip>
    </Marker>
  );
}

export default WeedMapMarker;
