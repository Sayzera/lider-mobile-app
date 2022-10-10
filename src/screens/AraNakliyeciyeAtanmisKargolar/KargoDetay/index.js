import { View, Text, TouchableOpacity } from 'react-native';
import React, { useEffect } from 'react';
import DefaultLayout from '../../../layouts/DefaultLayout';
import { MaterialIcons } from '@expo/vector-icons';
import { Button, Card } from 'react-native-paper';
import { FontAwesome5 } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import axios from '../../../config/axios';

const KargoDetay = ({ route }) => {
  const { navigate, addListener } = useNavigation();
  const [kargoDurum, setKargoDurum] = React.useState({});

  const urunDurumlari = async () => {
    let { data } = await axios.post('/paketlerdeki_barkodlar_okundumu_mobil', {
      payment_number: route.params.data.payment_number,
    });

    setKargoDurum(data);
  };

  useEffect(() => {
    addListener('focus', () => {
      urunDurumlari();
    });
  }, []);

  return (
    <DefaultLayout back={true}>
      <View className="flex flex-row items-center space-x-2 justify-center my-3 border-b border-gray-400 pb-1 shadow ">
        <MaterialIcons name="details" size={24} color="black" />
        <Text>Kargo Detay</Text>
      </View>

      <Card className="bg-white p-2 mt-5">
        <View className="flex flex-column justify-between mt-10 ">
          <View className="flex flex-column items-center">
            <View className="flex flex-row items-start space-x-1">
              <FontAwesome5 name="truck-loading" size={24} color="#f28015" />
              <Text className="font-bold">
                {kargoDurum?.alinanlar}/{kargoDurum?.toplam} Ürünler Alındı
              </Text>
            </View>
            <View className="flex flex-row items-start space-x-1 mt-4">
              <FontAwesome5 name="truck-loading" size={24} color="#f28015" />
              <Text className="font-bold">
                {kargoDurum?.teslim_edilenler}/{kargoDurum?.toplam} Ürünler
                Teslim Edildi
              </Text>
            </View>
          </View>

          <View className="mt-10">
            <TouchableOpacity
              onPress={() =>
                navigate('QRList', {
                  payment_number: route.params.data.payment_number,
                })
              }
            >
              <Button className="bg-[#49A8DE]" mode="contained">
                <AntDesign name="qrcode" size={30} color="white" /> QR KOD
              </Button>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => {
                if (kargoDurum.alinanlar == kargoDurum.toplam) {
                  navigate('QRScanner', {
                    // 2 ürünleri teslim et
                    type: 2,
                    payment_number: route.params.data.payment_number,
                  });
                } else {
                  navigate('QRScanner', {
                    // 1 ürünü teslim et
                    type: 1,
                    payment_number: route.params.data.payment_number,
                  });
                }
              }}
            >
              {kargoDurum.alinanlar == kargoDurum.toplam ? (
                <Button
                  className="bg-[#49A8DE] mt-2 flex flex-row justify-center  "
                  mode="contained"
                >
                  <FontAwesome5 name="handshake" size={24} color="white" />

                  <Text> Teslim Et</Text>
                </Button>
              ) : (
                <Button
                  className="bg-[#49A8DE] mt-2 flex flex-row justify-center  "
                  mode="contained"
                >
                  <MaterialCommunityIcons
                    name="tanker-truck"
                    size={24}
                    color="white"
                  />
                  <Text> Ürünleri Al</Text>
                </Button>
              )}
            </TouchableOpacity>
          </View>
        </View>
      </Card>
      {kargoDurum.teslim_edilenler == kargoDurum.toplam && (
        <View className="mt-10 flex flex-column items-center">
          <MaterialCommunityIcons
            name="truck-delivery"
            size={100}
            color="#f28015"
          />

          <View className="flex flex-row items-center space-x-2">
            <Text className="text-center text-xl">Ürünler teslim edildi</Text>
            <FontAwesome5 name="check" size={24} color="green" />
          </View>
        </View>
      )}
    </DefaultLayout>
  );
};

export default KargoDetay;
