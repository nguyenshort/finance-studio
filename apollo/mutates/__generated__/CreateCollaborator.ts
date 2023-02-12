/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { CreateCollaboratorInput, COLLABORATOR_STATUS } from "./../../__generated__/serverTypes";

// ====================================================
// GraphQL mutation operation: CreateCollaborator
// ====================================================

export interface CreateCollaborator_createCollaborator {
  __typename: "Collaborator";
  id: string;
  name: string;
  status: COLLABORATOR_STATUS;
  fanpage: string;
  createdAt: number;
  updatedAt: number;
}

export interface CreateCollaborator {
  createCollaborator: CreateCollaborator_createCollaborator;
}

export interface CreateCollaboratorVariables {
  input: CreateCollaboratorInput;
}
