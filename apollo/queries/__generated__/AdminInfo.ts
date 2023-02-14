/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { GetInfoFilter } from "./../../__generated__/serverTypes";

// ====================================================
// GraphQL query operation: AdminInfo
// ====================================================

export interface AdminInfo_adminInfo {
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

export interface AdminInfo {
  adminInfo: AdminInfo_adminInfo | null;
}

export interface AdminInfoVariables {
  filter: GetInfoFilter;
}
