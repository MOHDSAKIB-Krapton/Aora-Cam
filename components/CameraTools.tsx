import { View, Text } from 'react-native'
import React from 'react'
import { CameraType, FlashMode } from 'expo-camera'
import IconButton from './IconButton';


interface CameraToolsProps {
    cameraZoom: number;
    cameraFlash: FlashMode;
    cameraTorch: boolean;
    cameraFacing: CameraType | undefined

    setCameraZoom: React.Dispatch<React.SetStateAction<number>>
    setCameraFlash: React.Dispatch<React.SetStateAction<FlashMode>>
    setCameraTorch: React.Dispatch<React.SetStateAction<boolean>>
    setCameraFacing: React.Dispatch<React.SetStateAction<CameraType | undefined>>
}

const CameraTools = ({
    cameraZoom,
    cameraFlash,
    cameraTorch,
    cameraFacing,

    setCameraFacing,
    setCameraFlash,
    setCameraTorch,
    setCameraZoom }: CameraToolsProps) => {
    return (


        <View style={{
            position: 'absolute',
            right: 10,
            top: 10,
            gap: 16
        }}>
            <IconButton
                iosName='flashlight.off.circle'
                androidName={cameraTorch ? 'flash' : 'flash-off'}
                onPress={() => setCameraTorch((prev) => !prev)}
            />
            <IconButton
                iosName='camera.rotate'
                androidName='camera-reverse'
                onPress={() => setCameraFacing((prev) => prev === "back" ? "front" : "back")}
            />
            <IconButton
                iosName='arrow.triangle.2.circlepath.camera'
                androidName='add'
                onPress={() => {
                    if (cameraZoom < 1) {
                        setCameraZoom(prev => prev + 0.1)
                    }
                }}
            />
            <IconButton
                iosName='arrow.triangle.2.circlepath.camera'
                androidName='remove'
                onPress={() => {
                    if (cameraZoom > 0) {
                        setCameraZoom(prev => prev - 0.1)
                    }
                }}
            />
            <IconButton
                iosName={cameraFlash === "on" ? 'flashlight.on.circle' : 'flashlight.off.circle'}
                androidName={cameraFlash === "on" ? 'flash' : 'flash-off'}
                onPress={() => setCameraFlash(prev => prev === "on" ? "off" : "on")}
            />

        </View>
    )
}

export default CameraTools