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

export interface CreateCollaboratorInput {
  fanpage: string;
  name: string;
}

export interface CreateLoanInput {
  amount: number;
  interest: number;
  months: number;
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

export interface SignLoanInput {
  signature: string;
}

export interface UpdateBankInput {
  account: string;
  bank: string;
  name: string;
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

//==============================================================
// END Enums and Input Objects
//==============================================================
