/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

//==============================================================
// START Enums and Input Objects
//==============================================================

export enum COLLABORATOR_STATUS {
  ACTIVE = "ACTIVE",
  FULL = "FULL",
  INACTIVE = "INACTIVE",
}

export enum LOGBOOK_GROUP {
  LOAN = "LOAN",
  WITHDRAW = "WITHDRAW",
}

export enum LOGBOOK_STATUS {
  APPROVED = "APPROVED",
  PENDING = "PENDING",
  REJECTED = "REJECTED",
}

export enum LOGBOOK_TYPE {
  ADD = "ADD",
  SUBTRACT = "SUBTRACT",
}

export enum LoanStatus {
  APPROVED = "APPROVED",
  PENDING = "PENDING",
  REJECTED = "REJECTED",
}

export enum UserRole {
  ADMIN = "ADMIN",
  SP_ADMIN = "SP_ADMIN",
  USER = "USER",
}

export interface AdminGetBankFilter {
  user: string;
}

export interface AdminGetLogbooksFilter {
  status?: LOGBOOK_STATUS[] | null;
  type?: LOGBOOK_TYPE[] | null;
  user?: string | null;
}

export interface AdminUpdateUserInput {
  avatar?: string | null;
  balance?: number | null;
  collaborator?: string | null;
  name?: string | null;
  role?: UserRole | null;
  user: string;
}

export interface CreateCollaboratorInput {
  fanpage: string;
  name: string;
}

export interface CreateLogbookInput {
  amount: number;
  content?: string | null;
  effective: boolean;
  group: LOGBOOK_GROUP;
  note?: string | null;
  status: LOGBOOK_STATUS;
  type: LOGBOOK_TYPE;
  user: string;
}

export interface DeleteLogbookInput {
  id: string;
}

export interface GetBankFilter {
  id: string;
}

export interface GetCollaboratorFilter {
  id: string;
}

export interface GetInfoFilter {
  id: string;
}

export interface GetLoanFilter {
  user: string;
}

export interface GetUserFilter {
  id: string;
}

export interface RangeUsersFilter {
  end: number;
  start: number;
}

export interface SignInInput {
  email: string;
  password: string;
}

export interface SignUpInput {
  email: string;
  password: string;
}

export interface UpdateBankInput {
  account: string;
  bank: string;
  id: string;
  name: string;
}

export interface UpdateCollaboratorInput {
  fanpage?: string | null;
  id: string;
  name?: string | null;
  status?: COLLABORATOR_STATUS | null;
}

export interface UpdateInfoInput {
  address?: string | null;
  born?: number[] | null;
  cccd?: string | null;
  education?: string | null;
  income?: string | null;
  job?: string | null;
  marriage?: string | null;
  name?: string | null;
  purpose?: string | null;
  user: string;
}

export interface UpdateLoanInput {
  amount?: number | null;
  interest?: number | null;
  months?: number | null;
  signature?: string | null;
  status?: LoanStatus | null;
  user: string;
}

export interface UpdateLogbookInput {
  amount?: number | null;
  content?: string | null;
  group?: LOGBOOK_GROUP | null;
  id: string;
  note?: string | null;
  status?: LOGBOOK_STATUS | null;
  type?: LOGBOOK_TYPE | null;
}

export interface UpdateWithdrawInput {
  amount?: number | null;
  content?: string | null;
  id: string;
  note?: string | null;
  status?: LOGBOOK_STATUS | null;
}

//==============================================================
// END Enums and Input Objects
//==============================================================
