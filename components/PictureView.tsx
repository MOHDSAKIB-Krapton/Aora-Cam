import { View, Text, Image, Alert, Dimensions } from 'react-native'
import React from 'react'
import IconButton from './IconButton';
import { saveToLibraryAsync } from 'expo-media-library';
import { shareAsync } from 'expo-sharing';

interface PictureViewProps {
    picture: string;
    setPicture: React.Dispatch<React.SetStateAction<string>>
}

const PictureView = ({ picture, setPicture }: PictureViewProps) => {

    const [isSaved, setIsSaved] = React.useState<boolean>(false)


    return (
        <View style={{
            flex: 1,
            backgroundColor: "#ffffff20",
            borderRadius: 20,

        }}>

            <View style={{
                position: 'absolute',
                right: 10,
                top: 20,
                gap: 16,
                zIndex: 1

            }}>

                <IconButton
                    iosName='arrow.down'
                    androidName={isSaved ? "checkmark-done-outline" : "download-outline"}
                    onPress={async () => {
                        if (!isSaved) {
                            await saveToLibraryAsync(picture);
                            setIsSaved(true)
                        }
                    }}
                />
                <IconButton
                    iosName='shared.with.you.circle'
                    androidName='share-social-outline'
                    onPress={() => shareAsync(picture)}
                />
            </View>

            <View style={{
                position: 'absolute',
                left: 10,
                top: 20,
                zIndex: 1

            }}>
                <IconButton
                    iosName='calendar.circle'
                    androidName='close'
                    onPress={() => {
                        setPicture("")
                    }}
                />
            </View>


            <Image
                source={{ uri: picture }}
                style={{
                    width: '100%',
                    height: '100%',
                    resizeMode: 'cover',
                    borderRadius: 20,
                    // borderWidth: 2,
                    // borderColor: "pink"
                }}
            />
        </View>
    )
}

export default PictureView