import { View, Text, FlatList } from 'react-native';
import React, { useEffect } from 'react';
import DefaultLayout from '../../layouts/DefaultLayout';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import KargoItem from '../../components/AraNakliyeci/KargoItem';
import { getData } from '../../utils/AsyncStorage';
import { useNavigation } from '@react-navigation/native';
import axios from '../../config/axios';

const AraNakliyeciyeAtanmisKargolar = () => {
  const [kargolar, setKargolar] = React.useState([]);
  const [user_id, setUser_id] = React.useState(null);
  const kullaniciKontrol = () => {
    const user = getData('user').then((data) => {
      if (data == null) {
        navigate('Login');
      }

      // Aranakliyeciye eşit değilse login sayfasına yönlendir şimdilik bir önlem
      if (data.type != 1) {
        navigate('Login');
      }
      setUser_id(data.id);

      console.log(data);
    });
  };

  const { navigate } = useNavigation();
  const navigation = useNavigation();
  useEffect(() => {
    navigation.addListener('focus', () => {
      kullaniciKontrol();
      sevkiyatlariGetir();
    });
  }, [user_id]);

  const sevkiyatlariGetir = async () => {
    getData('user').then(async (response) => {
      let { data } = await axios.post('/get_sevkiyatlar_mobil', {
        sevkiyatStatus: 1,
        user_id: response.id,
      });
      setKargolar(data.data);
    });
  };

  return (
    <DefaultLayout back={true}>
      <View className="flex flex-row items-center space-x-2 justify-center my-3 border-b border-gray-400 pb-1 shadow ">
        <MaterialCommunityIcons name="airplane-clock" size={24} color="black" />
        <Text>Ara Nakliye Bekleyen Kargolar</Text>
      </View>

      {/* Bekleyen her bir kargo gaz */}
      <FlatList
        data={kargolar}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => <KargoItem data={item} />}
        ItemSeparatorComponent={() => (
          <View className="border-b my-2 border-gray-300" />
        )}
      />
    </DefaultLayout>
  );
};

export default AraNakliyeciyeAtanmisKargolar;
