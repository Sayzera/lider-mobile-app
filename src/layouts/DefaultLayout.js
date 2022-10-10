import { View, Text } from 'react-native';
import React from 'react';
import Back from '../components/Back';
const DefaultLayout = ({ children, back }) => {
  return (
    <View className="px-2 flex-1 bg-white">
      {back == true ? <Back /> : null}

      {children}
    </View>
  );
};

export default DefaultLayout;
