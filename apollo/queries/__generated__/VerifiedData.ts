/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: VerifiedData
// ====================================================

export interface VerifiedData_bank {
  __typename: "Bank";
  id: string;
  account: string;
  name: string;
  bank: string;
}

export interface VerifiedData_info {
  __typename: "Info";
  id: string;
  name: string;
}

export interface VerifiedData_identity {
  __typename: "Identity";
  id: string;
  front: string;
  back: string;
  avatar: string;
}

export interface VerifiedData {
  bank: VerifiedData_bank | null;
  info: VerifiedData_info | null;
  identity: VerifiedData_identity | null;
}
