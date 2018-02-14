import React from 'react';
import dva from './utils/dva';
import Root from './Root';
import routerModel from './models/router';
import cameraModel from './models/camera';
import contentModel from './models/content';

//
const app = dva({
  initialState: {},
  models: [
    routerModel,
    cameraModel,
    contentModel
  ],
  onError(e) {
    alert(e);
  },
})

const App = app.start(<Root />);

export default App;
