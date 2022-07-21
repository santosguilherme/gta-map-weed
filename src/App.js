import * as React from 'react';
import { CRS, Projection, Transformation, extend, Icon } from 'leaflet';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents, useMapEvent } from 'react-leaflet';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Carousel } from 'react-responsive-carousel';

import 'leaflet/dist/leaflet.css';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import './App.css';
import { Button } from '@mui/material';

const center_x = 117.3;
const center_y = 172.8;
const scale_x = 0.02072;
const scale_y = 0.0205;

const CUSTOM_CRS = extend({}, CRS.Simple, {
  projection: Projection.LonLat,
  scale: (zoom) => Math.pow(2, zoom),
  zoom: (sc) => Math.log(sc) / 0.6931471805599453,
  distance: function (pos1, pos2) {
    const xDifference = pos2.lng - pos1.lng;
    const yDifference = pos2.lat - pos1.lat;

    return Math.sqrt(xDifference * xDifference + yDifference * yDifference);
  },
  transformation: new Transformation(scale_x, center_x, -scale_y, center_y),
  infinite: true
});

function SetViewOnClick() {
  const map = useMapEvent('click', (e) => {
    console.log('clicking on ', e.latlng);

    map.setView(e.latlng, map.getZoom(), {
      animate: true,
    });
  });

  return null;
}

const weedIcon = new Icon(
  {
    iconUrl: '/weed.png',
    iconSize: [50, 50]
  }
);

function WeedMarker({ children, ...otherProps }) {
  return (
    <Marker {...otherProps} icon={weedIcon}>
      {children}
    </Marker>
  );
}

function App() {
  const [selected, setSelected] = React.useState(null);

  const data = [
    {
      date: '01/01/2020',
      strain: 'cepa: XXXXX',
      position: [-2686.585365853658, 1481.6602316602318],
      photos: ['https://i.imgur.com/rJmehTX.jpeg', 'https://i.imgur.com/vu0QMiB.png'],
      report: '#0001'
    },
    {
      date: '01/01/2020',
      strain: 'cepa: YYYY',
      position: [-2657.6219512195116, 1650.5791505791508],
      photos: ['https://i.imgur.com/gQLyqlP.jpeg', 'https://i.imgur.com/Vgi5ZKU.png'],
      report: '#0002'
    },
    {
      date: '01/01/2020',
      strain: 'cepa: ZZZZZZZ',
      position: [-1428.9634146341457, -937.4999999999999],
      photos: ['https://i.imgur.com/Iv6V3zG.jpeg', 'https://i.imgur.com/nrIIIJl.jpeg', 'https://i.imgur.com/ckvL5Ss.png'],
      report: '#0003'
    }
  ];
  return (
    <>
      <MapContainer center={[0, 0]} zoom={3} scrollWheelZoom preferCanvas crs={CUSTOM_CRS}>
        <TileLayer
          minZoom={2}
          maxZoom={5}
          noWrap
          continuousWorld={false}
          url="mapStyles/styleSatelite/{z}/{x}/{y}.jpg"
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />
        {data.map(item => (
          <WeedMarker key={item.report} position={item.position}>
            <Popup>
              <strong>{item.strain} - {item.date}</strong>
              <br/>
              Report: {item.report}
              <br/>
              <Button
                variant="outlined"
                onClick={() => {
                  setSelected(item);
                }}
              >
                Abrir
              </Button>
            </Popup>
          </WeedMarker>
        ))}
        <SetViewOnClick/>
      </MapContainer>
      {selected && (
        <Dialog
          open={typeof selected !== 'undefined'}
          onClose={() => setSelected(null)}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            Plantação ({selected.report})
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              <strong>{selected.strain} - {selected.date}</strong>
            </DialogContentText>

            <Carousel dynamicHeight showArrows renderIndicator={false}>
              {selected.photos.map((photo, index) => (
                <div key={photo}>
                  <img src={photo} alt={`#${index}`}/>
                </div>
              ))}
            </Carousel>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setSelected(null)}>Close</Button>
          </DialogActions>
        </Dialog>
      )}
    </>
  );
}

export default App;
