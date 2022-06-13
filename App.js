import 'react-native-gesture-handler';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { ProvideSocketContext } from './hooks/SocketContext';
import { ProvidContext } from './hooks/MainContext';
import Splachscreen from './screens/Auth/Splachscreen';
import LoginScreen from './screens/Auth/LoginView';
import RegisterScreen from './screens/Auth/RegisterView';
import AuthNav from './navigations/AuthNav';
export default function App() {


  //localhost won't work cuz u running the code on your phne using expo so the phone won't know "localhost "
  //we have to use the ip adress " opn CMD and use command "ipconfig" and use the sans-fil IPV06 u will find ""
  global.path = 'http://192.168.43.49:4000';

  return (
    // <ProvideSocketContext>
      <ProvidContext>
        <NavigationContainer>
          {/* <RegisterScreen /> */}
          <AuthNav />
        </NavigationContainer>
      </ProvidContext>
    // </ProvideSocketContext>
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
