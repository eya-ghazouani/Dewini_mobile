import React, { createContext, useState, useEffect , useRef} from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';

import socket from "./Socket";

Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: true,
      shouldSetBadge: false,
    }),
});

const SocketContext = createContext();

const ProvideSocketContext = ({ children }) => {

    const [show, setShow] = useState(null);
    const [expoPushToken, setExpoPushToken] = useState('');
    const [notification, setNotification] = useState(false);
    const notificationListener = useRef();
    const responseListener = useRef();

    useEffect(() => {
        socket.on("receive-notification", async ({ notif }) => {
            console.log(notif);
            click(notif);
        });
        
    }, [socket]);

    useEffect(() => {
        // getPermission();
    
        getPermission().then(token => setExpoPushToken(token));
    
        notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
          setNotification(notification);
        });
    
        responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
          console.log(response);
        });
    
        return () => {
          Notifications.removeNotificationSubscription(notificationListener.current);
          Notifications.removeNotificationSubscription(responseListener.current);
        };
    }, []);

    const getPermission = async () => {
        let token;
        if (Device.isDevice) {
          const { status: existingStatus } = await Notifications.getPermissionsAsync();
          let finalStatus = existingStatus;
          if (existingStatus !== 'granted') {
            const { status } = await Notifications.requestPermissionsAsync();
            finalStatus = status;
          }
          if (finalStatus !== 'granted') {
            alert('Failed to get push token for push notification!');
            return;
          }
          token = (await Notifications.getExpoPushTokenAsync()).data;
          console.log(token);
        } else {
          alert('Must use physical device for Push Notifications');
        }
    
        if (Platform.OS === 'android') {
          Notifications.setNotificationChannelAsync('default', {
            name: 'default',
            importance: Notifications.AndroidImportance.MAX,
            vibrationPattern: [0, 250, 250, 250],
            lightColor: '#FF231F7C',
          });
        }
    
        return token;
    
    }
    
    
      
    const click = async (msg) => {
        console.log('clicked');
        await Notifications.scheduleNotificationAsync({
          content: {
            title: "You've got notificatioon! 📬",
            body: msg,
            data: { data: 'goes here' },
          },
          trigger: { seconds: 1 },
        });
    }

    return (
        <SocketContext.Provider value={{ show, click }}>{children}</SocketContext.Provider>
    );
}

export {SocketContext, ProvideSocketContext}