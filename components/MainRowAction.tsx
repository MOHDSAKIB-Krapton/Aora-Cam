import { View, TouchableOpacity, StyleSheet, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import { CameraMode, PermissionStatus } from 'expo-camera';
import { SymbolView } from 'expo-symbols';
import { Colors } from '@/constants/Colors';
import { Ionicons } from '@expo/vector-icons';
import { ScrollView } from 'react-native';
import { Asset, getAlbumsAsync, getAssetsAsync, requestPermissionsAsync } from 'expo-media-library';
import { Image } from 'expo-image';
import PopupPhoto from './popupPhoto';

interface MainRowActionProps {
    handleTakePicture: () => void;
    cameraMode: CameraMode;
    isRecording: boolean;
}

const MainRowAction = ({
    handleTakePicture,
    cameraMode,
    isRecording
}: MainRowActionProps) => {

    const androidIconName = cameraMode === "picture" ? 'ellipse-outline' : "radio-button-on-outline";
    const androidIconColor = cameraMode === "picture" ? 'white' : isRecording ? Colors.light.snapPrimary : 'white';

    const [assets, setAssets] = useState<Asset[]>([])
    const [refresh, setRefresh] = React.useState<boolean>(false)
    const [popupPhoto, setPopupPhoto] = React.useState<Asset | undefined>(undefined);

    const getAlbum = async () => {

        const { status } = await requestPermissionsAsync();
        if (status !== PermissionStatus.GRANTED) {
            console.error("Media library permissions not granted.");
            return;
        }

        // Can use this function to get a specific album
        // const fetchedAlbums = await getAlbumsAsync();
        const fetchedAssets = await getAssetsAsync({
            mediaType: "photo",
            sortBy: "creationTime",
            first: 100,
            // album: fetchedAlbums[3].id
        });

        setAssets(fetchedAssets.assets)
    }

    useEffect(() => {
        getAlbum();
    }, [refresh]);

    const handleTakePictureAndRefresh = async () => {
        await handleTakePicture();
        setRefresh(!refresh);
    };


    return (


        <>
            <View style={styles.container}>

                <FlatList
                    data={assets}
                    renderItem={({ item }) => (
                        <TouchableOpacity onPress={() => setPopupPhoto(item)}>
                            <Image
                                id={item.id}
                                source={{ uri: item.uri }}
                                style={{
                                    width: 40,
                                    height: 60,
                                    borderRadius: 5
                                }}
                            />
                        </TouchableOpacity>
                    )}
                    horizontal
                    contentContainerStyle={{ gap: 5 }}
                    showsHorizontalScrollIndicator={false}
                    inverted
                />

                <TouchableOpacity onPress={handleTakePictureAndRefresh}>
                    <SymbolView
                        name={
                            cameraMode === "picture"
                                ? 'circle'
                                : isRecording
                                    ? "record.circle"
                                    : "circle.circle"
                        }
                        size={90}
                        type={'hierarchical'}
                        tintColor={isRecording ? Colors.light.snapPrimary : 'white'}
                        animationSpec={{
                            effect: {
                                type: isRecording ? "pulse" : "bounce"
                            },
                            repeating: isRecording
                        }}

                        fallback={<Ionicons name={androidIconName} size={90} color={androidIconColor} />}
                    />
                </TouchableOpacity>

                <ScrollView horizontal={true} contentContainerStyle={{ gap: 2 }} showsHorizontalScrollIndicator={false}>
                    {
                        [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15].map((index) => {
                            return (
                                <SymbolView
                                    key={index}
                                    name='face.dashed'
                                    size={40}
                                    fallback={<Ionicons name={"happy-outline"} size={40} color={"#ffffff90"} />}
                                />
                            )
                        })
                    }
                </ScrollView>

            </View>

            {
                popupPhoto ? <PopupPhoto popupPhoto={popupPhoto} setPopupPhoto={setPopupPhoto} /> : null
            }
        </>
    )
}

export default MainRowAction

const styles = StyleSheet.create({
    container: {
        width: "100%",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "row",
        position: "absolute",
        bottom: 45,
        height: 100,
        paddingHorizontal: 3,
    }
})
