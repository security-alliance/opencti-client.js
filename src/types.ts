import {
    Identifier,
    StixCyberObservableObject,
    DomainName as StixDomainName,
    IPv4Addr as StixIPv4Addr,
    IPv6Addr as StixIPv6Addr,
    Url as StixUrl,
    Identity as StixIdentity,
    Incident as StixIncident,
    Indicator as StixIndicator,
    Note as StixNote,
} from "@security-alliance/stix/dist/2.1/types.js";
import {
    CaseIncident as StixCaseIncident,
    CryptocurrencyWallet as StixCryptocurrencyWallet,
    CaseRfi as StixCaseRfi,
    CaseRft as StixCaseRft,
} from "./stix/types.js";

export * from "./stix/opencti.js";

export type StixToOCTI<EntityType extends string, T extends { id: string }> = Omit<T, "id"> & {
    entity_type: EntityType;

    id: string;
    standard_id: T["id"];

    objectMarking: Marking[];
    objectLabel: Label[];
};

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
export type RelatedToEntity = {
    id: string;
    entity_type: "related-to";
};

//#region domain object
export type Identity = StixToOCTI<"Identity", StixIdentity>;
export type Incident = StixToOCTI<"Incident", StixIncident>;
export type CaseIncident = StixToOCTI<"Case-Incident", StixCaseIncident>;

export type Note = StixToOCTI<"Note", StixNote>;

export type Indicator = StixToOCTI<"Indicator", StixIndicator> & {
    x_opencti_score: number;
    x_opencti_detection: boolean;
    x_opencti_main_observable_type: string;
    x_mitre_platforms: string[];

    observables: Edges<Observable>;
};

export type CaseRft = StixToOCTI<"Case-Rft", StixCaseRfi>;

export type CaseRfi = StixToOCTI<"Case-Rfi", StixCaseRfi>;
//#endregion

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

//#region observables
export type Observable<
    Type extends string = string,
    Base extends StixCyberObservableObject = StixCyberObservableObject,
> = StixToOCTI<Type, Base> & {
    observable_value: string;
};

export type DomainName = Observable<"Domain-Name", StixDomainName>;

export type IPv4Addr = Observable<"IPv4-Addr", StixIPv4Addr>;

export type IPv6Addr = Observable<"IPv6-Addr", StixIPv6Addr>;

export type Url = Observable<"Url", StixUrl>;

export type CryptocurrencyWallet = Observable<"Cryptocurrency-Wallet", StixCryptocurrencyWallet>;

//#endregion

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
