import { Any, generateDeterministicId } from "@security-alliance/stix/dist/2.1/identifiers.js";
import { Identifier, IdentityClassOv } from "@security-alliance/stix/dist/2.1/types.js";

const normalizeName = (name: string) => {
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

export const generateCryptocurrencyWalletObservableId = (
    props: Any<{ value: string }>,
): Identifier<"cryptocurrency-wallet"> => {
    return generateDeterministicId("cryptocurrency-wallet", { value: props.value });
};

export const generateIndicatorId = (props: Any<{ pattern: string }>): Identifier<"indicator"> => {
    return generateDeterministicId("indicator", { pattern: props.pattern });
};

export const generateLabelId = (props: Any<{ value: string }>): Identifier<"label"> => {
    return generateDeterministicId("label", { value: props.value });
};
