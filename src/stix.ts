import { canonicalize } from "json-canonicalize";
import { v4, v5 } from "uuid";
import { Identifier, IdentityClassOv } from "@security-alliance/stix/dist/2.1/types.js";
import { UUID } from "crypto";

export const OASIS_NAMESPACE = "00abedb4-aa42-466c-9c01-fed23315a9b7";
export const OPENCTI_NAMESPACE = "b639ff3b-00eb-42ed-aa36-a8dd6f8fb4cf";
export const OPENCTI_PLATFORM_UUID = "d06053cb-7123-404b-b092-6606411702d2";
export const OPENCTI_ADMIN_UUID = "88ec0c6a-13ce-5e39-b486-354fe4a7084f";
export const OPENCTI_SYSTEM_UUID = "6a4b11e1-90ca-4e42-ba42-db7bc7f7d505";

const MARKING_TLP_CLEAR_ID = "613f2e26-407d-48c7-9eca-b8e91df99dc9";
export const MARKING_TLP_CLEAR = `marking-definition--${MARKING_TLP_CLEAR_ID}`;
const MARKING_TLP_GREEN_ID = "34098fce-860f-48ae-8e50-ebd3cc5e41da";
export const MARKING_TLP_GREEN = `marking-definition--${MARKING_TLP_GREEN_ID}`;
const MARKING_TLP_AMBER_ID = "f88d31f6-486f-44da-b317-01333bde0b82";
export const MARKING_TLP_AMBER = `marking-definition--${MARKING_TLP_AMBER_ID}`;
const MARKING_TLP_AMBER_STRICT_ID = "826578e1-40ad-459f-bc73-ede076f81f37";
export const MARKING_TLP_AMBER_STRICT = `marking-definition--${MARKING_TLP_AMBER_STRICT_ID}`;
const MARKING_TLP_RED_ID = "5e57c739-391a-4eb3-b6be-7d15ca92d5ed";
export const MARKING_TLP_RED = `marking-definition--${MARKING_TLP_RED_ID}`;

const normalizeName = (name: string) => {
    return name.toLowerCase().trim();
};

export const generateRequestForTakedownId = (name: string, created: Date) => {
    return `case-rft--${v5(canonicalize({ name: normalizeName(name), created: created.toISOString() })!, OASIS_NAMESPACE)}`;
};

export const generateIdentityId = (name: string, identity_class: IdentityClassOv): Identifier => {
    return `identity--${v5(canonicalize({ name: normalizeName(name), identity_class: identity_class })!, OASIS_NAMESPACE) as UUID}`;
};

export const generateDomainObservableId = (domain: string): Identifier => {
    return `domain-name--${v5(canonicalize({ value: domain })!, OASIS_NAMESPACE) as UUID}`;
};

export const generateBundleId = (): Identifier => {
    return `bundle--${v4() as UUID}`;
};

export const generateCryptocurrencyWalletObservableId = (value: string): Identifier => {
    return `cryptocurrency-wallet--${v5(canonicalize({ value: value })!, OASIS_NAMESPACE) as UUID}`;
};

export const generateIndicatorId = (pattern: string): Identifier => {
    return `indicator--${v5(canonicalize({ pattern: pattern })!, OASIS_NAMESPACE) as UUID}`;
};

export const generateLabelId = (label: string): `label--${UUID}` => {
    return `label--${v5(canonicalize({ value: label })!, OASIS_NAMESPACE) as UUID}`;
};

export const stixOrganization = (fields: { name: string; description?: string; organizationType: string }) => {};

export const stixIdentity = (fields: { name: string; identityClass: IdentityClassOv; description?: string }) => {
    return {
        spec_version: "2.1",
        type: "identity",
        id: generateIdentityId(fields.name, fields.identityClass),
        name: fields.name,
        identity_class: fields.identityClass,
        description: fields.description,
    };
};
