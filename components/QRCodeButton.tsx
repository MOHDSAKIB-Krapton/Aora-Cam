import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { ThemedText } from './ThemedText';
import IconButton from './IconButton';

export interface QRCodeButtonProps {
    handleOpenQrCode: () => void;
}

const QRCodeButton = ({ handleOpenQrCode }: QRCodeButtonProps) => {
    return (
        <TouchableOpacity
            onPress={handleOpenQrCode}
            style={{
                width: 200,
                alignItems: 'center',
                top: "65%",
                alignSelf: 'center',
                padding: 6,
                borderWidth: 3,
                borderRadius: 10,
                borderStyle: 'dashed',
                borderColor: "#FFF"
            }}
        >
            <IconButton androidName='qr-code' iosName='qrcode' />
            <ThemedText type='defaultSemiBold' style={{ color: "white" }}>QR Code Detected</ThemedText>
        </TouchableOpacity>
    )
}

export default QRCodeButton