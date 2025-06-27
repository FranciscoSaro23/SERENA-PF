import React from 'react';
import AppNavigator from './src/AppNavigator';
import { ModoProvider } from './src/context/ModoContext';

export default function App() {
  return (
    <ModoProvider>
      <AppNavigator />
    </ModoProvider>
  );
}
