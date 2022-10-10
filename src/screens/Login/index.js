import { View, Text, Image } from 'react-native';
import React from 'react';
import images from '../../assets/index';
import { Button, TextInput } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { useForm, Controller } from 'react-hook-form';
import axios from '../../config/axios';
import { setData } from '../../utils/AsyncStorage';
const Login = () => {
  const [message, setMessage] = React.useState('');
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const navigation = useNavigation();

  const handeFormSubmit = async (params) => {
    try {
      let { data } = await axios.post('/login', params);
      if (data?.user) {
        console.log(data.user);
        await setData('user', JSON.stringify(data.user));
        navigation.navigate('AraNakliyeciyeAtanmisKargolar');
      } else {
        setMessage(data.response.data.message);
      }
    } catch (e) {
      setMessage(e.response.data.message);
    }
  };
  return (
    <View className="p-5 bg-white flex-1">
      <View>
        <Image source={images.logo} className="w-full h-32 mt-5" />
      </View>

      <View>
        <View className="mt-10">
          {message ? <Text className="text-red-500">{message}</Text> : null}
          <View className="mt-2">
            <Controller
              control={control}
              rules={{
                required: true,
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  mode="outlined"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  label={'E Posta'}
                  autoCapitalize={false}
                  selectionColor="#49A8DE"
                  underlineColor="#49A8DE"
                  outlineColor="#49A8DE"
                  underlineColorAndroid={'#49A8DE'}
                  activeOutlineColor="#49A8DE"
                />
              )}
              name="email"
            />
            {errors.email && <Text>Bu alanın doldurulması zorunludur.</Text>}
          </View>
          <View className="mt-2">
            <Controller
              control={control}
              rules={{
                required: true,
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  mode="outlined"
                  label={'Şifre'}
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  secureTextEntry={true}
                  selectionColor="#49A8DE"
                  underlineColor="#49A8DE"
                  outlineColor="#49A8DE"
                  underlineColorAndroid={'#49A8DE'}
                  activeOutlineColor="#49A8DE"
                />
              )}
              name="password"
            />
            {errors.password && <Text>Bu alanın doldurulması zorunludur.</Text>}
          </View>
          <View className="mt-2">
            <Button
              icon="login"
              mode="contained"
              onPress={handleSubmit(handeFormSubmit)}
              className="w-full py-1 rounded bg-[#49A8DE]"
            >
              Girip Yap
            </Button>
          </View>
        </View>
      </View>
    </View>
  );
};

export default Login;
