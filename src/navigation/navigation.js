import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AraNakliyeciyeAtanmisKargolar from '../screens/AraNakliyeciyeAtanmisKargolar';
import KargoDetay from '../screens/AraNakliyeciyeAtanmisKargolar/KargoDetay';
import Login from '../screens/Login';
import QRList from '../screens/QRList';
import QrScanner from '../screens/QrScanner';
const Stack = createNativeStackNavigator();

export const Router = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      {/* Ara Nakliyeci */}
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen
        name="AraNakliyeciyeAtanmisKargolar"
        component={AraNakliyeciyeAtanmisKargolar}
      />
      <Stack.Screen name="KargoDetay" component={KargoDetay} />
      {/* Ara Nakliyeci Bitiş */}

      {/**
       * QR List
       */}

      <Stack.Screen name="QRList" component={QRList} />
      {/* 
        QR Scanner
       */}
      <Stack.Screen name="QRScanner" component={QrScanner} />
    </Stack.Navigator>
  );
};
