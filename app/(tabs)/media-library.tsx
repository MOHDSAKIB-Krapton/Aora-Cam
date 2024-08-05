import { View, SafeAreaView, Image, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native'
import React, { useEffect } from 'react'
import { Asset, getAlbumsAsync, getAssetsAsync } from 'expo-media-library'
import PopupPhoto from '@/components/popupPhoto'

const Gallery = () => {

    const [library, setLibrary] = React.useState<Asset[]>([])
    const [isLoading, setLoading] = React.useState<boolean>(true);
    const [popupPhoto, setPopupPhoto] = React.useState<Asset | undefined>(undefined);

    const galleryAsync = async () => {
        try {

            const fetchalbum = await getAlbumsAsync();
            console.log("fetchedALbum", fetchalbum)

            const gallery = await getAssetsAsync({
                mediaType: ['photo'], // Specify 'photo' to get all photos
                sortBy: 'creationTime',
                first: 100, // Adjust this number to get more photos if needed
            });

            setLibrary(gallery.assets);
        } catch (error) {
            console.error("Error fetching assets: ", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        galleryAsync();
    }, []);

    return (
        <SafeAreaView style={{ flex: 1, marginTop: 5, paddingHorizontal: 3, justifyContent: 'center', alignItems: 'center' }}>
            {
                isLoading ?
                    <ActivityIndicator size="large" color="#0000ff" style={{ position: 'absolute', top: "50%", left: "47%" }} />
                    :
                    <ScrollView style={{ width: "100%", marginHorizontal: "auto" }}>
                        <View style={{ display: 'flex', flexWrap: 'wrap', flexDirection: 'row', gap: 5 }} >
                            {
                                library.map((asset) => (
                                    <TouchableOpacity key={asset.id} onPress={() => setPopupPhoto(asset)}>
                                        <Image source={{ uri: asset.uri }} style={{ width: 130, height: 200, borderRadius: 10 }} />
                                    </TouchableOpacity>
                                ))
                            }
                        </View>
                    </ScrollView>
            }

            {
                popupPhoto ? (
                    <PopupPhoto popupPhoto={popupPhoto} setPopupPhoto={setPopupPhoto} />
                ) : null

            }

        </SafeAreaView>
    )
}

export default Gallery