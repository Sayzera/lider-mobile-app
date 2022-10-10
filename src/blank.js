import { View, Text } from 'react-native';
import React from 'react';
import DefaultLayout from '../../layouts/DefaultLayout';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const BlankScreen = () => {
  return (
    <DefaultLayout back={true}>
      <View className="flex flex-row items-center space-x-2 justify-center my-3 border-b border-gray-400 pb-1 shadow ">
        <MaterialCommunityIcons name="airplane-clock" size={24} color="black" />
        <Text>Başlık</Text>
      </View>
    </DefaultLayout>
  );
};

export default BlankScreen;
