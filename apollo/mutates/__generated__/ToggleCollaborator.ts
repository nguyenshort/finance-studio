/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { UpdateCollaboratorInput, COLLABORATOR_STATUS } from "./../../__generated__/serverTypes";

// ====================================================
// GraphQL mutation operation: ToggleCollaborator
// ====================================================

export interface ToggleCollaborator_updateCollaborator {
  __typename: "Collaborator";
  id: string;
  status: COLLABORATOR_STATUS;
}

export interface ToggleCollaborator {
  updateCollaborator: ToggleCollaborator_updateCollaborator;
}

export interface ToggleCollaboratorVariables {
  input: UpdateCollaboratorInput;
}
