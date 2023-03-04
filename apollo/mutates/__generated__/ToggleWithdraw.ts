/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { ToggleWithdrawInput, WithDrawStatus } from "./../../__generated__/serverTypes";

// ====================================================
// GraphQL mutation operation: ToggleWithdraw
// ====================================================

export interface ToggleWithdraw_toggleWithdraw {
  __typename: "Withdraw";
  id: string;
  status: WithDrawStatus;
}

export interface ToggleWithdraw {
  toggleWithdraw: ToggleWithdraw_toggleWithdraw;
}

export interface ToggleWithdrawVariables {
  filter: ToggleWithdrawInput;
}
