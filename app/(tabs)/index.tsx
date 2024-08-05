import React from 'react';
import { View } from 'react-native';
import { BarcodeScanningResult, CameraMode, CameraType, CameraView, FlashMode } from 'expo-camera';
import BottomRowTools from '@/components/BottomRowTools';
import MainRowAction from '@/components/MainRowAction';
import { openBrowserAsync, WebBrowserPresentationStyle } from 'expo-web-browser';
import QRCodeButton from '@/components/QRCodeButton';
import CameraTools from '@/components/CameraTools';
import { SafeAreaView } from 'react-native-safe-area-context';
import PictureView from '@/components/PictureView';
import VideoViewComponent from '@/components/VideoView';

export default function HomeScreen() {
  const cameraRef = React.useRef<CameraView>(null);
  const timeoutRef = React.useRef<NodeJS.Timeout | null>(null)

  // We set it to string because when the QrCode will be detected / Scan it will return a url.
  const [qrCodeDetected, setQrCodeDetected] = React.useState<string>("")
  const [isBrowsing, setIsBrowsing] = React.useState<Boolean>(false);
  const [cameraMode, setCameraMode] = React.useState<CameraMode>("picture")

  const [cameraZoom, setCameraZoom] = React.useState<number>(0)
  const [cameraFlash, setCameraFlash] = React.useState<FlashMode>('auto')
  const [cameraTorch, setCameraTorch] = React.useState<boolean>(false)
  const [cameraFacing, setCameraFacing] = React.useState<CameraType | undefined>('back')

  const [isRecording, setIsRecording] = React.useState<boolean>(false);

  const [picture, setPicture] = React.useState<string>("");
  const [video, setVideo] = React.useState<string>("");


  React.useEffect(() => {
    return () => {
      // Clean up timeout on unmount
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  async function handleTakePicture() {
    const response = await cameraRef.current?.takePictureAsync({
      // quality: 0.5,
      isImageMirror: false
    });

    // The exclamation marks tells typescript that response.uri will never be null
    setPicture(response!.uri);
  }

  async function handleTakeVideo() {

    setIsRecording(!isRecording);

    if (isRecording) {
      cameraRef.current?.stopRecording();

    } else {
      const res = await cameraRef.current?.recordAsync();
      setVideo(res!.uri)
    }


  }


  async function handleOpenQrCode() {
    setIsBrowsing(true);

    const browsingResult = await openBrowserAsync(qrCodeDetected, {
      presentationStyle: WebBrowserPresentationStyle.FORM_SHEET
    });

    if (browsingResult.type === "cancel" || browsingResult.type === "dismiss") {
      setIsBrowsing(false);
    }
  }

  function handleBarCodeScanned(scanningResult: BarcodeScanningResult) {

    if (scanningResult.data) {
      setQrCodeDetected(scanningResult.data)
    }

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      setQrCodeDetected("")
    }, 2000);

  }

  // if (isBrowsing) return null
  if (picture) return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ width: "100%", height: "100%" }}>
        <PictureView picture={picture} setPicture={setPicture} />
      </View>
    </SafeAreaView>
  )

  if (video) return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ width: "100%", height: "100%" }}>
        <VideoViewComponent video={video} setVideo={setVideo} />
      </View>
    </SafeAreaView>
  )

  return (


    <View style={{ flex: 1 }}>
      <CameraView
        mode={cameraMode}
        ref={cameraRef}
        zoom={cameraZoom}
        enableTorch={cameraTorch}
        flash={cameraFlash}
        facing={cameraFacing}
        barcodeScannerSettings={{
          barcodeTypes: ["qr"]
        }}
        onBarcodeScanned={handleBarCodeScanned}
        style={{ flex: 1 }}
      >

        <SafeAreaView style={{ flex: 1 }}>
          <View style={{ width: "100%", height: "100%" }}>
            {
              qrCodeDetected ? <QRCodeButton handleOpenQrCode={handleOpenQrCode} /> : null
            }

            <CameraTools
              cameraZoom={cameraZoom}
              cameraFlash={cameraFlash}
              cameraTorch={cameraTorch}
              cameraFacing={cameraFacing}
              setCameraFacing={setCameraFacing}
              setCameraFlash={setCameraFlash}
              setCameraTorch={setCameraTorch}
              setCameraZoom={setCameraZoom}
            />

            <MainRowAction
              handleTakePicture={cameraMode === "picture" ? handleTakePicture : handleTakeVideo}
              cameraMode={cameraMode}
              isRecording={isRecording}
            />

            <BottomRowTools
              cameraMode={cameraMode}
              setCameraMode={setCameraMode}
            />
          </View>
        </SafeAreaView>
      </CameraView>
    </View>

  );
}
