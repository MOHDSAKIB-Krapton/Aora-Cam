import { TouchableOpacity } from 'react-native'
import React, { ComponentProps } from 'react'
import { SFSymbol, SymbolView } from 'expo-symbols'
import { Ionicons } from '@expo/vector-icons';
import { StyleProps } from 'react-native-reanimated';

const ICON_SIZE = 24;
const CONTAINER_PADDING = 5;
const CONTAINER_WIDTH = 34;

interface IconButtonProps {
  iosName: SFSymbol;
  androidName: ComponentProps<typeof Ionicons>["name"];
  containerStyle?: StyleProps;
  onPress?: () => void;
  width?: number;
  height?: number;
}

const IconButton = ({
  iosName,
  androidName,
  containerStyle,
  onPress,
  width,
  height
}: IconButtonProps) => {


  return (

    <TouchableOpacity
      activeOpacity={0.4}
      onPress={onPress}
      style={[{
        backgroundColor: "#00000050",
        padding: CONTAINER_PADDING,
        borderRadius: (CONTAINER_WIDTH + CONTAINER_PADDING * 2) / 2,
        width: CONTAINER_WIDTH,
      }, containerStyle]}
    >

      <SymbolView
        name={iosName}
        size={ICON_SIZE}
        style={width && height ? { width, height } : {}}
        tintColor={"white"}
        fallback={<Ionicons name={androidName} size={ICON_SIZE} color={"white"} />}
      />

    </TouchableOpacity>
  )
}

export default IconButton