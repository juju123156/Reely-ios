// App.tsx
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AppNavigation from '../app/components/navigations/AppNavigation.js';

const App: React.FC = () => {
  return (
    <NavigationContainer>
      <AppNavigation />
    </NavigationContainer>
  );
};

export default App;
