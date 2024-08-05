import { View, Text, StyleSheet } from 'react-native'
import React, { Dispatch, SetStateAction } from 'react'
import IconButton from './IconButton'
import { Link } from 'expo-router'
import { TouchableOpacity } from 'react-native'
import { ThemedText } from './ThemedText'
import { CameraMode } from 'expo-camera'

interface BottomRowToolsProps {
    cameraMode: CameraMode;
    setCameraMode: Dispatch<SetStateAction<CameraMode>>;
}

const BottomRowTools = ({ cameraMode, setCameraMode }: BottomRowToolsProps) => {
    return (
        <View style={[styles.direction, styles.bottomContainer]}>
            <Link href={"/media-library"} asChild>
                <IconButton iosName='photo.stack' androidName='image-outline' onPress={() => { }} />
            </Link>

            <View style={styles.direction}>
                <TouchableOpacity onPress={() => setCameraMode("picture")}>
                    <ThemedText style={{ fontWeight: cameraMode === "picture" ? "600" : "100" }}>Photo</ThemedText>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => setCameraMode("video")}>
                    <ThemedText style={{ fontWeight: cameraMode === "video" ? "600" : "100" }}>Video</ThemedText>
                </TouchableOpacity>
            </View>

            <Link href={"/media-library"} asChild>
                <IconButton iosName='magnifyingglass' androidName='add' onPress={() => { }} />
            </Link>
        </View>
    )
}

export default BottomRowTools

const styles = StyleSheet.create({
    direction: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
        paddingHorizontal: 10,
    },
    bottomContainer: {
        width: '100%',
        justifyContent: "space-between",
        position: "absolute",
        bottom: 6,
        alignSelf: "center",
    }
})