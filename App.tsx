import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { Provider } from 'react-redux';
import MainApp from './app/MainApp/MainApp';
import { store } from './app/store/store';
import { useFonts } from 'expo-font';
import AlertModal from './app/components/Modals/AlertModal';
import ConfirmationModal from './app/components/Modals/ConfirmationModal';
import { useEffect } from 'react';
import Geocoder from 'react-native-geocoding';

export default function App() {
  let [fontsLoaded] = useFonts({
    'Poppins-Thin': require('./assets/fonts/Poppins-Thin.ttf'),
    'Poppins-Light': require('./assets/fonts/Poppins-Light.ttf'),
    'Poppins-ExtraLight': require('./assets/fonts/Poppins-ExtraLight.ttf'),
    'Poppins-Regular': require('./assets/fonts/Poppins-Regular.ttf'),
    'Poppins-Medium': require('./assets/fonts/Poppins-Medium.ttf'),
    'Poppins-MediumItalic': require('./assets/fonts/Poppins-MediumItalic.ttf'),
    'Poppins-SemiBold': require('./assets/fonts/Poppins-SemiBold.ttf'),
    'Poppins-SemiBoldItalic': require('./assets/fonts/Poppins-SemiBoldItalic.ttf'),
    'Poppins-Bold': require('./assets/fonts/Poppins-Bold.ttf'),
    'Poppins-ExtraBold': require('./assets/fonts/Poppins-ExtraBold.ttf'),
    'Poppins-Black': require('./assets/fonts/Poppins-Black.ttf'),
  });
  
  useEffect(() => {
    Geocoder.init(process.env.EXPO_PUBLIC_API_KEY as string);
  }, [])

  return (
    <>
      {fontsLoaded ? (
        <Provider store={store}>
          <AlertModal />
          <ConfirmationModal />
          {/* <FlashMessage position = "top" style = {{marginTop: StatusBar.currentHeight}} /> */}
          {/* <CustomLoader /> */}
          <MainApp />
        </Provider>
      ) : (null)}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

