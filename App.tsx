import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import LoginScreen from "./app/login";
import RegisterScreen from "./app/register";
import RegisterCandidateScreen from "./app/CandidateStep1";
import RegisterCompanyScreen from "./app/registerCompany";
import HomeScreen from "./app/home";
import MatchScreen from "./app/match";
import ChatScreen from "./app/chat";
import PerfilScreen from "./app/PerfilScreen";
import ChatDetail from "./app/ChatDetail";
import Config from "./app/Config";
import PerfilDetalhado from "./app/PerfilDetalhado";
import StartScreen from "./app/StartScreen";
import SearchScreen from "./app/SearchScreen";
import CandidateStep1 from "./app/CandidateStep1";
import CandidateStep2 from "./app/CandidateStep2";
import CandidateStep3 from "./app/CandidateStep3";
import CandidateStep4 from "./app/CandidateStep4";
import CandidateStep5 from "./app/CandidateStep5";
import CandidateStep6 from "./app/CandidateStep6";

import { RootStackParamList } from "./types/index";

const Stack = createStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{ headerShown: false }}
        initialRouteName="login"
      >
        <Stack.Screen name="login" component={LoginScreen} />
        <Stack.Screen name="register" component={RegisterScreen} />
        <Stack.Screen name="CandidateStep1" component={CandidateStep1} />
        <Stack.Screen name="CandidateStep2" component={CandidateStep2} />
        <Stack.Screen name="CandidateStep3" component={CandidateStep3} />
        <Stack.Screen name="CandidateStep4" component={CandidateStep4} />
        <Stack.Screen name="CandidateStep5" component={CandidateStep5} />
        <Stack.Screen name="CandidateStep6" component={CandidateStep6} />
        <Stack.Screen
          name="registerCompany"
          component={RegisterCompanyScreen}
        />
        <Stack.Screen name="home" component={HomeScreen} />
        <Stack.Screen name="match" component={MatchScreen} />
        <Stack.Screen name="chat" component={ChatScreen} />
        <Stack.Screen name="ChatDetail" component={ChatDetail} />
        <Stack.Screen name="Config" component={Config} />
        <Stack.Screen name="PerfilDetalhado" component={PerfilDetalhado} />
        <Stack.Screen name="StartScreen" component={StartScreen} />
        <Stack.Screen name="SearchScreen" component={SearchScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
