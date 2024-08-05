import { Image, StyleSheet, Platform, Button, Alert, Linking } from 'react-native';

import { HelloWave } from '@/components/HelloWave';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { SymbolView } from 'expo-symbols';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Colors } from '@/constants/Colors';
import { usePermissions } from "expo-media-library"
import { useCameraPermissions, useMicrophonePermissions } from "expo-camera"
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router';
import ParallaxScrollView from '@/components/ParallaxScrollView';

export default function OnBoardingScreen() {

    // These permisson hooks returns a permission object and a function to request the permission

    const [mediaLibraryPermission, requestMediaLibraryPermission] = usePermissions();
    const [microphonePermission, requestMicrophonePermission] = useMicrophonePermissions();
    const [cameraPermission, requestCameraPermission] = useCameraPermissions();

    const handleContinue = async () => {

        let allPermissons = await requestAllPermission();
        if (allPermissons) {
            router.replace("(tabs)")
        } else {
            Alert.alert(
                "Permission error",
                "Please provide permissions to continue.",
                [
                    { text: "Cancel", style: "cancel" },
                    { text: "Open Settings", onPress: () => Linking.openSettings() }
                ]
            );
        }

    }


    // Async function to request all the permission and return the promise which resolves to boolean :- true if all permissions are granted else false
    const requestAllPermission = async (): Promise<Boolean> => {
        const cameraStatus = await requestCameraPermission();
        if (!cameraStatus.granted) {
            Alert.alert("Camera error", "Camera permission required");
            return false
        }

        const microphoneStatus = await requestMicrophonePermission();
        if (!microphoneStatus.granted) {
            Alert.alert("Microphone error", "Microphone permission required");
            return false
        }

        const mediaLibraryStatus = await requestMediaLibraryPermission();
        if (!mediaLibraryStatus.granted) {
            Alert.alert("Media error", "Permission required to manage media library");
            return false
        }

        // If all the permissions are granted then set the useropened in asyncstorage to keep track of the user
        await AsyncStorage.setItem("hadOpened", JSON.stringify(false));

        return true;
    }

    return (
        <ParallaxScrollView
            headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
            headerImage={
                // This symbol view will only be used in ios
                <SymbolView
                    name="camera.circle"
                    size={250}
                    colors={Colors.light.snapPrimary}
                    type='hierarchical'
                    animationSpec={{
                        effect: {
                            type: "bounce"
                        }
                    }}
                    // For android devices use this fallback 
                    fallback={
                        <Ionicons name="camera" size={250} color={Colors.light.snapPrimary} />
                    }
                />
            }>

            <ThemedView style={styles.titleContainer}>
                <ThemedText type="title">Welcome, AoraCam</ThemedText>
                <HelloWave />
                <ThemedText>
                    Hello user,  to provide the best experience we need some permissions as follows:
                </ThemedText>
            </ThemedView>

            <ThemedView style={styles.stepContainer}>
                <ThemedText type="subtitle">Camera Permission</ThemedText>
                <ThemedText>
                    🎥 Camera permission requires to click high quality images
                </ThemedText>
            </ThemedView>

            <ThemedView style={styles.stepContainer}>
                <ThemedText type="subtitle">MicroPhone Permission</ThemedText>
                <ThemedText>
                    🎙 MicroPhone permission requires to play audio in videos
                </ThemedText>
            </ThemedView>

            <ThemedView style={styles.stepContainer}>
                <ThemedText type="subtitle">Media Library Permission</ThemedText>
                <ThemedText>
                    📷 Media Library permission requires to access your Gallery
                </ThemedText>
            </ThemedView>

            <Button title='Continue' onPress={handleContinue} />



        </ParallaxScrollView>
    );
}

const styles = StyleSheet.create({
    titleContainer: {
        flexDirection: 'column',
        alignItems: 'flex-start',
        gap: 8,
    },
    stepContainer: {
        gap: 8,
        marginBottom: 8,
    },
    reactLogo: {
        height: 178,
        width: 290,
        bottom: 0,
        left: 0,
        position: 'absolute',
    },
});
