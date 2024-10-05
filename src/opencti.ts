import { createFragmentRegistry } from "@apollo/client/cache/inmemory/fragmentRegistry.js";
import {
    ApolloClient,
    ApolloQueryResult,
    FetchResult,
    InMemoryCache,
    NormalizedCacheObject,
} from "@apollo/client/core/index.js";
import { Identifier, StixBundle } from "@security-alliance/stix/dist/2.1/types.js";
import createUploadLink from "apollo-upload-client/createUploadLink.mjs";
import { UUID } from "crypto";
import { GraphQLError } from "./errors.js";
import {
    CaseIncidentLineCase_node,
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
    ThreatActorGroup_ThreatActorGroup,
    ThreatActorGroupKnowledge_ThreatActorGroup,
    ThreatActorGroupDetails_ThreatActorGroup,
    ThreatActorGroupLocations_locations,
    Individual_individual,
    IndividualDetails_individual,
    IndividualKnowledge_individual,
    IndividualLine_node,
    NoteLine_node,
    PictureManagementUtils_node,
    PictureManagementViewer_entity,
    StixCoreObjectContent_stixCoreObject,
    StixCoreObjectOrStixCoreRelationshipNoteCard_node,
    StixCyberObservable_stixCyberObservable,
    StixCyberObservableDetails_stixCyberObservable,
    StixCyberObservableEditionOverview_stixCyberObservable,
    StixCyberObservableHeader_stixCyberObservable,
    StixCyberObservableIndicators_stixCyberObservable,
    StixCyberObservableKnowledge_stixCyberObservable,
    WorkbenchFileLine_file,
    WorkbenchFileViewer_entity,
} from "./graphql/fragments.js";
import {
    CaseIncidentCreationCaseMutation,
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
    ThreatGroupCreationMutation,
    IndividualCreationMutation,
    IndividualPopoverDeletionMutation,
    LabelsQuerySearchQuery,
    NoteCreationMutation,
    NoteCreationUserMutation,
    OpenVocabFieldQuery,
    ProfileQuery,
    RootCaseRftCaseQuery,
    RootIncidentQuery,
    RootIndicatorQuery,
    RootThreatActorGroupQuery,
    RootIndividualQuery,
    RootPrivateQuery,
    RootStixCyberObservableQuery,
    StixCoreObjectLabelsViewRelationDeleteMutation,
    StixCoreObjectLabelsViewRelationsAddMutation,
    StixCoreObjectOrStixCoreRelationshipNotesCardsQuery,
    StixCoreObjectOrStixRelationshipLastContainersQuery,
    StixCoreRelationshipCreationFromEntityToMutation,
    StixCyberObservableCreationMutation,
    StixCyberObservableEditionOverviewRelationAddMutation,
    StixCyberObservableEditionOverviewRelationDeleteMutation,
    StixCyberObservablePopoverDeletionMutation,
    StixDomainObjectsLinesSearchQuery,
    WorkbenchFileContentMutation,
    WorkbenchFileLineDeleteMutation,
} from "./graphql/importedQueries.js";
import { GetFileQuery } from "./graphql/queries.js";
import {
    CaseIncidentAddInput,
    CaseRfiAddInput,
    CaseRftAddInput,
    FilterGroup,
    FilterMode,
    FilterOperator,
    IdentityType,
    IncidentAddInput,
    IndicatorAddInput,
    IndividualAddInput,
    NoteAddInput,
    NotesOrdering,
    NoteUserAddInput,
    OrderingMode,
    StixCoreRelationshipAddInput,
    StixRefRelationshipAddInput,
    ThreatGroupAddInput,
} from "./graphql/types.js";
import { OpenCTIStream, OpenCTIStreamOptions } from "./sync.js";
import {
    CaseIncident,
    CaseRfi,
    CaseRft,
    CryptocurrencyWallet,
    DomainName,
    Edges,
    File,
    ID,
    Identity,
    ImportContentQueryResult,
    Incident,
    Indicator,
    ThreatGroup,
    Individual,
    Label,
    Me,
    Note,
    Observable,
    Profile,
    RelatedToEntity,
    StixCyberObservableAddInput,
    StixRef,
    Vocabulary,
} from "./types.js";
import { sleep } from "./utils.js";

export class OpenCTIClient {
    private host: string;
    private apiKey: string;

    private client: ApolloClient<NormalizedCacheObject>;

    constructor(host: string, apiKey: string) {
        this.host = host.endsWith("/") ? host.substring(0, host.length - 1) : host;
        this.apiKey = apiKey;

        this.client = new ApolloClient({
            cache: new InMemoryCache({
                fragments: createFragmentRegistry(
                    StixCyberObservable_stixCyberObservable,
                    StixCyberObservableHeader_stixCyberObservable,
                    StixCyberObservableDetails_stixCyberObservable,
                    StixCyberObservableIndicators_stixCyberObservable,
                    StixCyberObservableKnowledge_stixCyberObservable,
                    StixCyberObservableEditionOverview_stixCyberObservable,

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

                    NoteLine_node,
                    StixCoreObjectOrStixCoreRelationshipNoteCard_node,

                    ThreatActorGroup_ThreatActorGroup,
                    ThreatActorGroupKnowledge_ThreatActorGroup,
                    ThreatActorGroupDetails_ThreatActorGroup,
                    ThreatActorGroupLocations_locations,

                    Individual_individual,
                    IndividualDetails_individual,
                    IndividualKnowledge_individual,
                    IndividualLine_node,

                    Incident_incident,
                    IncidentDetails_incident,
                    IncidentKnowledge_incident,
                    IncidentLine_node,

                    CaseIncidentLineCase_node,

                    Indicator_indicator,
                    IndicatorDetails_indicator,
                    IndicatorObservables_indicator,
                    IndicatorLine_node,
                    IndicatorEditionOverview_indicator,

                    EntityStixCoreRelationshipLineAll_node,
                ),
            }),
            link: createUploadLink({
                uri: `${this.host}/graphql`,
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
                input: input,
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
                input: input,
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
                input: input,
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

    public async addRelationshipToContainer(
        id: string,
        input: StixRefRelationshipAddInput,
        commitMessage?: string,
        references?: string[],
    ) {
        const results = await this.client.mutate<{ containerEdit: { relationAdd: { id: string; to: any } } }>({
            mutation: ContainerAddStixCoreObjectsLinesRelationAddMutation,
            variables: {
                id: id,
                input: input,
                commitMessage: commitMessage,
                references: references,
            },
        });

        return this.assertMutateResult(results).containerEdit.relationAdd;
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
    public async getStixCyberObservable(observableId: StixRef): Promise<Observable | null> {
        const result = await this.client.query<{ stixCyberObservable: Observable }>({
            query: RootStixCyberObservableQuery,
            variables: {
                id: observableId,
            },
        });

        return this.assertQueryResult(result).stixCyberObservable;
    }

    public async createStixCyberObservable<T extends string, O>(
        type: T,
        input: Omit<StixCyberObservableAddInput, "type">,
        observableData: object,
    ): Promise<O> {
        const result = await this.client.mutate<{ stixCyberObservableAdd: O }>({
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

    public async addRelationToStixCyberObservable<O extends Observable>(
        id: StixRef,
        input: StixRefRelationshipAddInput,
    ): Promise<O> {
        const result = await this.client.mutate<{ stixCyberObservableEdit: { relationAdd: { id: string; from: O } } }>({
            mutation: StixCyberObservableEditionOverviewRelationAddMutation,
            variables: {
                id: id,
                input: input,
            },
        });

        return this.assertMutateResult(result).stixCyberObservableEdit.relationAdd.from;
    }

    public async deleteRelationFromStixCyberObservable<O extends Observable>(
        id: StixRef,
        toId: string,
        relationship_type: string,
    ): Promise<O> {
        const result = await this.client.mutate<{ stixCyberObservableEdit: { relationDelete: O } }>({
            mutation: StixCyberObservableEditionOverviewRelationDeleteMutation,
            variables: {
                id: id,
                toId: toId,
                relationship_type: relationship_type,
            },
        });

        return this.assertMutateResult(result).stixCyberObservableEdit.relationDelete;
    }

    public async createCryptocurrencyWalletObservable(
        input: Omit<StixCyberObservableAddInput, "type"> & { address: string },
    ): Promise<CryptocurrencyWallet> {
        return await this.createStixCyberObservable("Cryptocurrency-Wallet", input, {
            CryptocurrencyWallet: {
                value: input.address,
            },
        });
    }

    public async createDomainObservable(
        input: Omit<StixCyberObservableAddInput, "type"> & { domain: string },
    ): Promise<DomainName> {
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

    private assertObservableType<T extends string, O>(observable: Observable<string> | null, expected: T): O | null {
        if (observable === null) return null;

        if (observable.entity_type !== expected) throw new Error(`expected ${expected}, got ${observable.entity_type}`);

        return observable as O;
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

    public async createIncident(input: IncidentAddInput): Promise<Incident> {
        const result = await this.client.mutate<{ incidentAdd: Incident }>({
            mutation: IncidentCreationMutation,
            variables: {
                input: input,
            },
        });

        return this.assertMutateResult(result).incidentAdd;
    }
    //#endregion

    //#region incident responses
    public async createIncidentResponse(input: CaseIncidentAddInput): Promise<CaseIncident> {
        const result = await this.client.mutate<{ caseIncidentAdd: CaseIncident }>({
            mutation: CaseIncidentCreationCaseMutation,
            variables: {
                input: input,
            },
        });

        return this.assertMutateResult(result).caseIncidentAdd;
    }
    //#endregion

    //#region notes
    public async createNote(input: NoteAddInput): Promise<Note> {
        const results = await this.client.mutate<{ noteAdd: Note }>({
            mutation: NoteCreationMutation,
            variables: {
                input: input,
            },
        });

        return this.assertMutateResult(results).noteAdd;
    }

    public async getNotesForObject(
        id: string,
        count: number,
        orderBy: NotesOrdering,
        orderMode: OrderingMode,
    ): Promise<Note[]> {
        return await this.searchNotes(count, orderBy, orderMode, {
            mode: FilterMode.And,
            filterGroups: [],
            filters: [
                {
                    key: ["objects"],
                    values: [id],
                    operator: FilterOperator.Eq,
                },
            ],
        });
    }

    public async searchNotes(
        count: number,
        orderBy: NotesOrdering,
        orderMode: OrderingMode,
        filters: FilterGroup,
    ): Promise<Note[]> {
        const results = await this.client.query<{ notes: Edges<Note> }>({
            query: StixCoreObjectOrStixCoreRelationshipNotesCardsQuery,
            variables: {
                count: count,
                orderBy: orderBy,
                orderMode: orderMode,
                filters: filters,
            },
        });

        return this.assertQueryResult(results).notes.edges.map((node) => node.node);
    }
    //#endregion

    public async createRelationshipFromEntity(input: StixCoreRelationshipAddInput) {
        const result = await this.client.mutate<{ stixCoreRelationshipAdd: RelatedToEntity }>({
            mutation: StixCoreRelationshipCreationFromEntityToMutation,
            variables: {
                input: input,
            },
        });

        return this.assertMutateResult(result).stixCoreRelationshipAdd;
    }

    //#region identities
    public async createThreatGroup(input: ThreatGroupAddInput): Promise<ThreatGroup> {
        const result = await this.client.mutate<{ threatActorGroupAdd: ThreatGroup }>({
            mutation: ThreatGroupCreationMutation,
            variables: {
                input: input,
            },
        });

        return this.assertMutateResult(result).threatActorGroupAdd;
    }

    public async getThreatGroup(id: StixRef): Promise<ThreatGroup | null> {
        const result = await this.client.query<{ threatActorGroup: ThreatGroup | null }>({
            query: RootThreatActorGroupQuery,
            variables: {
                id: id,
            },
        });

        return this.assertQueryResult(result).threatActorGroup;
    }

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

    public async searchStixDomainObjects(
        search: string,
        types: string[],
        count: number,
        filters?: FilterGroup,
    ): Promise<any[]> {
        const result = await this.client.query<{ stixDomainObjects: Edges<any> }>({
            query: StixDomainObjectsLinesSearchQuery,
            variables: {
                search: search,
                types: types,
                count: count,
                filters: filters,
            },
        });

        return this.assertQueryResult(result).stixDomainObjects.edges.map((edge) => edge.node);
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

    public async importSTIXBundle(bundle: StixBundle): Promise<File | undefined> {
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

    public formatUrlForObject(object: { id: string; entity_type: string }): string | undefined {
        switch (object.entity_type) {
            case "Incident":
                return `${this.host}/dashboard/events/incidents/${object.id}`;
            case "Case-Incident":
                return `${this.host}/dashboard/cases/incidents/${object.id}`;
            default:
                return undefined;
        }
    }

    public getPrettyNameForEntity(entity_type: string): string {
        switch (entity_type) {
            case "Incident":
                return "Incident";
            case "Case-Incident":
                return "Incident Response";
            default:
                return entity_type;
        }
    }
    //#endregion

    public openStream(streamId: string, options?: Omit<OpenCTIStreamOptions, "authorization">): OpenCTIStream {
        return new OpenCTIStream(new URL(`${this.host}/stream/${streamId}`), {
            ...options,
            authorization: this.apiKey,
        });
    }
}
