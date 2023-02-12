/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetBank
// ====================================================

export interface GetBank_bank {
  __typename: "Bank";
  id: string;
  account: string;
  name: string;
  bank: string;
}

export interface GetBank {
  bank: GetBank_bank | null;
}
