import { View } from "react-native";
import React from "react";
import IconButton from "./IconButton";
import { saveToLibraryAsync } from "expo-media-library";
import { shareAsync } from "expo-sharing";
import { ResizeMode, Video } from "expo-av";

interface VideoViewComponentProps {
    video: string;
    setVideo: React.Dispatch<React.SetStateAction<string>>;
}

const VideoViewComponent = ({ video, setVideo }: VideoViewComponentProps) => {

    const [isSaved, setIsSaved] = React.useState<boolean>(false);
    const [isPlaying, setIsPlaying] = React.useState<boolean>(true);

    const videoRef = React.useRef<Video>(null);

    return (
        <View
            style={{
                flex: 1,
                backgroundColor: "#ffffff20",
                borderRadius: 20,
            }}
        >
            <View
                style={{
                    position: "absolute",
                    right: 10,
                    top: 20,
                    gap: 16,
                    zIndex: 1,
                }}
            >
                <IconButton
                    iosName="arrow.down"
                    androidName={isSaved ? "checkmark-done-outline" : "download-outline"}
                    onPress={async () => {
                        if (!isSaved) {
                            await saveToLibraryAsync(video);
                            setIsSaved(true);
                        }
                    }}
                />
                <IconButton
                    iosName="shared.with.you.circle"
                    androidName="share-social-outline"
                    onPress={() => shareAsync(video)}
                />
                <IconButton
                    iosName="shared.with.you.circle"
                    androidName={isPlaying ? "play" : "pause"}
                    onPress={() => {
                        if (isPlaying) {
                            videoRef.current!.pauseAsync()
                        } else {
                            videoRef.current!.playAsync()
                        }
                        setIsPlaying(!isPlaying);
                    }}
                />
                {/* <IconButton
                    iosName="shared.with.you.circle"
                    androidName="pause"
                    onPress={() => shareAsync(video)}
                /> */}
            </View>

            <View
                style={{
                    position: "absolute",
                    left: 10,
                    top: 20,
                    zIndex: 1,
                }}
            >
                <IconButton
                    iosName="calendar.circle"
                    androidName="close"
                    onPress={() => {
                        setVideo("");
                    }}
                />
            </View>

            <Video
                ref={videoRef}
                source={{
                    uri: video,
                }}
                style={{
                    width: "100%",
                    height: "100%",
                    borderRadius: 20,

                }}
                useNativeControls={false}
                isLooping={true}
                shouldPlay={true}
                isMuted={false}
                resizeMode={ResizeMode.CONTAIN}
            />
        </View>
    );
};

export default VideoViewComponent;
