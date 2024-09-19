import {
    StixObject,
    Identity as StixIdentity,
    Indicator as StixIndicator,
    DomainName as StixDomainName,
    IdentityClassOv,
    Identifier,
} from "@security-alliance/stix/dist/2.1/types.js";

export type Work = {
    id: string;
    tracking: {
        import_expected_number: number | null;
        import_processed_number: number | null;
    };
};

export type File = {
    id: string;
    works: Work[];
};

export type ImportContentQueryResult = {
    connectorsForImport: {
        id: string;
        name: string;
        active: boolean;
    }[];
    pendingFiles: {
        edges: {
            node: File;
        }[];
    };
};

export type Vocabulary = {
    id: string;
    name: string;
    description: string;
};

export type Member = {
    id: string;
    name: string;
};

export type MemberEdge = {
    node: Member;
};

export type Label = {
    id: string;
    value: string;
    color: string;
};

export type LabelEdge = {
    node: Label;
};

export type Identity = StixToOCTI<StixIdentity> & {
    entity_type: "Identity";

    identity_class: IdentityClassOv;
};

export type RelatedToEntity = {
    id: string;
    entity_type: "related-to";
};

export type Incident = {
    id: string;
    standard_id: string;
    name: string;
};

export type Marking = {
    id: string;
    entity_type: string;
    standard_id: string;
    definition_type: string;
    definition: string;
    x_opencti_color: string;
    x_opencti_order: string;
};

export type Me = {
    id: string;
    allowed_marking: Marking[];
};

export type StixCyberObservableAdd = {
    id: string;
    standard_id: string;
    entity_type: string;
    parent_types: string[];
    observable_value: string;
    created_at: string;
    createdBy: null;
};

export type IndicatorAddInput = {
    name: string;
    description?: string;
    indicator_types?: string[];
    pattern: string;
    pattern_type: string;
    createObservables?: boolean;
    x_opencti_main_observable_type: string;
    x_mitre_platforms?: string[];
    createdBy?: string;
    confidence?: number;
    x_opencti_score?: number;
    x_opencti_detection?: boolean;
    objectMarking?: string[];
    objectLabel?: string[];
    validFrom?: Date;
    validTo?: Date;
    killChainPhases?: string[];
    externalReferences?: string[];
};

export type Edges<T> = {
    edges: {
        node: T;
    }[];
};

export type QueryResponse<K extends string, V> = {
    [key in K]: {
        edges: V[];
    };
};

export type Organization = {
    id: string;
    name: string;
};

export type OrganizationEdge = {
    node: Organization;
};

export type Profile = {
    id: string;
    name: string;
    objectOrganization: {
        edges: OrganizationEdge[];
    };
};

export type Individual = {
    id: string;
    standard_id: Identifier;
    entity_type: "Individual";

    name: string;
    description: string;
    confidence: number;
    objectMarking: Marking[];
    objectLabel: Label[];
};

export type OCTIStixCyberObservable = {
    id: string;
    standard_id: string;
    entity_type: string;

    observable_value: string;

    objectLabel: Label[];

    x_opencti_score: number;
    x_opencti_description: string;
};

export type DomainName = StixToOCTI<StixDomainName> &
    OCTIStixCyberObservable & {
        entity_type: "Domain-Name";

        value: string;
    };

export type CryptocurrencyWallet = OCTIStixCyberObservable & {
    entity_type: "Cryptocurrency-Wallet";

    value: string;
};

export type StixToOCTI<T extends { id: unknown }> = Omit<T, "id"> & {
    id: string;
    standard_id: T["id"];

    objectMarking: Marking[];
};

export type Indicator = StixToOCTI<StixIndicator> & {
    entity_type: "Indicator";

    x_opencti_score: number;
    x_opencti_detection: boolean;
    x_opencti_main_observable_type: string;
    x_mitre_platforms: string[];

    observables: Edges<OCTIStixCyberObservable>;
};

export type ID = string;

export type StixRef = null | string | `${string}--${string}`;

export type StixCyberObservableAddInput = {
    type: string;
    x_opencti_score?: number;
    x_opencti_description?: string;
    createIndicator?: boolean;
    createdBy?: string;
    objectMarking?: string[];
    objectLabel?: string[]; // can be plaintext
    externalReferences?: string[];
};

export type StixCoreObjectEditRelationDeleteInput = {
    id: NonNullable<ID>;
    toId: NonNullable<StixRef>;
    relationship_type: string;
    commit_message?: string;
    references?: string;
};

export type IdentityType = "Individual" | "Organization" | "System";

export type IndicatorCreationInput = {
    name: string;
    description?: string;
    confidence?: number;
    indicator_types: string[];
    pattern: string;
    pattern_type: string;
    x_opencti_main_observable_type: string;
    createObservables: boolean;
    x_mitre_platforms: string[];
    valid_from: Date | null;
    valid_until: Date | null;
    createdBy?: string;
    objectMarking: string[];
    killChainPhases: string[];
    objectLabel: string[];
    externalReferences: string[];
    x_opencti_detection: boolean;
    x_opencti_score: number;
    file: File | undefined;
};

export type IndividualAddInput = {
    name: string;
    description?: string;
    confidence?: number;
    objectMarking?: string[];
    objectLabel?: string[];
};

export type CaseRfiAddInput = {
    name: string;
    description?: string;
    confidence: number;
    created: Date;
    createdBy?: string;
    content?: string;
    caseTemplates?: string[];
    externalReferences?: string[];
    objectAssignee?: string[];
    objectMarking?: string[];
    objectLabel?: string[];
    objectParticipant?: string[];
    priority?: string;
    severity?: string;
    information_types?: string[];
};

export type CaseRftAddInput = {
    name: string;
    description?: string;
    confidence: number;
    created: Date;
    createdBy?: string;
    content?: string;
    caseTemplates?: string[];
    externalReferences?: string[];
    objectAssignee?: string[];
    objectMarking?: string[];
    objectLabel?: string[];
    objectParticipant?: string[];
    priority?: string;
    severity?: string;
    takedown_types?: string[];
};

export type CaseRft = {
    entity_type: "Case-Rft";
    id: string;
    standard_id: `case-rft--${string}`;
    name: string;
    description: string;
};

export type CaseRfi = {
    entity_type: "Case-Rfi";
    id: string;
    standard_id: `case-rfi--${string}`;
    name: string;
    description: string;
};

//#region filters
// https://github.com/OpenCTI-Platform/opencti/blob/master/opencti-platform/opencti-front/src/utils/filters/filtersHelpers-types.ts
export type FilterValue = any;

export type FilterGroup = {
    mode: string;
    filters: Filter[];
    filterGroups: FilterGroup[];
};

export type Filter = {
    id?: string;
    key: string; // key is a string in front
    values: FilterValue[];
    operator?: string;
    mode?: string;
};
//#endregion
