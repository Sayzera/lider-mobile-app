import { View, Text } from 'react-native';
import React from 'react';
import QRCode from 'react-native-qrcode-svg';
import { config } from '../config/config';
const QrKod = ({ data: { item } }) => {
  console.log(item);
  return (
    <View>
      <View className="mt-10">
        <View className="flex flex-column items-center mt-2">
          <QRCode value={item.barcode} />
          <Text>Barcode: {item.barcode}</Text>
        </View>
      </View>
    </View>
  );
};

export default QrKod;
