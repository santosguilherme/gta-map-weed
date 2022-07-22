import * as React from 'react';
import { MapContainer, TileLayer, LayersControl, LayerGroup, Circle } from 'react-leaflet';
import WeedMapMarker from './WeedMapMarker';
import WeedFarmDialog from './WeedFarmDialog';
import MapSetViewOnClick from './MapSetViewOnClick';
import { CRS, extend, Projection, Transformation } from 'leaflet';

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

function GTAMap({ weedFarms }) {
  const [selected, setSelected] = React.useState(null);

  return (
    <>
      <MapContainer
        center={[0, 0]}
        zoom={3}
        scrollWheelZoom
        preferCanvas
        crs={CUSTOM_CRS}
        style={{ backgroundColor: 'rgb(21,62,106)' }}
      >
        <TileLayer
          minZoom={2}
          maxZoom={5}
          noWrap
          continuousWorld={false}
          url="mapStyles/styleSatelite/{z}/{x}/{y}.jpg"
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />
        <LayersControl position="topright">
          <LayersControl.Overlay checked name="Plantação de Maconha">
            <LayerGroup>
              {weedFarms.map(item => (
                <WeedMapMarker key={item.report} item={item} onOpen={setSelected}/>
              ))}
            </LayerGroup>
          </LayersControl.Overlay>
          <LayersControl.Overlay name="Teste">
            <LayerGroup>
              <Circle
                center={[0, 0]}
                pathOptions={{ fillColor: 'blue' }}
                radius={200}
              />
              <Circle
                center={[500, 500]}
                pathOptions={{ fillColor: 'red' }}
                radius={100}
                stroke={false}
              />
              <LayerGroup>
                <Circle
                  center={[1000, -1000]}
                  pathOptions={{ color: 'green', fillColor: 'green' }}
                  radius={100}
                />
              </LayerGroup>
            </LayerGroup>
          </LayersControl.Overlay>
        </LayersControl>
        <MapSetViewOnClick/>
      </MapContainer>
      <WeedFarmDialog item={selected} onClose={() => setSelected(null)}/>
    </>
  );
}

export default GTAMap;
