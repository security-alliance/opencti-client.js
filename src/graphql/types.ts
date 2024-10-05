// this file is copied from https://raw.githubusercontent.com/OpenCTI-Platform/opencti/refs/heads/master/opencti-platform/opencti-graphql/src/generated/graphql.ts
// until I figure out how to generate it piecewise myself

export type Maybe<T> = T | null | undefined;
export type InputMaybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends " $fragmentName" | "__typename" ? T[P] : never };
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type RequireFields<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: NonNullable<T[P]> };

import { ThreatActorTypes } from "../types.js";

export type Scalars = {
    ID: { input: string; output: string };
    String: { input: string; output: string };
    Boolean: { input: boolean; output: boolean };
    Int: { input: number; output: number };
    Float: { input: number; output: number };
    Any: { input: any; output: any };
    ConstraintNumber: { input: any; output: any };
    ConstraintString: { input: any; output: any };
    DateTime: { input: any; output: any };
    JSON: { input: any; output: any };
    StixId: { input: any; output: any };
    StixRef: { input: any; output: any };
    Upload: { input: any; output: any };
};

export type IncidentAddInput = {
    aliases?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
    clientMutationId?: InputMaybe<Scalars["String"]["input"]>;
    confidence?: InputMaybe<Scalars["Int"]["input"]>;
    created?: InputMaybe<Scalars["DateTime"]["input"]>;
    createdBy?: InputMaybe<Scalars["String"]["input"]>;
    description?: InputMaybe<Scalars["String"]["input"]>;
    externalReferences?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
    file?: InputMaybe<Scalars["Upload"]["input"]>;
    first_seen?: InputMaybe<Scalars["DateTime"]["input"]>;
    incident_type?: InputMaybe<Scalars["String"]["input"]>;
    lang?: InputMaybe<Scalars["String"]["input"]>;
    last_seen?: InputMaybe<Scalars["DateTime"]["input"]>;
    modified?: InputMaybe<Scalars["DateTime"]["input"]>;
    name: Scalars["String"]["input"];
    objectAssignee?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
    objectLabel?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
    objectMarking?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
    objectOrganization?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
    objectParticipant?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
    objective?: InputMaybe<Scalars["String"]["input"]>;
    revoked?: InputMaybe<Scalars["Boolean"]["input"]>;
    severity?: InputMaybe<Scalars["String"]["input"]>;
    source?: InputMaybe<Scalars["String"]["input"]>;
    stix_id?: InputMaybe<Scalars["StixId"]["input"]>;
    update?: InputMaybe<Scalars["Boolean"]["input"]>;
    x_opencti_stix_ids?: InputMaybe<Array<InputMaybe<Scalars["StixId"]["input"]>>>;
    x_opencti_workflow_id?: InputMaybe<Scalars["String"]["input"]>;
};

export type CaseIncidentAddInput = {
    caseTemplates?: InputMaybe<Array<Scalars["String"]["input"]>>;
    clientMutationId?: InputMaybe<Scalars["String"]["input"]>;
    confidence?: InputMaybe<Scalars["Int"]["input"]>;
    content?: InputMaybe<Scalars["String"]["input"]>;
    content_mapping?: InputMaybe<Scalars["String"]["input"]>;
    created?: InputMaybe<Scalars["DateTime"]["input"]>;
    createdBy?: InputMaybe<Scalars["String"]["input"]>;
    description?: InputMaybe<Scalars["String"]["input"]>;
    externalReferences?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
    file?: InputMaybe<Scalars["Upload"]["input"]>;
    lang?: InputMaybe<Scalars["String"]["input"]>;
    modified?: InputMaybe<Scalars["DateTime"]["input"]>;
    name: Scalars["String"]["input"];
    objectAssignee?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
    objectLabel?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
    objectMarking?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
    objectOrganization?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
    objectParticipant?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
    objects?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
    priority?: InputMaybe<Scalars["String"]["input"]>;
    response_types?: InputMaybe<Array<Scalars["String"]["input"]>>;
    revoked?: InputMaybe<Scalars["Boolean"]["input"]>;
    severity?: InputMaybe<Scalars["String"]["input"]>;
    stix_id?: InputMaybe<Scalars["StixId"]["input"]>;
    update?: InputMaybe<Scalars["Boolean"]["input"]>;
    x_opencti_stix_ids?: InputMaybe<Array<InputMaybe<Scalars["StixId"]["input"]>>>;
    x_opencti_workflow_id?: InputMaybe<Scalars["String"]["input"]>;
};

export type StixRefRelationshipAddInput = {
    clientMutationId?: InputMaybe<Scalars["String"]["input"]>;
    confidence?: InputMaybe<Scalars["Int"]["input"]>;
    created?: InputMaybe<Scalars["DateTime"]["input"]>;
    createdBy?: InputMaybe<Scalars["String"]["input"]>;
    file?: InputMaybe<Scalars["Upload"]["input"]>;
    fromId?: InputMaybe<Scalars["StixRef"]["input"]>;
    modified?: InputMaybe<Scalars["DateTime"]["input"]>;
    objectLabel?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
    objectMarking?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
    relationship_type: Scalars["String"]["input"];
    start_time?: InputMaybe<Scalars["DateTime"]["input"]>;
    stix_id?: InputMaybe<Scalars["StixId"]["input"]>;
    stop_time?: InputMaybe<Scalars["DateTime"]["input"]>;
    toId?: InputMaybe<Scalars["StixRef"]["input"]>;
    update?: InputMaybe<Scalars["Boolean"]["input"]>;
    x_opencti_stix_ids?: InputMaybe<Array<InputMaybe<Scalars["StixId"]["input"]>>>;
};

export type IndicatorAddInput = {
    basedOn?: InputMaybe<Array<Scalars["String"]["input"]>>;
    clientMutationId?: InputMaybe<Scalars["String"]["input"]>;
    confidence?: InputMaybe<Scalars["Int"]["input"]>;
    createObservables?: InputMaybe<Scalars["Boolean"]["input"]>;
    created?: InputMaybe<Scalars["DateTime"]["input"]>;
    createdBy?: InputMaybe<Scalars["String"]["input"]>;
    description?: InputMaybe<Scalars["String"]["input"]>;
    externalReferences?: InputMaybe<Array<Scalars["String"]["input"]>>;
    file?: InputMaybe<Scalars["Upload"]["input"]>;
    indicator_types?: InputMaybe<Array<Scalars["String"]["input"]>>;
    killChainPhases?: InputMaybe<Array<Scalars["String"]["input"]>>;
    lang?: InputMaybe<Scalars["String"]["input"]>;
    modified?: InputMaybe<Scalars["DateTime"]["input"]>;
    name: Scalars["String"]["input"];
    objectLabel?: InputMaybe<Array<Scalars["String"]["input"]>>;
    objectMarking?: InputMaybe<Array<Scalars["String"]["input"]>>;
    objectOrganization?: InputMaybe<Array<Scalars["String"]["input"]>>;
    pattern: Scalars["String"]["input"];
    pattern_type: Scalars["String"]["input"];
    pattern_version?: InputMaybe<Scalars["String"]["input"]>;
    revoked?: InputMaybe<Scalars["Boolean"]["input"]>;
    stix_id?: InputMaybe<Scalars["StixId"]["input"]>;
    update?: InputMaybe<Scalars["Boolean"]["input"]>;
    valid_from?: InputMaybe<Scalars["DateTime"]["input"]>;
    valid_until?: InputMaybe<Scalars["DateTime"]["input"]>;
    x_mitre_platforms?: InputMaybe<Array<Scalars["String"]["input"]>>;
    x_opencti_detection?: InputMaybe<Scalars["Boolean"]["input"]>;
    x_opencti_main_observable_type?: InputMaybe<Scalars["String"]["input"]>;
    x_opencti_score?: InputMaybe<Scalars["Int"]["input"]>;
    x_opencti_stix_ids?: InputMaybe<Array<Scalars["StixId"]["input"]>>;
    x_opencti_workflow_id?: InputMaybe<Scalars["String"]["input"]>;
};

export enum IdentityType {
    Individual = "Individual",
    Organization = "Organization",
    Sector = "Sector",
    System = "System",
}

export type ThreatGroupAddInput = {
    name: Scalars["String"]["input"];
    description?: InputMaybe<Scalars["String"]["input"]>;
    confidence?: InputMaybe<Scalars["Int"]["input"]>;
    objectMarking?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
    threat_actor_types?: ThreatActorTypes[]
}

export type IndividualAddInput = {
    clientMutationId?: InputMaybe<Scalars["String"]["input"]>;
    confidence?: InputMaybe<Scalars["Int"]["input"]>;
    contact_information?: InputMaybe<Scalars["String"]["input"]>;
    created?: InputMaybe<Scalars["DateTime"]["input"]>;
    createdBy?: InputMaybe<Scalars["String"]["input"]>;
    description?: InputMaybe<Scalars["String"]["input"]>;
    externalReferences?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
    file?: InputMaybe<Scalars["Upload"]["input"]>;
    lang?: InputMaybe<Scalars["String"]["input"]>;
    modified?: InputMaybe<Scalars["DateTime"]["input"]>;
    name: Scalars["String"]["input"];
    objectLabel?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
    objectMarking?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
    objectOrganization?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
    revoked?: InputMaybe<Scalars["Boolean"]["input"]>;
    roles?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
    stix_id?: InputMaybe<Scalars["StixId"]["input"]>;
    update?: InputMaybe<Scalars["Boolean"]["input"]>;
    x_opencti_aliases?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
    x_opencti_firstname?: InputMaybe<Scalars["String"]["input"]>;
    x_opencti_lastname?: InputMaybe<Scalars["String"]["input"]>;
    x_opencti_reliability?: InputMaybe<Scalars["String"]["input"]>;
    x_opencti_stix_ids?: InputMaybe<Array<InputMaybe<Scalars["StixId"]["input"]>>>;
    x_opencti_workflow_id?: InputMaybe<Scalars["String"]["input"]>;
};

export type CaseRfiAddInput = {
    caseTemplates?: InputMaybe<Array<Scalars["String"]["input"]>>;
    clientMutationId?: InputMaybe<Scalars["String"]["input"]>;
    confidence?: InputMaybe<Scalars["Int"]["input"]>;
    content?: InputMaybe<Scalars["String"]["input"]>;
    content_mapping?: InputMaybe<Scalars["String"]["input"]>;
    created?: InputMaybe<Scalars["DateTime"]["input"]>;
    createdBy?: InputMaybe<Scalars["String"]["input"]>;
    description?: InputMaybe<Scalars["String"]["input"]>;
    externalReferences?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
    file?: InputMaybe<Scalars["Upload"]["input"]>;
    information_types?: InputMaybe<Array<Scalars["String"]["input"]>>;
    lang?: InputMaybe<Scalars["String"]["input"]>;
    modified?: InputMaybe<Scalars["DateTime"]["input"]>;
    name: Scalars["String"]["input"];
    objectAssignee?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
    objectLabel?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
    objectMarking?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
    objectOrganization?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
    objectParticipant?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
    objects?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
    priority?: InputMaybe<Scalars["String"]["input"]>;
    revoked?: InputMaybe<Scalars["Boolean"]["input"]>;
    severity?: InputMaybe<Scalars["String"]["input"]>;
    stix_id?: InputMaybe<Scalars["StixId"]["input"]>;
    update?: InputMaybe<Scalars["Boolean"]["input"]>;
    x_opencti_stix_ids?: InputMaybe<Array<InputMaybe<Scalars["StixId"]["input"]>>>;
    x_opencti_workflow_id?: InputMaybe<Scalars["String"]["input"]>;
};

export type CaseRftAddInput = {
    caseTemplates?: InputMaybe<Array<Scalars["String"]["input"]>>;
    clientMutationId?: InputMaybe<Scalars["String"]["input"]>;
    confidence?: InputMaybe<Scalars["Int"]["input"]>;
    content?: InputMaybe<Scalars["String"]["input"]>;
    content_mapping?: InputMaybe<Scalars["String"]["input"]>;
    created?: InputMaybe<Scalars["DateTime"]["input"]>;
    createdBy?: InputMaybe<Scalars["String"]["input"]>;
    description?: InputMaybe<Scalars["String"]["input"]>;
    externalReferences?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
    file?: InputMaybe<Scalars["Upload"]["input"]>;
    lang?: InputMaybe<Scalars["String"]["input"]>;
    modified?: InputMaybe<Scalars["DateTime"]["input"]>;
    name: Scalars["String"]["input"];
    objectAssignee?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
    objectLabel?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
    objectMarking?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
    objectOrganization?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
    objectParticipant?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
    objects?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
    priority?: InputMaybe<Scalars["String"]["input"]>;
    revoked?: InputMaybe<Scalars["Boolean"]["input"]>;
    severity?: InputMaybe<Scalars["String"]["input"]>;
    stix_id?: InputMaybe<Scalars["StixId"]["input"]>;
    takedown_types?: InputMaybe<Array<Scalars["String"]["input"]>>;
    update?: InputMaybe<Scalars["Boolean"]["input"]>;
    x_opencti_stix_ids?: InputMaybe<Array<InputMaybe<Scalars["StixId"]["input"]>>>;
    x_opencti_workflow_id?: InputMaybe<Scalars["String"]["input"]>;
};

export type StixCoreRelationshipAddInput = {
    clientMutationId?: InputMaybe<Scalars["String"]["input"]>;
    confidence?: InputMaybe<Scalars["Int"]["input"]>;
    created?: InputMaybe<Scalars["DateTime"]["input"]>;
    createdBy?: InputMaybe<Scalars["String"]["input"]>;
    description?: InputMaybe<Scalars["String"]["input"]>;
    externalReferences?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
    fromId: Scalars["StixRef"]["input"];
    killChainPhases?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
    lang?: InputMaybe<Scalars["String"]["input"]>;
    modified?: InputMaybe<Scalars["DateTime"]["input"]>;
    objectLabel?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
    objectMarking?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
    objectOrganization?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
    relationship_type: Scalars["String"]["input"];
    revoked?: InputMaybe<Scalars["Boolean"]["input"]>;
    start_time?: InputMaybe<Scalars["DateTime"]["input"]>;
    stix_id?: InputMaybe<Scalars["StixId"]["input"]>;
    stop_time?: InputMaybe<Scalars["DateTime"]["input"]>;
    toId: Scalars["StixRef"]["input"];
    update?: InputMaybe<Scalars["Boolean"]["input"]>;
    x_opencti_stix_ids?: InputMaybe<Array<InputMaybe<Scalars["StixId"]["input"]>>>;
    x_opencti_workflow_id?: InputMaybe<Scalars["String"]["input"]>;
};

export type NoteUserAddInput = {
    attribute_abstract?: InputMaybe<Scalars["String"]["input"]>;
    clientMutationId?: InputMaybe<Scalars["String"]["input"]>;
    confidence?: InputMaybe<Scalars["Int"]["input"]>;
    content: Scalars["String"]["input"];
    created?: InputMaybe<Scalars["DateTime"]["input"]>;
    externalReferences?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
    lang?: InputMaybe<Scalars["String"]["input"]>;
    likelihood?: InputMaybe<Scalars["Int"]["input"]>;
    modified?: InputMaybe<Scalars["DateTime"]["input"]>;
    note_types?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
    objectLabel?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
    objectMarking?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
    objectOrganization?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
    objects?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
    revoked?: InputMaybe<Scalars["Boolean"]["input"]>;
    stix_id?: InputMaybe<Scalars["String"]["input"]>;
    update?: InputMaybe<Scalars["Boolean"]["input"]>;
    x_opencti_stix_ids?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
};

export type NoteAddInput = {
    attribute_abstract?: InputMaybe<Scalars["String"]["input"]>;
    authors?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
    clientMutationId?: InputMaybe<Scalars["String"]["input"]>;
    confidence?: InputMaybe<Scalars["Int"]["input"]>;
    content: Scalars["String"]["input"];
    created?: InputMaybe<Scalars["DateTime"]["input"]>;
    createdBy?: InputMaybe<Scalars["String"]["input"]>;
    externalReferences?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
    file?: InputMaybe<Scalars["Upload"]["input"]>;
    lang?: InputMaybe<Scalars["String"]["input"]>;
    likelihood?: InputMaybe<Scalars["Int"]["input"]>;
    modified?: InputMaybe<Scalars["DateTime"]["input"]>;
    note_types?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
    objectLabel?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
    objectMarking?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
    objectOrganization?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
    objects?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
    revoked?: InputMaybe<Scalars["Boolean"]["input"]>;
    stix_id?: InputMaybe<Scalars["StixId"]["input"]>;
    update?: InputMaybe<Scalars["Boolean"]["input"]>;
    x_opencti_stix_ids?: InputMaybe<Array<InputMaybe<Scalars["StixId"]["input"]>>>;
    x_opencti_workflow_id?: InputMaybe<Scalars["String"]["input"]>;
};

export enum NotesOrdering {
    Score = "_score",
    AttributeAbstract = "attribute_abstract",
    Created = "created",
    CreatedBy = "createdBy",
    CreatedAt = "created_at",
    Creator = "creator",
    Modified = "modified",
    NoteTypes = "note_types",
    ObjectMarking = "objectMarking",
    UpdatedAt = "updated_at",
    XOpenctiWorkflowId = "x_opencti_workflow_id",
}

export enum OrderingMode {
    Asc = "asc",
    Desc = "desc",
}

export type Filter = {
    key: Array<Scalars["String"]["input"]>;
    mode?: InputMaybe<FilterMode>;
    operator?: InputMaybe<FilterOperator>;
    values: Array<Scalars["Any"]["input"]>;
};

export type FilterGroup = {
    filterGroups: Array<FilterGroup>;
    filters: Array<Filter>;
    mode: FilterMode;
};

export enum FilterMode {
    And = "and",
    Or = "or",
}

export enum FilterOperator {
    Contains = "contains",
    EndsWith = "ends_with",
    Eq = "eq",
    Gt = "gt",
    Gte = "gte",
    Lt = "lt",
    Lte = "lte",
    Match = "match",
    Nil = "nil",
    NotContains = "not_contains",
    NotEndsWith = "not_ends_with",
    NotEq = "not_eq",
    NotNil = "not_nil",
    NotStartsWith = "not_starts_with",
    Script = "script",
    Search = "search",
    StartsWith = "starts_with",
    Wildcard = "wildcard",
}
