import * as React from 'react';
import GTAMap from './GTAMap';
import weedFarms from './data/weed-farm/data.json';

import 'leaflet/dist/leaflet.css';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import './App.css';

function App() {
  return (
    <GTAMap weedFarms={weedFarms}/>
  );
}

export default App;
