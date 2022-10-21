import type { NativeStackScreenProps, NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { BottomTabScreenProps, BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { NavigatorScreenParams, CompositeNavigationProp } from '@react-navigation/native';
import { ExpenseType } from './expenseType';

export type BottomTabParamListType = {
  AllExpenses: undefined;
  RecentExpenses: undefined;
};

export type BottomTabRouteProps = BottomTabScreenProps<BottomTabParamListType>;

export type StackParamListType = {
  ExpensesOverview: NavigatorScreenParams<BottomTabParamListType>;
  ManageExpense: {
    expenseId: ExpenseType['id'];
  };
};

export type ManageExpenseRouteProps = NativeStackScreenProps<StackParamListType, 'ManageExpense'>;

export type ManageExpenseNavigationProps = CompositeNavigationProp<
  NativeStackNavigationProp<StackParamListType, 'ManageExpense'>,
  BottomTabNavigationProp<BottomTabParamListType>
>;
