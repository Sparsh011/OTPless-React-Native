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
    const url = 'https://traya.authlink.me?redirectUri=trayaotpless://otpless';
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

  const handleDeepLink = async url => {
    console.log("url", url); // Extract waId from this url.
    const waId = new URLSearchParams(url.query).get('waId');
    // Send the waId to your server and pass the waId in getUserDetail API to retrieve the user detail.
    // Handle the signup/signin process here

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
