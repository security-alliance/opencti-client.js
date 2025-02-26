import assert from "node:assert";
import { describe, it } from "node:test";
import { v4 } from "uuid";
import { OpenCTIClient } from "../src/index.js";
import { DomainName, generateBundleId, generateDomainNameId, StixBundle } from "@security-alliance/stix/2.1";

const client = new OpenCTIClient("http://localhost:8080", "00000000-0000-0000-0000-000000000000");

describe("me", () => {
    it("should load me", async () => {
        const me = await client.me();

        assert.equal(me.api_token, "00000000-0000-0000-0000-000000000000");
    });
});

describe("ta", () => {
    it("should create tag", async () => {
        const generated = await client.threatActorGroupAdd({
            input: {
                name: "Test TAG " + v4(),
            },
        });

        assert.ok(generated);

        const loaded = await client.threatActorGroup({
            id: generated.id,
        });

        assert.deepEqual(loaded, generated);

        const page = await client.threatActorsGroup();
        const listed = page?.edges.find((v) => v?.node.id === generated.id)?.node;

        assert.deepEqual(listed, generated);
    });
    it("should create tai", async () => {
        const generated = await client.threatActorIndividualAdd({
            input: {
                name: "Test TAG " + v4(),
            },
        });

        assert.ok(generated);

        const loaded = await client.threatActorIndividual({
            id: generated.id,
        });

        assert.deepEqual(loaded, generated);

        const page = await client.threatActorsIndividuals();
        const listed = page?.edges.find((v) => v?.node.id === generated.id)?.node;

        assert.deepEqual(listed, generated);
    });
    it("should add relationship", async () => {
        const obs = (await client.stixCyberObservableAdd({
            type: "Domain-Name",
            DomainName: { value: v4() + ".invalid" },
        }))!;
        const ind = (await client.indicatorAdd({
            input: {
                name: obs.observable_value,
                pattern_type: "stix",
                pattern: `[domain-name:value = '${obs.observable_value}']`,
            },
        }))!;

        const rel = await client.stixCoreRelationshipAdd({
            input: {
                fromId: ind.id,
                toId: obs.id,
                relationship_type: "based-on",
            },
        });

        assert.equal(rel?.from?.id, ind.id);
        assert.equal(rel?.to?.id, obs.id);
    });
});

describe("Import", () => {
    it("should import a bundle successfully", async () => {
        const randomDomains: string[] = [];
        for (let i = 0; i < 8; i++) {
            randomDomains.push(`${v4()}.invalid`);
        }

        const observable = await client.stixCyberObservable({ id: generateDomainNameId(randomDomains[0]) });
        assert.equal(observable, null);

        const bundle: StixBundle = {
            type: "bundle",
            id: generateBundleId(),
            objects: randomDomains.map((domain) => {
                return {
                    type: "domain-name",
                    id: generateDomainNameId(domain),
                    value: domain,
                    x_opencti_score: 100,
                } satisfies DomainName;
            }),
            x_opencti_score: 0,
        };

        const result = (await client.importSTIXBundle(bundle))!;
        assert.notEqual(result, null);

        await client.waitForImportSTIXBundle(result.id);

        const existsObservable = await client.stixCyberObservable({ id: generateDomainNameId(randomDomains[0]) });
        assert.notEqual(existsObservable, null);
    });
});
