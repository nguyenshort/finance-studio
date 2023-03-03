/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { AdminGetLogbooksFilter } from "./../../__generated__/serverTypes";

// ====================================================
// GraphQL query operation: UserLogbooks
// ====================================================

export interface UserLogbooks_adminLogbooks {
  __typename: "Logbook";
  id: string;
  amount: number;
  note: string | null;
  createdAt: number;
}

export interface UserLogbooks {
  adminLogbooks: UserLogbooks_adminLogbooks[];
}

export interface UserLogbooksVariables {
  filter: AdminGetLogbooksFilter;
}
