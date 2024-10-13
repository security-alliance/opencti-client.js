import { Identifier } from "@security-alliance/stix/2.1";

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

export const EXTENSION_DEFINITION_OCTI_SDO: Identifier<"extension-definition"> =
    `extension-definition--ea279b3e-5c71-4632-ac08-831c66a786ba` as const;

export const EXTENSION_DEFINITION_OCTI_SCO: Identifier<"extension-definition"> =
    `extension-definition--f93e2c80-4231-4f9a-af8b-95c9bd566a82;` as const;

export const EXTENSION_DEFINITION_MITRE: Identifier<"extension-definition"> =
    `extension-definition--322b8f77-262a-4cb8-a915-1e441e00329b` as const;
