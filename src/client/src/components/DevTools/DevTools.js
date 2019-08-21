import React from 'react';
import { createDevTools } from 'redux-devtools';
import LogMonitor from 'redux-devtools-log-monitor';
import DockMonitor from 'redux-devtools-dock-monitor';

// Instructions for adding DevTools are found here:
// https://github.com/reduxjs/redux-devtools/blob/master/docs/Walkthrough.md

// createDevTools takes a monitor and produces a DevTools component
const DevTools = createDevTools(
  <DockMonitor
    toggleVisibilityKey="ctrl-h"
    changePositionKey="ctrl-q"
    defaultIsVisible={false}
  >
    <LogMonitor theme="monokai" />
  </DockMonitor>
);

export default DevTools;