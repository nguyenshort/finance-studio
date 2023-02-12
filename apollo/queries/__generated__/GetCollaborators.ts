/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { GetCollaboratorsFilter, COLLABORATOR_STATUS } from "./../../__generated__/serverTypes";

// ====================================================
// GraphQL query operation: GetCollaborators
// ====================================================

export interface GetCollaborators_collaborators_clients {
  __typename: "User";
  id: string;
}

export interface GetCollaborators_collaborators {
  __typename: "Collaborator";
  id: string;
  name: string;
  fanpage: string;
  status: COLLABORATOR_STATUS;
  createdAt: number;
  clients: GetCollaborators_collaborators_clients[];
}

export interface GetCollaborators {
  collaborators: GetCollaborators_collaborators[];
}

export interface GetCollaboratorsVariables {
  filter: GetCollaboratorsFilter;
}
