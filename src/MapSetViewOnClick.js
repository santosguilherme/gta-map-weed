import { useMapEvent } from 'react-leaflet';

function MapSetViewOnClick() {
  const map = useMapEvent('click', (e) => {
    console.log('clicking on ', e.latlng);

    map.setView(e.latlng, map.getZoom(), {
      animate: true,
    });
  });

  return null;
}

export default MapSetViewOnClick;
