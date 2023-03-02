import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { datadogRum } from '@datadog/browser-rum'

datadogRum.init({
    applicationId: 'c15384a3-b21e-49e6-bc7e-8924a417b085',
    clientToken: 'pub807476bd9735f1ba197d53f163898610',
    site: 'datadoghq.com',
    service:'rum_apm',
    env:'test',
    
    // Specify a version number to identify the deployed version of your application in Datadog 
    // version: '1.0.0',
    sessionSampleRate: 100,
    sessionReplaySampleRate: 20,
    trackUserInteractions: true,
    trackResources: true,
    trackLongTasks: true,
    defaultPrivacyLevel:'mask-user-input',
    allowedTracingUrls: ["http://localhost:80", (url) => url.startsWith("http://localhost")]
});
    
datadogRum.startSessionReplayRecording();

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);


reportWebVitals();
