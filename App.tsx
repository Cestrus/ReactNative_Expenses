import React from 'react';
import { StatusBar } from 'expo-status-bar';
// import { StyleSheet, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { BottomTabNavigationOptions, createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from '@expo/vector-icons/Ionicons';

import AllExpensesScreen from './screens/AllExpenses/AllExpensesScreen';
import RecentExpensesScreen from './screens/RecentExpenses/RecentExpensesScreen';
import ManageExpenseScreen from './screens/ManageExpense/ManageExpenseScreen';

import { BottomTabParamListType, StackParamListType } from './globalTypes/routingTypes';
import { GlobalStyles } from './constans/styles';
import IconButton from './components/UI/IconButton/IconButton';
import ExpenseContextProviver from './store/expenses-context';

const Stack = createNativeStackNavigator<StackParamListType>();
const BottonTab = createBottomTabNavigator<BottomTabParamListType>();

const ExpensesOverview: React.FC = () => {
  return (
    <BottonTab.Navigator
      screenOptions={({ navigation }): BottomTabNavigationOptions => ({
        headerStyle: {
          backgroundColor: GlobalStyles.colors.primary500,
        },
        headerTintColor: 'white',
        tabBarStyle: {
          backgroundColor: GlobalStyles.colors.primary500,
        },
        tabBarActiveTintColor: GlobalStyles.colors.accent500,
        headerRight: ({ tintColor }) => (
          <IconButton
            color={tintColor}
            size={24}
            icon='add'
            onPress={(): void => {
              navigation.navigate('ManageExpense');
            }}
          />
        ),
      })}
    >
      <BottonTab.Screen
        name='RecentExpenses'
        component={RecentExpensesScreen}
        options={{
          title: 'Recent Expenses',
          tabBarLabel: 'Recent',
          tabBarIcon: ({ color, size }) => <Ionicons name='hourglass' size={size} color={color} />,
        }}
      />
      <BottonTab.Screen
        name='AllExpenses'
        component={AllExpensesScreen}
        options={{
          title: 'All Expenses',
          tabBarLabel: 'All Expenses',
          tabBarIcon: ({ color, size }) => <Ionicons name='calendar' size={size} color={color} />,
        }}
      />
    </BottonTab.Navigator>
  );
};

export default function App(): JSX.Element {
  return (
    <ExpenseContextProviver>
      <StatusBar style='light' />
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerStyle: {
              backgroundColor: GlobalStyles.colors.primary500,
            },
            headerTintColor: 'white',
          }}
        >
          <Stack.Screen
            name='ExpensesOverview'
            component={ExpensesOverview}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name='ManageExpense'
            component={ManageExpenseScreen}
            options={{
              presentation: 'modal',
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </ExpenseContextProviver>
  );
}

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });
