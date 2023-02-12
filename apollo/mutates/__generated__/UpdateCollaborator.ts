/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { UpdateCollaboratorInput, COLLABORATOR_STATUS } from "./../../__generated__/serverTypes";

// ====================================================
// GraphQL mutation operation: UpdateCollaborator
// ====================================================

export interface UpdateCollaborator_updateCollaborator {
  __typename: "Collaborator";
  id: string;
  name: string;
  fanpage: string;
  status: COLLABORATOR_STATUS;
}

export interface UpdateCollaborator {
  updateCollaborator: UpdateCollaborator_updateCollaborator;
}

export interface UpdateCollaboratorVariables {
  input: UpdateCollaboratorInput;
}
