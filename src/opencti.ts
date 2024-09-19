import { createFragmentRegistry } from "@apollo/client/cache/inmemory/fragmentRegistry.js";
import {
    ApolloClient,
    ApolloQueryResult,
    FetchResult,
    InMemoryCache,
    NormalizedCacheObject,
} from "@apollo/client/core/index.js";
import { Bundle } from "@security-alliance/stix/dist/2.1/types.js";
import createUploadLink from "apollo-upload-client/createUploadLink.mjs";
import { UUID } from "crypto";
import { GraphQLError } from "./errors.js";
import {
    EntityStixCoreRelationshipLineAll_node,
    FileExportViewer_entity,
    FileExternalReferencesViewer_entity,
    FileImportViewer_entity,
    FileLine_file,
    FileManager_connectorsExport,
    FileManager_connectorsImport,
    FileWork_file,
    ImportContent_connectorsImport,
    Incident_incident,
    IncidentDetails_incident,
    IncidentKnowledge_incident,
    IncidentLine_node,
    Indicator_indicator,
    IndicatorDetails_indicator,
    IndicatorEditionOverview_indicator,
    IndicatorLine_node,
    IndicatorObservables_indicator,
    Individual_individual,
    IndividualDetails_individual,
    IndividualKnowledge_individual,
    IndividualLine_node,
    PictureManagementUtils_node,
    PictureManagementViewer_entity,
    StixCoreObjectContent_stixCoreObject,
    StixCyberObservable_stixCyberObservable,
    StixCyberObservableDetails_stixCyberObservable,
    StixCyberObservableHeader_stixCyberObservable,
    StixCyberObservableIndicators_stixCyberObservable,
    StixCyberObservableKnowledge_stixCyberObservable,
    WorkbenchFileLine_file,
    WorkbenchFileViewer_entity,
} from "./fragments.js";
import {
    CaseRfiCreationCaseMutation,
    CaseRfiEditionOverviewCaseFieldPatchMutation,
    CaseRftCreationCaseMutation,
    CaseRftEditionOverviewCaseFieldPatchMutation,
    ContainerAddStixCoreObjectsLinesRelationAddMutation,
    ContainerStixCoreObjectPopoverRemoveMutation,
    FileManagerAskJobImportMutation,
    IdentitySearchIdentitiesQuery,
    ImportContentQuery,
    IncidentCreationMutation,
    IndicatorAddObservablesLinesRelationAddMutation,
    IndicatorCreationMutation,
    IndicatorEditionOverviewFieldPatchMutation,
    IndicatorEditionOverviewRelationAddMutation,
    IndicatorEditionOverviewRelationDeleteMutation,
    IndicatorObservablePopoverDeletionMutation,
    IndicatorPopoverDeletionMutation,
    IndividualCreationMutation,
    IndividualPopoverDeletionMutation,
    LabelsQuerySearchQuery,
    OpenVocabFieldQuery,
    ProfileQuery,
    RootCaseRftCaseQuery,
    RootIncidentQuery,
    RootIndicatorQuery,
    RootIndividualQuery,
    RootPrivateQuery,
    RootStixCyberObservableQuery,
    StixCoreObjectLabelsViewRelationDeleteMutation,
    StixCoreObjectLabelsViewRelationsAddMutation,
    StixCoreObjectOrStixRelationshipLastContainersQuery,
    StixCoreRelationshipCreationFromEntityToMutation,
    StixCyberObservableCreationMutation,
    StixCyberObservablePopoverDeletionMutation,
    WorkbenchFileContentMutation,
    WorkbenchFileLineDeleteMutation,
} from "./importedQueries.js";
import {
    CaseRfi,
    CaseRfiAddInput,
    CaseRft,
    CaseRftAddInput,
    CryptocurrencyWallet,
    DomainName,
    Edges,
    FilterGroup,
    ID,
    Identity,
    IdentityType,
    ImportContentQueryResult,
    Incident,
    Indicator,
    IndicatorAddInput,
    Individual,
    IndividualAddInput,
    Label,
    Me,
    OCTIStixCyberObservable,
    File,
    Profile,
    RelatedToEntity,
    StixCyberObservableAddInput,
    StixRef,
    Vocabulary,
} from "./types.js";
import { sleep } from "./utils.js";
import { GetFileQuery } from "./queries.js";

export class OpenCTIClient {
    private client: ApolloClient<NormalizedCacheObject>;

    constructor(host: string, apiKey: string) {
        this.client = new ApolloClient({
            cache: new InMemoryCache({
                fragments: createFragmentRegistry(
                    StixCyberObservable_stixCyberObservable,
                    StixCyberObservableHeader_stixCyberObservable,
                    StixCyberObservableDetails_stixCyberObservable,
                    StixCyberObservableIndicators_stixCyberObservable,
                    StixCyberObservableKnowledge_stixCyberObservable,

                    FileExportViewer_entity,
                    FileExternalReferencesViewer_entity,
                    FileImportViewer_entity,
                    FileLine_file,
                    FileManager_connectorsExport,
                    FileManager_connectorsImport,
                    FileWork_file,
                    StixCoreObjectContent_stixCoreObject,
                    WorkbenchFileLine_file,
                    WorkbenchFileViewer_entity,
                    PictureManagementViewer_entity,
                    PictureManagementUtils_node,
                    ImportContent_connectorsImport,

                    Individual_individual,
                    IndividualDetails_individual,
                    IndividualKnowledge_individual,
                    IndividualLine_node,

                    Incident_incident,
                    IncidentDetails_incident,
                    IncidentKnowledge_incident,
                    IncidentLine_node,

                    Indicator_indicator,
                    IndicatorDetails_indicator,
                    IndicatorObservables_indicator,
                    IndicatorLine_node,
                    IndicatorEditionOverview_indicator,

                    EntityStixCoreRelationshipLineAll_node,
                ),
            }),
            link: createUploadLink({
                uri: `${host}/graphql`,
                headers: {
                    authorization: `Bearer ${apiKey}`,
                },
            }),
            defaultOptions: {
                // something weird about fragments
                query: {
                    fetchPolicy: "no-cache",
                },
                mutate: {
                    fetchPolicy: "no-cache",
                },
            },
        });
    }

    public async getProfile(): Promise<Profile> {
        const result = await this.client.query<{ me: Profile }>({
            query: ProfileQuery,
        });

        return this.assertQueryResult(result).me;
    }

    public async getMe(): Promise<Me> {
        const result = await this.client.query({
            query: RootPrivateQuery,
        });

        return this.assertQueryResult(result).me;
    }

    //#region indicators
    public async getIndicator(indicatorId: StixRef): Promise<Indicator> {
        const result = await this.client.query<{ indicator: Indicator }>({
            query: RootIndicatorQuery,
            variables: {
                id: indicatorId,
            },
        });

        return this.assertQueryResult(result).indicator;
    }

    public async createIndicator(input: IndicatorAddInput): Promise<Indicator> {
        const result = await this.client.mutate<{ indicatorAdd: Indicator }>({
            mutation: IndicatorCreationMutation,
            variables: {
                input: {
                    name: input.name,
                    description: input.description,
                    indicator_types: input.indicator_types,
                    pattern: input.pattern,
                    pattern_type: input.pattern_type,
                    createObservables: input.createObservables,
                    x_opencti_main_observable_type: input.x_opencti_main_observable_type,
                    x_mitre_platforms: input.x_mitre_platforms,
                    confidence: input.confidence,
                    x_opencti_score: input.x_opencti_score,
                    x_opencti_detection: input.x_opencti_detection,
                    valid_from: input.validFrom?.toISOString(),
                    valid_until: input.validTo?.toISOString(),
                    killChainPhases: input.killChainPhases,
                    createdBy: input.createdBy,
                    objectMarking: input.objectMarking,
                    objectLabel: input.objectLabel,
                    externalReferences: input.externalReferences,
                },
            },
        });

        return this.assertMutateResult(result).indicatorAdd;
    }

    public async editIndicator(id: StixRef, key: string, value: any): Promise<Indicator> {
        const result = await this.client.mutate<{ indicatorFieldPatch: Indicator }>({
            mutation: IndicatorEditionOverviewFieldPatchMutation,
            variables: {
                id: id,
                input: {
                    key: key,
                    value: value,
                },
            },
        });

        return this.assertMutateResult(result).indicatorFieldPatch;
    }

    public async addIndicatorRelationship(
        fromId: StixRef,
        toId: StixRef,
        relationshipType: "based-on",
    ): Promise<Indicator> {
        const result = await this.client.mutate<{ stixCoreRelationshipAdd: { from: Indicator } }>({
            mutation: IndicatorAddObservablesLinesRelationAddMutation,
            variables: {
                input: {
                    fromId: fromId,
                    toId: toId,
                    relationship_type: relationshipType,
                },
            },
        });

        return this.assertMutateResult(result).stixCoreRelationshipAdd.from;
    }

    public async deleteIndicatorRelationship(
        fromId: StixRef,
        toId: StixRef,
        relationshipType: "based-on",
    ): Promise<boolean> {
        const result = await this.client.mutate<{ stixCoreRelationshipDelete: boolean }>({
            mutation: IndicatorObservablePopoverDeletionMutation,
            variables: {
                fromId: fromId,
                toId: toId,
                relationship_type: relationshipType,
            },
        });

        return this.assertMutateResult(result).stixCoreRelationshipDelete;
    }

    public async addIndicatorMarking(
        id: StixRef,
        toId: StixRef,
        relationshipType: "object-marking",
    ): Promise<Indicator> {
        const result = await this.client.mutate<{ indicatorRelationAdd: { from: Indicator } }>({
            mutation: IndicatorEditionOverviewRelationAddMutation,
            variables: {
                id: id,
                input: {
                    toId: toId,
                    relationship_type: relationshipType,
                },
            },
        });

        return this.assertMutateResult(result).indicatorRelationAdd.from;
    }

    public async deleteIndicatorMarking(
        id: StixRef,
        toId: StixRef,
        relationshipType: "object-marking",
    ): Promise<Indicator> {
        const result = await this.client.mutate<{ indicatorRelationDelete: Indicator }>({
            mutation: IndicatorEditionOverviewRelationDeleteMutation,
            variables: {
                id: id,
                toId: toId,
                relationship_type: relationshipType,
            },
        });

        return this.assertMutateResult(result).indicatorRelationDelete;
    }

    public async deleteIndicator(id: StixRef): Promise<StixRef> {
        const result = await this.client.mutate<{ indicatorDelete: StixRef }>({
            mutation: IndicatorPopoverDeletionMutation,
            variables: {
                id: id,
            },
        });

        return this.assertMutateResult(result).indicatorDelete;
    }
    //#endregion

    //#region request for information
    public async createRequestForInformation(input: CaseRfiAddInput): Promise<CaseRfi> {
        const result = await this.client.mutate<{ caseRfiAdd: CaseRfi }>({
            mutation: CaseRfiCreationCaseMutation,
            variables: {
                input: {
                    name: input.name,
                    description: input.description,
                    content: input.content,
                    created: input.created.toISOString(),
                    information_types: input.information_types,
                    severity: input.severity,
                    priority: input.priority,
                    caseTemplates: input.caseTemplates,
                    confidence: input.confidence,
                    objectAssignee: input.objectAssignee,
                    objectParticipant: input.objectParticipant,
                    objectMarking: input.objectMarking,
                    objectLabel: input.objectLabel,
                    externalReferences: input.externalReferences,
                    createdBy: input.createdBy,
                },
            },
        });

        return this.assertMutateResult(result).caseRfiAdd;
    }

    public async editRequestForInformation(id: UUID, key: string, value: any): Promise<CaseRfi> {
        const results = await this.client.mutate<{ stixDomainObjectEdit: { fieldPatch: CaseRfi } }>({
            mutation: CaseRfiEditionOverviewCaseFieldPatchMutation,
            variables: {
                id: id,
                input: {
                    key: key,
                    value: value,
                },
            },
        });

        return this.assertMutateResult(results).stixDomainObjectEdit.fieldPatch;
    }
    //#endregion

    //#region request for takedown
    public async createRequestForTakedown(input: CaseRftAddInput): Promise<CaseRft> {
        const result = await this.client.mutate<{ caseRftAdd: CaseRft }>({
            mutation: CaseRftCreationCaseMutation,
            variables: {
                input: {
                    name: input.name,
                    description: input.description,
                    content: input.content,
                    created: input.created.toISOString(),
                    takedown_types: input.takedown_types,
                    severity: input.severity,
                    priority: input.priority,
                    caseTemplates: input.caseTemplates,
                    confidence: input.confidence,
                    objectAssignee: input.objectAssignee,
                    objectParticipant: input.objectParticipant,
                    objectMarking: input.objectMarking,
                    objectLabel: input.objectLabel,
                    externalReferences: input.externalReferences,
                    createdBy: input.createdBy,
                },
            },
        });

        return this.assertMutateResult(result).caseRftAdd;
    }

    public async getRequestForTakedown(id: string): Promise<CaseRft | null> {
        const result = await this.client.query<{ caseRft: CaseRft }>({
            query: RootCaseRftCaseQuery,
            variables: {
                id: id,
            },
        });

        return this.assertMutateResult(result).caseRft;
    }

    public async getRequestForTakedownsByName(name: string): Promise<CaseRft[]> {
        const results = await this.client.query<{ containers: Edges<CaseRft> }>({
            query: StixCoreObjectOrStixRelationshipLastContainersQuery,
            variables: {
                first: 8,
                orderBy: "created",
                orderMode: "desc",
                filters: {
                    mode: "and",
                    filters: [
                        {
                            key: "name",
                            values: [name],
                        },
                    ],
                    filterGroups: [],
                },
            },
        });

        return this.assertQueryResult(results).containers.edges.map((edge) => edge.node);
    }

    public async editRequestForTakedown(id: UUID, key: string, value: any): Promise<CaseRft> {
        const results = await this.client.mutate<{ stixDomainObjectEdit: { fieldPatch: CaseRft } }>({
            mutation: CaseRftEditionOverviewCaseFieldPatchMutation,
            variables: {
                id: id,
                input: {
                    key: key,
                    value: value,
                },
            },
        });

        return this.assertMutateResult(results).stixDomainObjectEdit.fieldPatch;
    }

    public async addRelationshipToContainer(containerId: UUID, toId: UUID, relationshipType: "object") {
        const results = await this.client.mutate({
            mutation: ContainerAddStixCoreObjectsLinesRelationAddMutation,
            variables: {
                id: containerId,
                input: {
                    toId: toId,
                    relationship_type: relationshipType,
                },
            },
        });

        return this.assertMutateResult(results);
    }

    public async removeRelationshipFromContainer(containerId: UUID, toId: UUID, relationshipType: "object") {
        const results = await this.client.mutate({
            mutation: ContainerStixCoreObjectPopoverRemoveMutation,
            variables: {
                id: containerId,
                toId: toId,
                relationship_type: relationshipType,
            },
        });

        return this.assertMutateResult(results);
    }

    public async getContainersWithFilters<T>(filters: FilterGroup): Promise<T[]> {
        const results = await this.client.query<{ containers: Edges<T> }>({
            query: StixCoreObjectOrStixRelationshipLastContainersQuery,
            variables: {
                first: 8,
                orderBy: "created",
                orderMode: "desc",
                filters: filters,
            },
        });

        return this.assertQueryResult(results).containers.edges.map((edge) => edge.node);
    }
    //#endregion

    //#region observables
    public async getStixCyberObservable(observableId: StixRef): Promise<OCTIStixCyberObservable | null> {
        const result = await this.client.query<{ stixCyberObservable: OCTIStixCyberObservable }>({
            query: RootStixCyberObservableQuery,
            variables: {
                id: observableId,
            },
        });

        return this.assertQueryResult(result).stixCyberObservable;
    }

    public async createStixCyberObservable(
        type: string,
        input: Omit<StixCyberObservableAddInput, "type">,
        observableData: object,
    ): Promise<OCTIStixCyberObservable> {
        const result = await this.client.mutate<{ stixCyberObservableAdd: OCTIStixCyberObservable }>({
            mutation: StixCyberObservableCreationMutation,
            variables: {
                ...observableData,

                type: type,
                x_opencti_score: input.x_opencti_score,
                x_opencti_description: input.x_opencti_description,
                createIndicator: input.createIndicator,
                createdBy: input.createdBy,
                objectMarking: input.objectMarking,
                objectLabel: input.objectLabel,
                externalReferences: input.externalReferences,
            },
        });

        return this.assertMutateResult(result).stixCyberObservableAdd;
    }

    public async deleteStixCyberObservable(id: StixRef): Promise<StixRef> {
        const result = await this.client.mutate<{ stixCyberObservableEdit: { delete: StixRef } }>({
            mutation: StixCyberObservablePopoverDeletionMutation,
            variables: {
                id: id,
            },
        });

        return this.assertMutateResult(result).stixCyberObservableEdit.delete;
    }

    public async createCryptocurrencyWalletObservable(
        input: Omit<StixCyberObservableAddInput, "type"> & { address: string },
    ): Promise<OCTIStixCyberObservable> {
        return await this.createStixCyberObservable("Cryptocurrency-Wallet", input, {
            CryptocurrencyWallet: {
                value: input.address,
            },
        });
    }

    public async createDomainObservable(
        input: Omit<StixCyberObservableAddInput, "type"> & { domain: string },
    ): Promise<OCTIStixCyberObservable> {
        return await this.createStixCyberObservable("Domain-Name", input, {
            DomainName: {
                value: input.domain,
            },
        });
    }

    public async getCryptocurrencyWalletObservable(id: StixRef): Promise<CryptocurrencyWallet | null> {
        return this.assertObservableType(await this.getStixCyberObservable(id), "Cryptocurrency-Wallet");
    }

    public async getDomainObservable(id: StixRef): Promise<DomainName | null> {
        return this.assertObservableType(await this.getStixCyberObservable(id), "Domain-Name");
    }

    private assertObservableType<T>(observable: OCTIStixCyberObservable | null, expected: string): T | null {
        if (observable === null) return null;

        if (observable.entity_type !== expected) throw new Error(`expected ${expected}, got ${observable.entity_type}`);

        return observable as T;
    }
    //#endregion

    //#region incidents
    public async getIncident(incidentId: string): Promise<Incident | null> {
        const result = await this.client.query<{ incident: Incident }>({
            query: RootIncidentQuery,
            variables: {
                id: incidentId,
            },
        });

        return this.assertQueryResult(result).incident;
    }

    public async createIncident(
        name: string,
        createdBy: UUID,
        confidence: number,
        markings: string[],
        firstSeen: Date,
    ): Promise<Incident> {
        const result = await this.client.mutate<{ incidentAdd: Incident }>({
            mutation: IncidentCreationMutation,
            variables: {
                input: {
                    name: name,
                    confidence: confidence,
                    incident_type: "",
                    source: "",
                    description: "",
                    createdBy: createdBy,
                    objectMarking: markings,
                    objectAssignee: [],
                    objectParticipant: [],
                    objectLabel: [],
                    externalReferences: [],
                    first_seen: firstSeen.toISOString(),
                },
            },
        });

        return this.assertMutateResult(result).incidentAdd;
    }
    //#endregion

    public async createRelationshipFromEntity(
        fromId: UUID,
        toId: UUID,
        createdBy: UUID,
        confidence: number,
        markings: string[],
        relationshipType: "related-to",
        startTime: Date,
    ) {
        const result = await this.client.mutate<{ stixCoreRelationshipAdd: RelatedToEntity }>({
            mutation: StixCoreRelationshipCreationFromEntityToMutation,
            variables: {
                input: {
                    relationship_type: relationshipType,
                    confidence: confidence,
                    start_time: startTime.toISOString(),
                    stop_time: null,
                    description: "",
                    killChainPhases: [],
                    externalReferences: [],
                    objectMarking: markings,
                    createdBy: createdBy,
                    fromId: fromId,
                    toId: toId,
                },
            },
        });

        return this.assertMutateResult(result).stixCoreRelationshipAdd;
    }

    //#region identities
    public async getIndividual(id: StixRef): Promise<Individual | null> {
        const result = await this.client.query<{ individual: Individual | null }>({
            query: RootIndividualQuery,
            variables: {
                id: id,
            },
        });

        return this.assertQueryResult(result).individual;
    }

    public async createIndividual(input: IndividualAddInput): Promise<Individual> {
        const result = await this.client.mutate<{ individualAdd: Individual }>({
            mutation: IndividualCreationMutation,
            variables: {
                input: input,
            },
        });

        return this.assertMutateResult(result).individualAdd;
    }

    public async deleteIndividual(input: StixRef): Promise<StixRef> {
        const result = await this.client.mutate<{ individualEdit: { delete: StixRef } }>({
            mutation: IndividualPopoverDeletionMutation,
            variables: {
                id: input,
            },
        });

        return this.assertMutateResult(result).individualEdit.delete;
    }

    public async getIdentity(name: string, type: IdentityType): Promise<Identity | null> {
        const results = await this.queryIdentities(name, [type]);
        if (results.length === 0) return null;

        return results.find((result) => result.name === name) || null;
    }

    public async queryIdentities(search: string, types: IdentityType[]): Promise<Identity[]> {
        const result = await this.client.query<{ identities: Edges<Identity> }>({
            query: IdentitySearchIdentitiesQuery,
            variables: {
                types: types,
                search: search,
                first: 10,
            },
        });

        return this.assertQueryResult(result).identities.edges.map((edge) => edge.node);
    }
    //#endregion

    //#region system
    public async listVocabulary(category: string): Promise<Vocabulary[]> {
        const result = await this.client.query<{ vocabularies: Edges<Vocabulary> }>({
            query: OpenVocabFieldQuery,
            variables: {
                category: category,
            },
        });

        return this.assertQueryResult(result).vocabularies.edges.map((edge) => edge.node);
    }
    //#endregion

    //#region labels
    public async getLabel(label: string): Promise<Label | null> {
        const results = await this.queryLabels(label);
        if (results.length === 0) return null;

        return results.find((result) => result.value === label) || null;
    }

    public async queryLabels(search: string): Promise<Label[]> {
        const result = await this.client.query<{ labels: Edges<Label> }>({
            query: LabelsQuerySearchQuery,
            variables: {
                search: search,
            },
        });

        return this.assertQueryResult(result, "query labels").labels.edges.map((edge) => edge.node);
    }

    public async addLabel(id: ID, toIds: StixRef[], commitMessage?: string, references?: string[]): Promise<Label[]> {
        const result = await this.client.mutate<{ stixCoreObjectEdit: { relationsAdd: { objectLabel: Label[] } } }>({
            mutation: StixCoreObjectLabelsViewRelationsAddMutation,
            variables: {
                id: id,
                input: {
                    toIds: toIds,
                    relationship_type: "object-label",
                },
                commitMessage: commitMessage,
                references: references,
            },
        });

        return this.assertMutateResult(result, "add label").stixCoreObjectEdit.relationsAdd.objectLabel;
    }

    public async deleteLabel(id: ID, toId: StixRef, commitMessage?: string, references?: string[]): Promise<Label[]> {
        const result = await this.client.mutate<{ stixCoreObjectEdit: { relationDelete: { objectLabel: Label[] } } }>({
            mutation: StixCoreObjectLabelsViewRelationDeleteMutation,
            variables: {
                id: id,
                toId: toId,
                relationship_type: "object-label",
                commitMessage: commitMessage,
                references: references,
            },
        });

        return this.assertMutateResult(result, "delete label").stixCoreObjectEdit.relationDelete.objectLabel;
    }
    //#endregion

    //#region stix
    public async getImportContentQuery(): Promise<ImportContentQueryResult> {
        const importContentQueryResult = await this.client.query<ImportContentQueryResult>({
            query: ImportContentQuery,
            variables: {},
        });

        return this.assertQueryResult(importContentQueryResult);
    }

    public async importSTIXBundle(bundle: Bundle): Promise<File | undefined> {
        const importContentQueryResult = await this.getImportContentQuery();

        const stixConnector = importContentQueryResult.connectorsForImport.find(
            (connector) => connector.name === "ImportFileStix",
        );
        if (!stixConnector) {
            return undefined;
        }

        const blob = new Blob([JSON.stringify(bundle)], { type: "application/json" });
        (blob as any).name = `${bundle.id}.json`;

        const uploadPendingFileResult = await this.client.mutate<{ uploadPending: { id: string } }>({
            mutation: WorkbenchFileContentMutation,
            variables: {
                file: blob,
                entityId: null,
            },
        });

        const fileId = this.assertMutateResult(uploadPendingFileResult).uploadPending.id;

        const askJobImportResult = await this.client.mutate<{ askJobImport: File }>({
            mutation: FileManagerAskJobImportMutation,
            variables: {
                fileName: fileId,
                connectorId: stixConnector.id,
                bypassValidation: true,
                configuration: null,
            },
        });

        return this.assertMutateResult(askJobImportResult).askJobImport;
    }

    public async waitForImportSTIXBundle(importedFileId: string, signal?: AbortSignal): Promise<void> {
        while (!signal?.aborted) {
            const fileResult = await this.client.query<{ file: File }>({
                query: GetFileQuery,
                variables: {
                    id: importedFileId,
                },
            });

            const file = this.assertQueryResult(fileResult).file;

            if (file.works.length === 0) {
                await sleep(1000, signal);
                continue;
            }

            const { import_expected_number: expected, import_processed_number: processed } =
                file.works[file.works.length - 1].tracking;

            if (expected === null || processed === null || expected !== processed) {
                await sleep(1000, signal);
                continue;
            }

            break;
        }
    }

    public async deleteFile(fileId: string): Promise<void> {
        const deleteImportResult = await this.client.mutate<{ deleteImport: string }>({
            mutation: WorkbenchFileLineDeleteMutation,
            variables: {
                fileName: fileId,
            },
        });

        this.assertMutateResult(deleteImportResult);
    }
    //#endregion

    //#region utilities
    private assertQueryResult<T>(result: ApolloQueryResult<T>, operation?: string): T {
        if (result.errors !== undefined) {
            throw new GraphQLError(operation || "unknown", result.errors);
        }

        if (result.error !== undefined) {
            result.error.message += ` (while performing operation ${operation})`;
            throw result.error;
        }

        return result.data;
    }

    private assertMutateResult<T>(result: FetchResult<T>, operation?: string): T {
        if (result.errors !== undefined) {
            throw new GraphQLError(operation || "unknown", result.errors);
        }

        if (result.data === null || result.data === undefined) {
            throw new Error(`expected response (while performing operation ${operation})`);
        }

        return result.data;
    }
    //#endregion
}
