import { View, Text, Image, TouchableOpacity } from 'react-native'
import React, { Dispatch, SetStateAction } from 'react'
import { Ionicons } from '@expo/vector-icons'
import { Asset } from 'expo-media-library'

interface PopupPhotoProps {
    popupPhoto: Asset;
    setPopupPhoto: Dispatch<SetStateAction<Asset | undefined>>;
}

const PopupPhoto = ({ popupPhoto, setPopupPhoto }: PopupPhotoProps) => {

    // const [popupPhoto, setPopupPhoto] = React.useState<Asset>();

    return (
        <>
            {
                popupPhoto ? (
                    <View style={{ position: 'absolute', width: "100%", height: "100%", backgroundColor: "#00000099", alignItems: 'center', justifyContent: 'center' }} >
                        <View style={{ height: "90%", width: "80%", borderWidth: 1, borderColor: "white", borderRadius: 20, backgroundColor: "#000000" }}>
                            <Image source={{ uri: popupPhoto.uri }} style={{ width: "100%", height: "100%", borderRadius: 20 }} resizeMode='contain' />

                            <TouchableOpacity onPress={() => setPopupPhoto(undefined)} style={{ position: 'absolute', top: -5, left: -5, padding: 3, backgroundColor: "#000000", borderRadius: 100 }} >
                                <Ionicons name="close" size={20} color={"white"} />
                            </TouchableOpacity>
                        </View>
                    </View>
                ) : null

            }
        </>
    )
}

export default PopupPhoto