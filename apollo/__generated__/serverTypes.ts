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

export interface GetCollaboratorFilter {
  id: string;
}

export interface GetCollaboratorsFilter {
  limit: number;
  name?: string | null;
  offset: number;
  sort: string;
}

export interface GetInfoFilter {
  id: string;
}

export interface GetLoanFilter {
  user: string;
}

export interface GetLoansFilter {
  limit: number;
  offset: number;
  sort: string;
}

export interface GetLogbooksFilter {
  group?: LOGBOOK_GROUP[] | null;
  limit: number;
  offset: number;
  sort: string;
  status?: LOGBOOK_STATUS[] | null;
  type?: LOGBOOK_TYPE[] | null;
}

export interface GetUserFilter {
  id: string;
}

export interface GetUsersFilter {
  email?: string | null;
  exclude?: string[] | null;
  limit: number;
  name?: string | null;
  offset: number;
  sort: string;
}

export interface RangeUsersFilter {
  end: number;
  start: number;
}

export interface UpdateCollaboratorInput {
  fanpage?: string | null;
  id: string;
  name?: string | null;
  status?: COLLABORATOR_STATUS | null;
}

export interface UpdateIdentityInput {
  avatar: string;
  back: string;
  front: string;
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
  user: string;
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
