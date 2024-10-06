import { generateBundleId, generateDomainObservableId } from "@security-alliance/stix/dist/2.1/identifiers.js";
import { DomainName, StixBundle } from "@security-alliance/stix/dist/2.1/types.js";
import assert, { rejects } from "node:assert";
import { randomBytes } from "node:crypto";
import { describe, it } from "node:test";
import { v4 } from "uuid";
import { OpenCTIClient } from "../src/index.js";
import {
    generateCryptocurrencyWalletObservableId,
    generateIdentityId,
    generateIndicatorId,
    generateLabelId,
} from "../src/stix/identifiers.js";
import { EXTENSION_DEFINITION_OCTI_SDO, MARKING_TLP_CLEAR, MARKING_TLP_RED } from "../src/stix/constants.js";
import { StixRef } from "../src/types.js";

const client = new OpenCTIClient(process.env.OPENCTI_URL!, process.env.OPENCTI_API_KEY!);

describe("Observables", () => {
    describe("Domain-Name", () => {
        const expected = {
            observable_value: `${v4()}.internal.lan`,
            x_opencti_score: 42,
            x_opencti_description: v4(),

            standard_id: "" as StixRef,
        };

        expected.standard_id = generateDomainObservableId({ value: expected.observable_value });

        it("should create a new observable", async () => {
            const existingObservable = await client.getDomainObservable(expected.standard_id);
            assert.equal(existingObservable, null);

            const observable = await client.createDomainObservable({
                domain: expected.observable_value,
                x_opencti_score: expected.x_opencti_score,
                x_opencti_description: expected.x_opencti_description,
            });

            assert.equal(observable.value, expected.observable_value);
            assert.equal(observable.standard_id, expected.standard_id);
            assert.equal(observable.x_opencti_score, expected.x_opencti_score);
            assert.equal(observable.x_opencti_description, expected.x_opencti_description);
        });

        it("should manipulate labels on the observable", async () => {
            const observable = await client.getDomainObservable(expected.standard_id);

            assert.notEqual(observable, null);
            assert(observable !== null);
            assert.equal(observable.objectLabel.length, 0);

            observable.objectLabel = await client.addLabel(observable.standard_id, [
                generateLabelId({ value: "blocklisted domain" }),
            ]);
            assert.equal(observable.objectLabel.length, 1);
            assert.equal(observable.objectLabel[0].value, "blocklisted domain");

            observable.objectLabel = await client.deleteLabel(
                observable.id,
                generateLabelId({ value: "allowlisted domain" }),
            );
            assert.equal(observable.objectLabel.length, 1);

            observable.objectLabel = await client.deleteLabel(
                observable.id,
                generateLabelId({ value: "blocklisted domain" }),
            );
            assert.equal(observable.objectLabel.length, 0);
        });

        it("should delete the observable", async () => {
            const observableId = await client.deleteStixCyberObservable(expected.standard_id);

            assert.equal(observableId, expected.standard_id);

            await rejects(client.deleteStixCyberObservable(expected.standard_id));
        });
    });

    describe("Cryptocurrency-Wallet", () => {
        const expected = {
            observable_value: `0x${Buffer.from(randomBytes(20)).toString("hex")}`,
            x_opencti_score: 42,
            x_opencti_description: v4(),

            standard_id: "" as StixRef,
        };

        expected.standard_id = generateCryptocurrencyWalletObservableId({ value: expected.observable_value });

        it("should create a new observable", async () => {
            const existingObservable = await client.getCryptocurrencyWalletObservable(expected.standard_id);
            assert.equal(existingObservable, null);

            const observable = await client.createCryptocurrencyWalletObservable({
                address: expected.observable_value,
                x_opencti_score: expected.x_opencti_score,
                x_opencti_description: expected.x_opencti_description,
            });

            assert.equal(observable.value, expected.observable_value);
            assert.equal(observable.standard_id, expected.standard_id);
            assert.equal(observable.x_opencti_score, expected.x_opencti_score);
            assert.equal(observable.x_opencti_description, expected.x_opencti_description);
        });

        it("should delete the observable", async () => {
            const observableId = await client.deleteStixCyberObservable(expected.standard_id);

            assert.equal(observableId, expected.standard_id);

            await rejects(client.deleteStixCyberObservable(expected.standard_id));
        });
    });
});

describe("Indicators", () => {
    const expectedObservable = {
        value: `${v4()}.lan`,
    };

    const expectedIndicator = {
        name: v4(),
        pattern_type: "stix",
        pattern: `[domain-name:value = '${expectedObservable.value}']`,
        x_opencti_main_observable_type: "Domain-Name",

        x_opencti_score: 100,

        standard_id: "" as StixRef,
    };

    expectedIndicator.standard_id = generateIndicatorId({ pattern: expectedIndicator.pattern });

    it("should create a new indicator", async () => {
        const existingIndicator = await client.getIndicator(expectedIndicator.standard_id);
        assert.equal(existingIndicator, null);

        const indicator = await client.createIndicator({
            name: expectedIndicator.name,
            pattern_type: expectedIndicator.pattern_type,
            pattern: expectedIndicator.pattern,
            x_opencti_score: expectedIndicator.x_opencti_score,
            x_opencti_main_observable_type: expectedIndicator.x_opencti_main_observable_type,
        });

        assert.equal(indicator.standard_id, expectedIndicator.standard_id);
        assert.equal(indicator.name, expectedIndicator.name);
        assert.equal(indicator.pattern_type, expectedIndicator.pattern_type);
        assert.equal(indicator.pattern, expectedIndicator.pattern);
        assert.equal(indicator.x_opencti_main_observable_type, expectedIndicator.x_opencti_main_observable_type);
        assert.equal(indicator.x_opencti_score, expectedIndicator.x_opencti_score);

        assert.equal(indicator.observables.edges.length, 0);

        const observable = await client.createDomainObservable({
            domain: expectedObservable.value,
        });

        {
            const indicatorWithRef = await client.addIndicatorRelationship(
                indicator.standard_id,
                observable.standard_id,
                "based-on",
            );

            assert.equal(indicatorWithRef.observables.edges.length, 1);
            assert.equal(indicatorWithRef.observables.edges[0].node.id, observable.id);

            const successful = await client.deleteIndicatorRelationship(
                indicator.standard_id,
                observable.standard_id,
                "based-on",
            );

            assert.equal(successful, true);

            const indicatorWithoutRef = await client.getIndicator(indicator.standard_id);
            assert.equal(indicatorWithoutRef.observables.edges.length, 0);
        }
    });

    it("should be able to edit the indicator", async () => {
        const newName = v4();
        {
            const newIndicator = await client.editIndicator(expectedIndicator.standard_id, "name", newName);
            assert.equal(newIndicator.name, newName);
        }
        {
            const newIndicator = await client.editIndicator(
                expectedIndicator.standard_id,
                "name",
                expectedIndicator.name,
            );
            assert.equal(newIndicator.name, expectedIndicator.name);
        }
        {
            const oldIndicator = await client.getIndicator(expectedIndicator.standard_id);
            assert.equal(oldIndicator.objectMarking.length, 0);

            const withMarking = await client.addIndicatorMarking(
                expectedIndicator.standard_id,
                MARKING_TLP_CLEAR,
                "object-marking",
            );
            assert.equal(withMarking.objectMarking.length, 1);
            assert.equal(withMarking.objectMarking[0].standard_id, MARKING_TLP_CLEAR);

            const withMarking1 = await client.deleteIndicatorMarking(
                expectedIndicator.standard_id,
                MARKING_TLP_RED,
                "object-marking",
            );
            assert.equal(withMarking1.objectMarking.length, 1);

            const withoutMarking = await client.deleteIndicatorMarking(
                expectedIndicator.standard_id,
                MARKING_TLP_CLEAR,
                "object-marking",
            );
            assert.equal(withoutMarking.objectMarking.length, 0);
        }
    });

    it("should delete the indicator", async () => {
        const indicatorId = await client.deleteIndicator(expectedIndicator.standard_id);
        assert.equal(indicatorId, expectedIndicator.standard_id);

        await rejects(client.deleteIndicator(expectedIndicator.standard_id));
    });
});

describe("Identities", () => {
    const name = v4();

    const expectedIndividual = {
        name: name,
        description: v4(),
        confidence: 100,
        objectMarking: [MARKING_TLP_RED],

        standard_id: "",
    };
    expectedIndividual.standard_id = generateIdentityId({ name: name, identity_class: "individual" });

    it("should create individual identities", async () => {
        const existingIndividual = await client.getIndividual(expectedIndividual.standard_id);
        assert.equal(existingIndividual, null);

        const individual = await client.createIndividual({
            name: expectedIndividual.name,
            description: expectedIndividual.description,
            confidence: expectedIndividual.confidence,
            objectMarking: expectedIndividual.objectMarking,
        });

        assert.equal(individual.standard_id, expectedIndividual.standard_id);
        assert.equal(individual.name, expectedIndividual.name);
        assert.equal(individual.description, expectedIndividual.description);
        assert.equal(individual.objectMarking.length, 1);
        assert.equal(individual.objectMarking[0].standard_id, expectedIndividual.objectMarking[0]);
    });

    it("should delete individual identity", async () => {
        const id = await client.deleteIndividual(expectedIndividual.standard_id);
        assert.equal(id, expectedIndividual.standard_id);

        await rejects(client.deleteIndividual(expectedIndividual.standard_id));
    });
});

describe("Import", () => {
    it("should import a bundle successfully", async () => {
        const randomDomains: string[] = [];
        for (let i = 0; i < 128; i++) {
            randomDomains.push(`${v4()}.invalid`);
        }

        const observable = await client.getDomainObservable(generateDomainObservableId({ value: randomDomains[0] }));
        assert.equal(observable, null);

        const bundle: StixBundle = {
            type: "bundle",
            id: generateBundleId(),
            objects: randomDomains.map((domain) => {
                return {
                    type: "domain-name",
                    id: generateDomainObservableId({ value: domain }),
                    value: domain,
                    x_opencti_labels: ["drainer"],
                    x_opencti_score: 100,
                } satisfies DomainName;
            }),
            x_opencti_score: 0,
        };

        const result = (await client.importSTIXBundle(bundle))!;
        assert.notEqual(result, null);
        console.log("began import of file", result.id);

        await client.waitForImportSTIXBundle(result.id);
        console.log("file is done importing");

        await client.deleteFile(result.id);
        console.log("deleted file");

        const existsObservable = await client.getDomainObservable(
            generateDomainObservableId({ value: randomDomains[0] }),
        );
        assert.notEqual(existsObservable, null);
    });
});
