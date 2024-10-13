import { Any, generateDeterministicId, Identifier, IdentityClassOv, toValueObject } from "@security-alliance/stix/2.1";

export const normalizeName = (name: string) => {
    return name.toLowerCase().trim();
};

export const generateRequestForTakedownId = (props: Any<{ name: string; created: Date }>): Identifier<"case-rft"> => {
    return generateDeterministicId("case-rft", {
        name: normalizeName(props.name),
        created: props.created.toISOString(),
    });
};

export const generateIdentityId = (
    props: Any<{ name: string; identity_class: IdentityClassOv }>,
): Identifier<"identity"> => {
    return generateDeterministicId("identity", {
        name: normalizeName(props.name),
        identity_class: props.identity_class,
    });
};

export const generateCryptocurrencyWalletId = (
    valueOrProps: string | Any<{ value: string }>,
): Identifier<"cryptocurrency-wallet"> => {
    return generateDeterministicId("cryptocurrency-wallet", toValueObject(valueOrProps));
};

export const generateIndicatorId = (props: Any<{ pattern: string }>): Identifier<"indicator"> => {
    return generateDeterministicId("indicator", { pattern: props.pattern });
};

export const generateLabelId = (valueOrProps: string | Any<{ value: string }>): Identifier<"label"> => {
    return generateDeterministicId("label", toValueObject(valueOrProps));
};

export const generateNoteId = (props: Any<{ content: string; created: string }>): Identifier<"note"> => {
    return generateDeterministicId("note", { content: props.content, created: props.created });
};
