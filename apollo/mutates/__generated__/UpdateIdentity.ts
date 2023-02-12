/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { UpdateIdentityInput } from "./../../__generated__/serverTypes";

// ====================================================
// GraphQL mutation operation: UpdateIdentity
// ====================================================

export interface UpdateIdentity_updateIdentity {
  __typename: "Identity";
  id: string;
  front: string;
  back: string;
  avatar: string;
}

export interface UpdateIdentity {
  updateIdentity: UpdateIdentity_updateIdentity;
}

export interface UpdateIdentityVariables {
  input: UpdateIdentityInput;
}
