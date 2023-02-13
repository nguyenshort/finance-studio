/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { UpdateInfoInput } from "./../../__generated__/serverTypes";

// ====================================================
// GraphQL mutation operation: AdminUpdateInfo
// ====================================================

export interface AdminUpdateInfo_adminUpdateInfo {
  __typename: "Info";
  id: string;
  name: string;
  born: number[];
  cccd: string;
  address: string;
  education: string;
  income: string;
  job: string;
  marriage: string;
  purpose: string;
}

export interface AdminUpdateInfo {
  adminUpdateInfo: AdminUpdateInfo_adminUpdateInfo;
}

export interface AdminUpdateInfoVariables {
  input: UpdateInfoInput;
}
