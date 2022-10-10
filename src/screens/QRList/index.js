import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import React from 'react';
import DefaultLayout from '../../layouts/DefaultLayout';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import QrKod from '../../components/QrKod';
import axios from '../../config/axios';

const QRList = ({ route }) => {
  // get params
  const [qrList, setQrList] = React.useState([]);

  const qrKodlariGetir = async () => {
    console.log('data', route.params.payment_number);
    let { data } = await axios.post('/kargo_bilgilerini_getir_mobil', {
      data: route.params.payment_number,
    });
    setQrList(data.data);
  };

  React.useEffect(() => {
    qrKodlariGetir();
  }, []);

  // const qrKodlariGetir = async () => {
  //  let {data} =  await axios.post('/kargo_bilgilerini_getir_mobil', {
  //   data:
  //  })
  // };
  return (
    <DefaultLayout back={true}>
      <View className="flex flex-row items-center space-x-2 justify-center my-3 border-b border-gray-400 pb-1 shadow ">
        <MaterialCommunityIcons name="qrcode-edit" size={24} color="black" />
        <Text>QR Listesi</Text>
      </View>

      <TouchableOpacity onPress={() => console.log('printed')}>
        <View className="flex flex-row justify-end mt-2 mr-5">
          <MaterialCommunityIcons
            name="printer-wireless"
            size={30}
            color="black"
          />
        </View>
      </TouchableOpacity>

      {/* QR Listesi */}
      <FlatList
        data={qrList}
        keyExtractor={(item, index) => index.toString()}
        renderItem={(item) => <QrKod data={item} />}
      />
    </DefaultLayout>
  );
};

export default QRList;
