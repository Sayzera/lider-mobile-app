import { View, Text, TouchableOpacity } from 'react-native';
import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { MaterialIcons } from '@expo/vector-icons';
import { removeStorageData } from '../utils/AsyncStorage';
const Back = () => {
  const { goBack, navigate } = useNavigation();

  return (
    <View className="py-2 bg-white">
      <View className="flex flex-row justify-between items-center bg-white">
        <TouchableOpacity onPress={() => goBack()}>
          <Ionicons name="arrow-back-circle-outline" size={30} color="black" />
        </TouchableOpacity>
        <View className="rounded-md flex flex-row space-x-5">
          <TouchableOpacity>
            <MaterialIcons name="person" size={24} color="black" />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() =>
              removeStorageData().then(() => {
                navigate('Login');
              })
            }
          >
            <MaterialIcons name="logout" size={24} color="black" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default Back;
