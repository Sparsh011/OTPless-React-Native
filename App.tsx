import React, { useCallback, useEffect } from 'react';
import { Alert, Linking } from 'react-native';
import type { PropsWithChildren } from 'react';
import {
  Button,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import { Colors } from 'react-native/Libraries/NewAppScreen';

type SectionProps = PropsWithChildren<{
  title: string;
}>;

function Section({ children, title }: SectionProps): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <View style={styles.sectionContainer}>
      <Text
        style={[
          styles.sectionTitle,
          {
            color: isDarkMode ? Colors.white : Colors.black,
          },
        ]}>
        {title}
      </Text>
      <Text
        style={[
          styles.sectionDescription,
          {
            color: isDarkMode ? Colors.light : Colors.dark,
          },
        ]}>
        {children}
      </Text>
    </View>
  );
}


// Code added for OTP-less integration - 

const WhatsAppLoginButton = () => {
  const handlePress = useCallback(async () => {
    const url = 'https://xyz.authlink.me?redirectUri=xyzotpless://otpless';
    const supported = await Linking.canOpenURL(url); // Even though Linking.canOpenURL returned false, the app is working

    console.log("supported", supported);

    Linking.openURL(url)
  }, []);

  return (
    <Button
      color="#25D366"
      title="Continue with WhatsApp"
      onPress={handlePress}
    />
  );
};


function App(): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };


  // Code added for OTP-less integration - 

  const handleDeepLink = async url  => {
    // console.log (url); // Extract waId from this url.
    // const newUrl = JSON.stringify(url)
    // const url2 = new URL(newUrl);
    // const waId = url2.searchParams.get('waId');
    // console.log(waId);

    // const url = {"url": "xyzotpless://otpless?waId=lji9u2yc"};d
    console.log("URL type - ", typeof url);
    

    // const searchParams = new URLSearchParams(new URL(url.url).search);
    // const waId = searchParams.get('waId');
    // console.log(searchParams);
    // const waId = urll.query.split('=')[1];
    // console.log(waId);

    
    // console.log(waId);
    
    
    // Send the waId to your server and pass the waId in getUserDetail API to retrieve the user detail.
    // Handle the signup/signin process here

    // const waId = url.url.substr(url.url.length - 8);
    const waId = url.url.split('=')[1] // doesn't work
    console.log("waid", waId);
    console.log(typeof url.url);
    
    



    // const url = "xyzotpless://otpless?waId=lji9u2yc"
    // const searchParams = new URLSearchParams(new URL(url).search);
    // const waId = searchParams.get('waId');


  };

  useEffect(() => {
    console.log("Here");

    const linkingEvent = Linking.addEventListener('url', handleDeepLink);
    Linking.getInitialURL().then(url => {
      if (url) {
        handleDeepLink({ url });
      }
    });
    return () => {
      linkingEvent.remove();
    };
  }, [handleDeepLink]);



  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <WhatsAppLoginButton />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
});

export default App;
