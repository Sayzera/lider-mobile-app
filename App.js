import { Provider as PaperProvider } from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';
import { Router } from './src/navigation/navigation';
import { View } from 'react-native';
import GlobalStyle from './src/utils/GlobalStyles';

import { useCallback, useEffect, useState } from 'react';

export default function App() {
  return (
    <PaperProvider>
      <NavigationContainer>
        <View style={GlobalStyle.droidSafeArea}>
          <Router />
        </View>
      </NavigationContainer>
    </PaperProvider>
  );
}

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });
