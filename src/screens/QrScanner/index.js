import { View, Text, StyleSheet, Button } from 'react-native';
import React, { useEffect, useState } from 'react';
import DefaultLayout from '../../layouts/DefaultLayout';
import { MaterialIcons } from '@expo/vector-icons';
import { BarCodeScanner } from 'expo-barcode-scanner';
import axios from '../../config/axios';
const QrScanner = ({ route }) => {
  // İzinler
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);

  const [qrData, setQrData] = useState(null);

  useEffect(() => {
    // Kullanıcı izin vermiş mi ?
    const getBarCodeScannerPermissions = async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    };

    getBarCodeScannerPermissions();
  }, []);

  // Yakalanan QRlar
  const handleBarCodeScanned = async ({ type, data }) => {
    setScanned(true);
    setQrData(`QR Kode başarıyla okundu: ${data}`);

    let response = await axios.post('/qr-kod-oku-mobil', {
      barcode: data,
      type: route.params.type,
    });

    console.log(response.data, route.params.type);
  };

  if (hasPermission === null) {
    return <Text>Kamerayı kullanmak için izin istiyoruz.</Text>;
  }
  if (hasPermission === false) {
    return <Text>Kamerayı kullanmak için uygulamaya izin vermemişsiniz</Text>;
  }

  return (
    <DefaultLayout back={true}>
      <View className="flex flex-row items-center space-x-2 justify-center my-3 border-b border-gray-400 pb-1 shadow ">
        <MaterialIcons name="qr-code-scanner" size={24} color="black" />
        <Text>QR Okuyucu</Text>
      </View>
      <View>
        <Text>{qrData ? qrData : 'QR Kodu okutunuz.'}</Text>
      </View>

      <View style={styles.container}>
        <BarCodeScanner
          onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
          style={StyleSheet.absoluteFillObject}
        />
        {scanned && (
          <Button
            title={'Tap to Scan Again'}
            onPress={() => setScanned(false)}
          />
        )}
      </View>
    </DefaultLayout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
  },
});

export default QrScanner;
