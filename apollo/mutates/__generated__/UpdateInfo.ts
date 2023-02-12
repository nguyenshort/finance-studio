/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { UpdateInfoInput } from "./../../__generated__/serverTypes";

// ====================================================
// GraphQL mutation operation: UpdateInfo
// ====================================================

export interface UpdateInfo_updateInfo {
  __typename: "Info";
  id: string;
  name: string;
}

export interface UpdateInfo {
  updateInfo: UpdateInfo_updateInfo;
}

export interface UpdateInfoVariables {
  input: UpdateInfoInput;
}
