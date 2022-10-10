import { View, Text, TouchableOpacity } from 'react-native';
import React from 'react';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
const KargoItem = ({ data }) => {
  const { navigate } = useNavigation();

  return (
    <TouchableOpacity
      onPress={() =>
        navigate('KargoDetay', {
          data: data,
        })
      }
    >
      <View className="flex flex-row items-center space-x-3 mb-4">
        <View className="flex flex-row items-center space-x-3 flex-1">
          <MaterialCommunityIcons
            name="truck-cargo-container"
            size={30}
            color="black"
          />
          <View>
            <Text className="text-lg ">Kullanıcı Adı {data.kullanici_adi}</Text>
            <Text className="text-lg">
              Parça Sayısı{' '}
              <Text className="text-[#49A8DE]">{data.kargo_parca_sayisi}</Text>
            </Text>
            <Text>Kargo Numarası: {data.payment_number}</Text>
          </View>
        </View>

        <AntDesign name="doubleright" size={24} color="black" />
      </View>
    </TouchableOpacity>
  );
};

export default KargoItem;
