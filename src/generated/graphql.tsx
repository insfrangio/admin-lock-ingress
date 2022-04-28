export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>;
};
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export enum AuthType {
  Admin = 'Admin',
  Invited = 'Invited',
  User = 'User'
}

export enum Department {
  Budgets = 'Budgets',
  Cleaning = 'Cleaning',
  Directive = 'Directive',
  FinanceAndAccounting = 'FinanceAndAccounting',
  Invited = 'Invited',
  Logistics = 'Logistics',
  Management = 'Management',
  Marketing = 'Marketing',
  Rrhh = 'RRHH',
  Sales = 'Sales'
}

export type LoginInput = {
  password: Scalars['String'];
  userName: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  deleteUser?: Maybe<Scalars['String']>;
  login?: Maybe<Token>;
  newUser: User;
  updateUser: User;
};

export type MutationDeleteUserArgs = {
  id: Scalars['ID'];
};

export type MutationLoginArgs = {
  input?: InputMaybe<LoginInput>;
};

export type MutationNewUserArgs = {
  input?: InputMaybe<UserInput>;
};

export type MutationUpdateUserArgs = {
  id: Scalars['ID'];
  input?: InputMaybe<UserInput>;
};

export type Query = {
  __typename?: 'Query';
  getUser: User;
  getUsers: Array<Maybe<User>>;
};

export type QueryGetUserArgs = {
  id: Scalars['ID'];
};

export type Token = {
  __typename?: 'Token';
  token?: Maybe<Scalars['String']>;
};

export type User = {
  __typename?: 'User';
  authType?: Maybe<AuthType>;
  department?: Maybe<Department>;
  documentNumber?: Maybe<Scalars['Int']>;
  firstName?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['ID']>;
  lastName?: Maybe<Scalars['String']>;
  password?: Maybe<Scalars['String']>;
  phoneNumber?: Maybe<Scalars['Int']>;
  userName?: Maybe<Scalars['String']>;
};

export type UserInput = {
  authType: AuthType;
  department: Department;
  documentNumber: Scalars['Int'];
  firstName: Scalars['String'];
  lastName?: InputMaybe<Scalars['String']>;
  password: Scalars['String'];
  phoneNumber?: InputMaybe<Scalars['Int']>;
  userName: Scalars['String'];
};
