/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { GetWithdrawsFilter, WithDrawStatus } from "./../../__generated__/serverTypes";

// ====================================================
// GraphQL query operation: WithdrawsAdmin
// ====================================================

export interface WithdrawsAdmin_withdrawsAdmin {
  __typename: "Withdraw";
  id: string;
  amount: number;
  createdAt: number;
  status: WithDrawStatus;
}

export interface WithdrawsAdmin {
  withdrawsAdmin: WithdrawsAdmin_withdrawsAdmin[];
}

export interface WithdrawsAdminVariables {
  filter: GetWithdrawsFilter;
}
