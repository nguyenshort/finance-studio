/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { COLLABORATOR_STATUS } from "./../../__generated__/serverTypes";

// ====================================================
// GraphQL query operation: FormCollaborators
// ====================================================

export interface FormCollaborators_collaborators {
  __typename: "Collaborator";
  id: string;
  name: string;
  fanpage: string;
  status: COLLABORATOR_STATUS;
}

export interface FormCollaborators {
  collaborators: FormCollaborators_collaborators[];
}
