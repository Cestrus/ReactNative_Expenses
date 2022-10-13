import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { NavigatorScreenParams } from '@react-navigation/native';

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
