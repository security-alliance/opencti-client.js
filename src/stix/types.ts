import {
    BaseStixCyberObservableObject,
    BaseStixDomainObject,
    Identifier,
    OpenVocabulary,
} from "@security-alliance/stix/2.1";

export type CryptocurrencyWallet = BaseStixCyberObservableObject<"cryptocurrency-wallet"> & {
    value: string;
};

export type CaseRft = BaseStixDomainObject<"case-rft"> & {
    name: string;
    description?: string;
    content?: string;
    content_mapping?: string;
    object_refs: Identifier[];
    takedown_types?: string;
    severity?: string;
    priority?: string;
};

export type CaseRfi = BaseStixDomainObject<"case-rfi"> & {
    name: string;
    description?: string;
    content?: string;
    content_mapping?: string;
    object_refs: Identifier[];
    information_types?: string;
    severity?: string;
    priority?: string;
};

export type CaseIncident = BaseStixDomainObject<"case-incident"> & {
    name: string;
    description?: string;
    content?: string;
    content_mapping?: string;
    severity?: CaseSeverityOv;
    priority?: CasePriorityOv;
    object_refs?: Identifier[];
    response_types?: IncidentResponseTypesOv;
};

export type IncidentTypeOv = OpenVocabulary<
    | "alert"
    | "compromise"
    | "information-system-disruption"
    | "ransomware"
    | "reputation-damage"
    | "data-leak"
    | "typosquatting"
    | "phishing"
    | "cybercrime"
>;

export type CasePriorityOv = OpenVocabulary<"P1" | "P2" | "P3" | "P4">;

export type CaseSeverityOv = OpenVocabulary<"low" | "medium" | "high" | "critical">;

export type IncidentResponseTypesOv = OpenVocabulary<"ransomware" | "data-leak">;
