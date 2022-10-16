import type { NativeStackScreenProps, NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { BottomTabScreenProps, BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { NavigatorScreenParams, CompositeNavigationProp } from '@react-navigation/native';

export type BottomTabParamListType = {
  AllExpenses: undefined;
  RecentExpenses: undefined;
};

export type BottomTabRouteProps = BottomTabScreenProps<BottomTabParamListType>;

export type StackParamListType = {
  ExpensesOverview: NavigatorScreenParams<BottomTabParamListType>;
  ManageExpense: undefined;
};

export type ManageExpenseRouteProps = NativeStackScreenProps<StackParamListType, 'ManageExpense'>;

export type ManageExpenseNavigationProps = CompositeNavigationProp<
  NativeStackNavigationProp<StackParamListType, 'ManageExpense'>,
  BottomTabNavigationProp<BottomTabParamListType>
>;
