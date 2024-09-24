import { gql } from "@apollo/client/core/index.js";

//#region incidents
export const RootIncidentQuery = gql`
    query RootIncidentQuery($id: String!) {
        incident(id: $id) {
            id
            standard_id
            entity_type
            name
            aliases
            x_opencti_graph_data
            stixCoreObjectsDistribution(field: "entity_type", operation: count) {
                label
                value
            }
            ...Incident_incident
            ...IncidentKnowledge_incident
            ...StixCoreObjectContent_stixCoreObject
            ...FileImportViewer_entity
            ...FileExportViewer_entity
            ...FileExternalReferencesViewer_entity
            ...WorkbenchFileViewer_entity
        }
        connectorsForExport {
            ...FileManager_connectorsExport
        }
        connectorsForImport {
            ...FileManager_connectorsImport
        }
    }
`;

export const IncidentCreationMutation = gql`
    mutation IncidentCreationMutation($input: IncidentAddInput!) {
        incidentAdd(input: $input) {
            id
            standard_id
            name
            description
            entity_type
            parent_types
            ...IncidentLine_node
        }
    }
`;
//#endregion

//#region incident response
export const CaseIncidentCreationCaseMutation = gql`
    mutation CaseIncidentCreationCaseMutation($input: CaseIncidentAddInput!) {
        caseIncidentAdd(input: $input) {
            id
            standard_id
            entity_type
            parent_types
            name
            description
            response_types
            ...CaseIncidentLineCase_node
        }
    }
`;
//#endregion

//#region observables
export const RootStixCyberObservableQuery = gql`
    query RootStixCyberObservableQuery($id: String!) {
        stixCyberObservable(id: $id) {
            id
            standard_id
            entity_type
            observable_value
            ...StixCyberObservable_stixCyberObservable
            ...StixCyberObservableHeader_stixCyberObservable
            ...StixCyberObservableDetails_stixCyberObservable
            ...StixCyberObservableIndicators_stixCyberObservable
            ...StixCyberObservableKnowledge_stixCyberObservable
            ...FileImportViewer_entity
            ...FileExportViewer_entity
            ...FileExternalReferencesViewer_entity
            ...WorkbenchFileViewer_entity
            ...StixCoreObjectContent_stixCoreObject
        }
        connectorsForImport {
            ...FileManager_connectorsImport
        }
        connectorsForExport {
            ...FileManager_connectorsExport
        }
    }
`;

export const StixCyberObservableCreationMutation = gql`
    mutation StixCyberObservableCreationMutation(
        $type: String!
        $x_opencti_score: Int
        $x_opencti_description: String
        $createIndicator: Boolean
        $createdBy: String
        $objectMarking: [String]
        $objectLabel: [String]
        $externalReferences: [String]
        $AutonomousSystem: AutonomousSystemAddInput
        $Directory: DirectoryAddInput
        $DomainName: DomainNameAddInput
        $EmailAddr: EmailAddrAddInput
        $EmailMessage: EmailMessageAddInput
        $EmailMimePartType: EmailMimePartTypeAddInput
        $Artifact: ArtifactAddInput
        $StixFile: StixFileAddInput
        $X509Certificate: X509CertificateAddInput
        $IPv4Addr: IPv4AddrAddInput
        $IPv6Addr: IPv6AddrAddInput
        $MacAddr: MacAddrAddInput
        $Mutex: MutexAddInput
        $NetworkTraffic: NetworkTrafficAddInput
        $Process: ProcessAddInput
        $Software: SoftwareAddInput
        $Url: UrlAddInput
        $UserAccount: UserAccountAddInput
        $WindowsRegistryKey: WindowsRegistryKeyAddInput
        $WindowsRegistryValueType: WindowsRegistryValueTypeAddInput
        $Hostname: HostnameAddInput
        $CryptographicKey: CryptographicKeyAddInput
        $CryptocurrencyWallet: CryptocurrencyWalletAddInput
        $Text: TextAddInput
        $UserAgent: UserAgentAddInput
        $BankAccount: BankAccountAddInput
        $PhoneNumber: PhoneNumberAddInput
        $PaymentCard: PaymentCardAddInput
        $MediaContent: MediaContentAddInput
        $TrackingNumber: TrackingNumberAddInput
        $Credential: CredentialAddInput # $Persona: PersonaAddInput // SEAL(temp)
    ) {
        stixCyberObservableAdd(
            type: $type
            x_opencti_score: $x_opencti_score
            x_opencti_description: $x_opencti_description
            createIndicator: $createIndicator
            createdBy: $createdBy
            objectMarking: $objectMarking
            objectLabel: $objectLabel
            externalReferences: $externalReferences
            AutonomousSystem: $AutonomousSystem
            Directory: $Directory
            DomainName: $DomainName
            EmailAddr: $EmailAddr
            EmailMessage: $EmailMessage
            EmailMimePartType: $EmailMimePartType
            Artifact: $Artifact
            StixFile: $StixFile
            X509Certificate: $X509Certificate
            IPv4Addr: $IPv4Addr
            IPv6Addr: $IPv6Addr
            MacAddr: $MacAddr
            Mutex: $Mutex
            NetworkTraffic: $NetworkTraffic
            Process: $Process
            Software: $Software
            Url: $Url
            UserAccount: $UserAccount
            WindowsRegistryKey: $WindowsRegistryKey
            WindowsRegistryValueType: $WindowsRegistryValueType
            Hostname: $Hostname
            CryptographicKey: $CryptographicKey
            CryptocurrencyWallet: $CryptocurrencyWallet
            Text: $Text
            UserAgent: $UserAgent
            BankAccount: $BankAccount
            PhoneNumber: $PhoneNumber
            PaymentCard: $PaymentCard
            MediaContent: $MediaContent
            TrackingNumber: $TrackingNumber
            Credential: $Credential # Persona: $Persona // SEAL(temp)
        ) {
            id
            standard_id
            entity_type
            observable_value
            ...StixCyberObservable_stixCyberObservable
            ...StixCyberObservableHeader_stixCyberObservable
            ...StixCyberObservableDetails_stixCyberObservable
            ...StixCyberObservableIndicators_stixCyberObservable
            ...StixCyberObservableKnowledge_stixCyberObservable
            ...FileImportViewer_entity
            ...FileExportViewer_entity
            ...FileExternalReferencesViewer_entity
            ...WorkbenchFileViewer_entity
            ...StixCoreObjectContent_stixCoreObject
        }
    }
`;

export const StixCyberObservablePopoverDeletionMutation = gql`
    mutation StixCyberObservablePopoverDeletionMutation($id: ID!) {
        stixCyberObservableEdit(id: $id) {
            delete
        }
    }
`;

export const StixCyberObservableEditionOverviewRelationAddMutation = gql`
    mutation StixCyberObservableEditionOverviewRelationAddMutation($id: ID!, $input: StixRefRelationshipAddInput!) {
        stixCyberObservableEdit(id: $id) {
            relationAdd(input: $input) {
                from {
                    __typename
                    ...StixCyberObservableEditionOverview_stixCyberObservable
                    ... on AdministrativeArea {
                        id
                    }
                    ... on Artifact {
                        id
                    }
                    ... on AttackPattern {
                        id
                    }
                    ... on AutonomousSystem {
                        id
                    }
                    ... on BankAccount {
                        id
                    }
                    ... on Campaign {
                        id
                    }
                    ... on CaseIncident {
                        id
                    }
                    ... on CaseRfi {
                        id
                    }
                    ... on CaseRft {
                        id
                    }
                    ... on CaseTemplate {
                        id
                    }
                    ... on Channel {
                        id
                    }
                    ... on City {
                        id
                    }
                    ... on Country {
                        id
                    }
                    ... on CourseOfAction {
                        id
                    }
                    ... on Creator {
                        id
                    }
                    ... on Credential {
                        id
                    }
                    ... on CryptocurrencyWallet {
                        id
                    }
                    ... on CryptographicKey {
                        id
                    }
                    ... on CsvMapper {
                        id
                    }
                    ... on DataComponent {
                        id
                    }
                    ... on DataSource {
                        id
                    }
                    ... on Directory {
                        id
                    }
                    ... on DomainName {
                        id
                    }
                    ... on EmailAddr {
                        id
                    }
                    ... on EmailMessage {
                        id
                    }
                    ... on EmailMimePartType {
                        id
                    }
                    ... on EntitySetting {
                        id
                    }
                    ... on Event {
                        id
                    }
                    ... on ExternalReference {
                        id
                    }
                    ... on Feedback {
                        id
                    }
                    ... on Group {
                        id
                    }
                    ... on Grouping {
                        id
                    }
                    ... on Hostname {
                        id
                    }
                    ... on IPv4Addr {
                        id
                    }
                    ... on IPv6Addr {
                        id
                    }
                    ... on Incident {
                        id
                    }
                    ... on Indicator {
                        id
                    }
                    ... on Individual {
                        id
                    }
                    ... on Infrastructure {
                        id
                    }
                    ... on IntrusionSet {
                        id
                    }
                    ... on KillChainPhase {
                        id
                    }
                    ... on Label {
                        id
                    }
                    ... on Language {
                        id
                    }
                    ... on MacAddr {
                        id
                    }
                    ... on Malware {
                        id
                    }
                    ... on MalwareAnalysis {
                        id
                    }
                    ... on ManagerConfiguration {
                        id
                    }
                    ... on MarkingDefinition {
                        id
                    }
                    ... on MediaContent {
                        id
                    }
                    ... on Mutex {
                        id
                    }
                    ... on Narrative {
                        id
                    }
                    ... on NetworkTraffic {
                        id
                    }
                    ... on Note {
                        id
                    }
                    ... on ObservedData {
                        id
                    }
                    ... on Opinion {
                        id
                    }
                    ... on Organization {
                        id
                    }
                    ... on PaymentCard {
                        id
                    }
                    ... on PhoneNumber {
                        id
                    }
                    ... on Position {
                        id
                    }
                    ... on Process {
                        id
                    }
                    ... on PublicDashboard {
                        id
                    }
                    ... on Region {
                        id
                    }
                    ... on Report {
                        id
                    }
                    ... on Sector {
                        id
                    }
                    ... on Software {
                        id
                    }
                    ... on Status {
                        id
                    }
                    ... on StixCoreRelationship {
                        id
                    }
                    ... on StixFile {
                        id
                    }
                    ... on StixRefRelationship {
                        id
                    }
                    ... on StixSightingRelationship {
                        id
                    }
                    ... on System {
                        id
                    }
                    ... on Task {
                        id
                    }
                    ... on Text {
                        id
                    }
                    ... on ThreatActorGroup {
                        id
                    }
                    ... on ThreatActorIndividual {
                        id
                    }
                    ... on Tool {
                        id
                    }
                    ... on TrackingNumber {
                        id
                    }
                    ... on Url {
                        id
                    }
                    ... on UserAccount {
                        id
                    }
                    ... on UserAgent {
                        id
                    }
                    ... on Vulnerability {
                        id
                    }
                    ... on WindowsRegistryKey {
                        id
                    }
                    ... on WindowsRegistryValueType {
                        id
                    }
                    ... on Workspace {
                        id
                    }
                    ... on X509Certificate {
                        id
                    }
                }
                id
            }
        }
    }
`;

export const StixCyberObservableEditionOverviewRelationDeleteMutation = gql`
    mutation StixCyberObservableEditionOverviewRelationDeleteMutation(
        $id: ID!
        $toId: StixRef!
        $relationship_type: String!
    ) {
        stixCyberObservableEdit(id: $id) {
            relationDelete(toId: $toId, relationship_type: $relationship_type) {
                __typename
                ...StixCyberObservableEditionOverview_stixCyberObservable
                ...StixCyberObservable_stixCyberObservable
                id
            }
        }
    }
`;
//#endregion

//#region indicators
export const RootIndicatorQuery = gql`
    query RootIndicatorQuery($id: String!) {
        indicator(id: $id) {
            id
            standard_id
            entity_type
            name
            pattern
            ...Indicator_indicator
            ...IndicatorDetails_indicator
            ...FileImportViewer_entity
            ...FileExportViewer_entity
            ...FileExternalReferencesViewer_entity
            ...WorkbenchFileViewer_entity
            ...StixCoreObjectContent_stixCoreObject
        }
        connectorsForImport {
            ...FileManager_connectorsImport
            id
        }
        connectorsForExport {
            ...FileManager_connectorsExport
            id
        }
    }
`;

export const IndicatorCreationMutation = gql`
    mutation IndicatorCreationMutation($input: IndicatorAddInput!) {
        indicatorAdd(input: $input) {
            id
            standard_id
            entity_type
            name
            pattern
            ...Indicator_indicator
            ...IndicatorDetails_indicator
            ...FileImportViewer_entity
            ...FileExportViewer_entity
            ...FileExternalReferencesViewer_entity
            ...WorkbenchFileViewer_entity
            ...StixCoreObjectContent_stixCoreObject
        }
    }
`;

export const IndicatorEditionOverviewFieldPatchMutation = gql`
    mutation IndicatorEditionOverviewFieldPatchMutation(
        $id: ID!
        $input: [EditInput!]!
        $commitMessage: String
        $references: [String]
    ) {
        indicatorFieldPatch(id: $id, input: $input, commitMessage: $commitMessage, references: $references) {
            id
            standard_id
            entity_type
            name
            pattern
            ...Indicator_indicator
            ...IndicatorDetails_indicator
            ...FileImportViewer_entity
            ...FileExportViewer_entity
            ...FileExternalReferencesViewer_entity
            ...WorkbenchFileViewer_entity
            ...StixCoreObjectContent_stixCoreObject
        }
    }
`;

export const IndicatorAddObservablesLinesRelationAddMutation = gql`
    mutation IndicatorAddObservablesLinesRelationAddMutation($input: StixCoreRelationshipAddInput!) {
        stixCoreRelationshipAdd(input: $input) {
            id
            from {
                ...Indicator_indicator
                ...IndicatorDetails_indicator
                ...FileImportViewer_entity
                ...FileExportViewer_entity
                ...FileExternalReferencesViewer_entity
                ...WorkbenchFileViewer_entity
                ...StixCoreObjectContent_stixCoreObject
            }
        }
    }
`;

export const IndicatorObservablePopoverDeletionMutation = gql`
    mutation IndicatorObservablePopoverDeletionMutation(
        $fromId: StixRef!
        $toId: StixRef!
        $relationship_type: String!
    ) {
        stixCoreRelationshipDelete(fromId: $fromId, toId: $toId, relationship_type: $relationship_type)
    }
`;

export const StixCoreRelationshipPopoverDeletionMutation = gql`
    mutation StixCoreRelationshipPopoverDeletionMutation($id: ID!) {
        stixCoreRelationshipEdit(id: $id) {
            delete
        }
    }
`;

export const IndicatorEditionOverviewRelationAddMutation = gql`
    mutation IndicatorEditionOverviewRelationAddMutation($id: ID!, $input: StixRefRelationshipAddInput!) {
        indicatorRelationAdd(id: $id, input: $input) {
            from {
                ...Indicator_indicator
                ...IndicatorDetails_indicator
                ...FileImportViewer_entity
                ...FileExportViewer_entity
                ...FileExternalReferencesViewer_entity
                ...WorkbenchFileViewer_entity
                ...StixCoreObjectContent_stixCoreObject
            }
        }
    }
`;

export const IndicatorEditionOverviewRelationDeleteMutation = gql`
    mutation IndicatorEditionOverviewRelationDeleteMutation($id: ID!, $toId: StixRef!, $relationship_type: String!) {
        indicatorRelationDelete(id: $id, toId: $toId, relationship_type: $relationship_type) {
            ...Indicator_indicator
            ...IndicatorDetails_indicator
            ...FileImportViewer_entity
            ...FileExportViewer_entity
            ...FileExternalReferencesViewer_entity
            ...WorkbenchFileViewer_entity
            ...StixCoreObjectContent_stixCoreObject
        }
    }
`;

export const IndicatorPopoverDeletionMutation = gql`
    mutation IndicatorPopoverDeletionMutation($id: ID!) {
        indicatorDelete(id: $id)
    }
`;
//#endregion

//#region notes
export const NoteCreationUserMutation = gql`
    mutation NoteCreationUserMutation($input: NoteUserAddInput!) {
        userNoteAdd(input: $input) {
            id
            standard_id
            entity_type
            parent_types
            attribute_abstract
            content
            ...NoteLine_node
        }
    }
`;

export const NoteCreationMutation = gql`
    mutation NoteCreationMutation($input: NoteAddInput!) {
        noteAdd(input: $input) {
            id
            standard_id
            entity_type
            parent_types
            attribute_abstract
            content
            ...NoteLine_node
        }
    }
`;

export const StixCoreObjectOrStixCoreRelationshipNotesCardsQuery = gql`
    query StixCoreObjectOrStixCoreRelationshipNotesCardsQuery(
        $count: Int!
        $orderBy: NotesOrdering
        $orderMode: OrderingMode
        $filters: FilterGroup
    ) {
        ...StixCoreObjectOrStixCoreRelationshipNotesCards_data_4wlaAN
    }

    fragment StixCoreObjectOrStixCoreRelationshipNotesCards_data_4wlaAN on Query {
        notes(first: $count, orderBy: $orderBy, orderMode: $orderMode, filters: $filters) {
            edges {
                node {
                    id
                    ...StixCoreObjectOrStixCoreRelationshipNoteCard_node
                    objectMarking {
                        id
                        definition_type
                        definition
                        x_opencti_order
                        x_opencti_color
                    }
                    __typename
                }
                cursor
            }
            pageInfo {
                endCursor
                hasNextPage
            }
        }
    }
`;
//#endregion

export const StixCoreRelationshipCreationFromEntityToMutation = gql`
    mutation StixCoreRelationshipCreationFromEntityToMutation($input: StixCoreRelationshipAddInput!) {
        stixCoreRelationshipAdd(input: $input) {
            ...EntityStixCoreRelationshipLineAll_node
        }
    }
`;

export const ProfileQuery = gql`
    query ProfileQuery {
        me {
            ...ProfileOverview_me
            id
        }
        about {
            ...ProfileOverview_about
        }
        settings {
            ...ProfileOverview_settings
            id
        }
    }

    fragment ProfileOverview_about on AppInfo {
        version
    }

    fragment ProfileOverview_me on MeUser {
        id
        name
        user_email
        external
        firstname
        lastname
        language
        theme
        api_token
        otp_activated
        otp_qr
        description
        unit_system
        submenu_show_icons
        submenu_auto_collapse
        monochrome_labels
        personal_notifiers {
            id
            name
        }
        objectOrganization {
            edges {
                node {
                    name
                    id
                }
            }
        }
    }

    fragment ProfileOverview_settings on Settings {
        otp_mandatory
    }
`;

export const RootIndividualQuery = gql`
    query RootIndividualQuery($id: String!) {
        individual(id: $id) {
            id
            entity_type
            name
            x_opencti_aliases
            stixCoreObjectsDistribution(field: "entity_type", operation: count) {
                label
                value
            }
            ...Individual_individual
            ...IndividualKnowledge_individual
            ...FileImportViewer_entity
            ...FileExportViewer_entity
            ...FileExternalReferencesViewer_entity
            ...WorkbenchFileViewer_entity
            ...PictureManagementViewer_entity
            ...StixCoreObjectContent_stixCoreObject
        }
        connectorsForImport {
            ...FileManager_connectorsImport
            id
        }
        connectorsForExport {
            ...FileManager_connectorsExport
            id
        }
    }
`;

export const IndividualCreationMutation = gql`
    mutation IndividualCreationMutation($input: IndividualAddInput!) {
        individualAdd(input: $input) {
            id
            entity_type
            name
            x_opencti_aliases
            stixCoreObjectsDistribution(field: "entity_type", operation: count) {
                label
                value
            }
            ...Individual_individual
            ...IndividualKnowledge_individual
            ...FileImportViewer_entity
            ...FileExportViewer_entity
            ...FileExternalReferencesViewer_entity
            ...WorkbenchFileViewer_entity
            ...PictureManagementViewer_entity
            ...StixCoreObjectContent_stixCoreObject
        }
    }
`;

export const IndividualPopoverDeletionMutation = gql`
    mutation IndividualPopoverDeletionMutation($id: ID!) {
        individualEdit(id: $id) {
            delete
        }
    }
`;

export const StixCoreObjectLabelsViewRelationsAddMutation = gql`
    mutation StixCoreObjectLabelsViewRelationsAddMutation(
        $id: ID!
        $input: StixRefRelationshipsAddInput!
        $commitMessage: String
        $references: [String]
    ) {
        stixCoreObjectEdit(id: $id) {
            relationsAdd(input: $input, commitMessage: $commitMessage, references: $references) {
                __typename
                objectLabel {
                    id
                    value
                    color
                }
                id
            }
        }
    }
`;

export const StixCoreObjectLabelsViewRelationDeleteMutation = gql`
    mutation StixCoreObjectLabelsViewRelationDeleteMutation(
        $id: ID!
        $toId: StixRef!
        $relationship_type: String!
        $commitMessage: String
        $references: [String]
    ) {
        stixCoreObjectEdit(id: $id) {
            relationDelete(
                toId: $toId
                relationship_type: $relationship_type
                commitMessage: $commitMessage
                references: $references
            ) {
                __typename
                __isStixCoreObject: __typename
                objectLabel {
                    id
                    value
                    color
                }
                id
            }
        }
    }
`;

export const LabelsQuerySearchQuery = gql`
    query LabelsQuerySearchQuery($search: String) {
        labels(search: $search) {
            edges {
                node {
                    id
                    value
                    color
                }
            }
        }
    }
`;

export const IdentitySearchIdentitiesQuery = gql`
    query IdentitySearchIdentitiesSearchQuery($types: [String], $search: String, $first: Int) {
        identities(types: $types, orderBy: _score, orderMode: desc, search: $search, first: $first) {
            edges {
                node {
                    __typename
                    id
                    standard_id
                    identity_class
                    name
                    entity_type
                }
            }
        }
    }
`;

export const OpenVocabFieldQuery = gql`
    query OpenVocabFieldQuery($category: VocabularyCategory!, $orderBy: VocabularyOrdering, $orderMode: OrderingMode) {
        vocabularies(category: $category, orderBy: $orderBy, orderMode: $orderMode) {
            edges {
                node {
                    id
                    name
                    description
                }
            }
        }
    }
`;

export const RootPrivateQuery = gql`
    query RootPrivateQuery {
        me {
            ...RootMe_data
            id
        }
        settings {
            ...RootSettings
            id
        }
        about {
            version
        }
        entitySettings {
            edges {
                node {
                    id
                    ...EntitySettingSettings_entitySetting
                }
            }
        }
        schemaSCOs: subTypes(type: "Stix-Cyber-Observable") {
            edges {
                node {
                    id
                    label
                }
            }
        }
        schemaSDOs: subTypes(type: "Stix-Domain-Object") {
            edges {
                node {
                    id
                    label
                }
            }
        }
        schemaSMOs: subTypes(type: "Stix-Meta-Object") {
            edges {
                node {
                    id
                    label
                }
            }
        }
        schemaSCRs: subTypes(type: "stix-core-relationship") {
            edges {
                node {
                    id
                    label
                }
            }
        }
        schemaRelationsTypesMapping {
            key
            values
        }
        schemaRelationsRefTypesMapping {
            key
            values {
                name
                toTypes
            }
        }
        filterKeysSchema {
            entity_type
            filters_schema {
                filterKey
                filterDefinition {
                    filterKey
                    label
                    type
                    multiple
                    subEntityTypes
                    elementsForFilterValuesSearch
                    subFilters {
                        filterKey
                        label
                        type
                        multiple
                        subEntityTypes
                        elementsForFilterValuesSearch
                    }
                }
            }
        }
    }

    fragment AppIntlProvider_settings on Settings {
        platform_language
    }

    fragment AppThemeProvider_settings on Settings {
        platform_title
        platform_favicon
        platform_theme
        platform_theme_dark_background
        platform_theme_dark_paper
        platform_theme_dark_nav
        platform_theme_dark_primary
        platform_theme_dark_secondary
        platform_theme_dark_accent
        platform_theme_dark_logo
        platform_theme_dark_logo_collapsed
        platform_theme_light_background
        platform_theme_light_paper
        platform_theme_light_nav
        platform_theme_light_primary
        platform_theme_light_secondary
        platform_theme_light_accent
        platform_theme_light_logo
        platform_theme_light_logo_collapsed
    }

    fragment EntitySettingSettings_entitySetting on EntitySetting {
        id
        target_type
        platform_entity_files_ref
        platform_hidden_type
        enforce_reference
        availableSettings
        mandatoryAttributes
        scaleAttributes {
            name
            scale
        }
        defaultValuesAttributes {
            name
            type
            defaultValues {
                id
                name
            }
        }
    }

    fragment PasswordPolicies on Settings {
        password_policy_min_length
        password_policy_max_length
        password_policy_min_symbols
        password_policy_min_numbers
        password_policy_min_words
        password_policy_min_lowercase
        password_policy_min_uppercase
    }

    fragment Policies on Settings {
        id
        platform_login_message
        platform_consent_message
        platform_consent_confirm_text
        platform_banner_level
        platform_banner_text
        password_policy_min_length
        password_policy_max_length
        password_policy_min_symbols
        password_policy_min_numbers
        password_policy_min_words
        password_policy_min_lowercase
        password_policy_min_uppercase
        platform_providers {
            name
            strategy
        }
        platform_organization {
            id
            name
        }
        otp_mandatory
    }

    fragment RootMe_data on MeUser {
        id
        name
        lastname
        language
        theme
        user_email
        individual_id
        effective_confidence_level {
            max_confidence
            overrides {
                entity_type
                max_confidence
            }
        }
        capabilities {
            name
            id
        }
        unit_system
        submenu_show_icons
        submenu_auto_collapse
        monochrome_labels
        default_dashboards {
            id
            name
        }
        default_dashboard {
            id
        }
        default_time_field
        default_hidden_types
        default_marking {
            entity_type
            values {
                id
                definition
            }
        }
        administrated_organizations {
            id
            name
            authorized_authorities
        }
        allowed_marking {
            id
            entity_type
            standard_id
            definition_type
            definition
            x_opencti_color
            x_opencti_order
        }
        max_shareable_marking {
            id
            definition_type
            x_opencti_order
        }
        personal_notifiers {
            id
            name
        }
    }

    fragment RootSettings on Settings {
        id
        platform_title
        platform_demo
        platform_banner_text
        platform_user_statuses {
            status
            message
        }
        platform_banner_level
        platform_critical_alerts {
            message
            type
            details {
                groups {
                    id
                    name
                }
            }
        }
        platform_map_tile_server_dark
        platform_map_tile_server_light
        platform_openbas_url
        platform_openbas_disable_display
        platform_openerm_url
        platform_openmtd_url
        platform_theme
        platform_whitemark
        platform_session_idle_timeout
        platform_session_timeout
        platform_feature_flags {
            id
            enable
        }
        platform_modules {
            id
            enable
            running
            warning
        }
        enterprise_edition
        ...AppThemeProvider_settings
        ...AppIntlProvider_settings
        ...PasswordPolicies
        ...Policies
        analytics_google_analytics_v4
        platform_ai_enabled
        platform_ai_type
        platform_ai_has_token
    }
`;

export const CaseRftCreationCaseMutation = gql`
    mutation CaseRftCreationCaseMutation($input: CaseRftAddInput!) {
        caseRftAdd(input: $input) {
            id
            standard_id
            entity_type
            parent_types
            name
            description
            ...CaseRftLineCase_node
        }
    }

    fragment CaseRftLineCase_node on CaseRft {
        id
        name
        description
        entity_type
        created
        takedown_types
        priority
        severity
        objectAssignee {
            entity_type
            id
            name
        }
        objectMarking {
            id
            definition_type
            definition
            x_opencti_order
            x_opencti_color
        }
        objectLabel {
            id
            value
            color
        }
        creators {
            id
            name
        }
        status {
            id
            order
            template {
                name
                color
                id
            }
        }
        workflowEnabled
    }
`;

export const RootCaseRftCaseQuery = gql`
    query RootCaseRftCaseQuery($id: String!) {
        caseRft(id: $id) {
            id
            standard_id
            entity_type
            name
            x_opencti_graph_data
            ...CaseUtils_case
            ...CaseRftKnowledge_case
            ...FileImportViewer_entity
            ...FileExportViewer_entity
            ...FileExternalReferencesViewer_entity
            ...WorkbenchFileViewer_entity
            ...StixCoreObjectContent_stixCoreObject
            ...ContainerHeader_container
            ...ContainerStixDomainObjects_container
            ...ContainerStixCyberObservables_container
        }
        connectorsForExport {
            ...StixCoreObjectFilesAndHistory_connectorsExport
            id
        }
        connectorsForImport {
            ...StixCoreObjectFilesAndHistory_connectorsImport
            id
        }
    }

    fragment CaseIncidentDetails_case on CaseIncident {
        id
        name
        description
        priority
        severity
        created
        modified
        created_at
        response_types
        objectLabel {
            id
            value
            color
        }
        x_opencti_stix_ids
        status {
            id
            order
            template {
                name
                color
                id
            }
        }
        workflowEnabled
        relatedContainers(
            first: 10
            orderBy: created
            orderMode: desc
            types: ["Case"]
            viaTypes: ["Indicator", "Stix-Cyber-Observable"]
        ) {
            edges {
                node {
                    __typename
                    id
                    entity_type
                    ... on CaseIncident {
                        name
                        description
                        created
                        createdBy {
                            __typename
                            __isIdentity: __typename
                            id
                            name
                            entity_type
                        }
                        objectMarking {
                            id
                            definition_type
                            definition
                            x_opencti_order
                            x_opencti_color
                        }
                    }
                    ... on CaseRfi {
                        name
                        description
                        created
                        createdBy {
                            __typename
                            __isIdentity: __typename
                            id
                            name
                            entity_type
                        }
                        objectMarking {
                            id
                            definition_type
                            definition
                            x_opencti_order
                            x_opencti_color
                        }
                    }
                    ... on CaseRft {
                        name
                        description
                        created
                        createdBy {
                            __typename
                            __isIdentity: __typename
                            id
                            name
                            entity_type
                        }
                        objectMarking {
                            id
                            definition_type
                            definition
                            x_opencti_order
                            x_opencti_color
                        }
                    }
                }
            }
        }
    }

    fragment CaseRfiDetails_case on CaseRfi {
        id
        name
        description
        created
        modified
        created_at
        information_types
        severity
        priority
        objectLabel {
            id
            value
            color
        }
        x_opencti_stix_ids
        status {
            id
            order
            template {
                name
                color
                id
            }
        }
        workflowEnabled
        relatedContainers(
            first: 10
            orderBy: created
            orderMode: desc
            types: ["Case"]
            viaTypes: ["Indicator", "Stix-Cyber-Observable"]
        ) {
            edges {
                node {
                    __typename
                    id
                    entity_type
                    ... on CaseIncident {
                        name
                        description
                        created
                        createdBy {
                            __typename
                            __isIdentity: __typename
                            id
                            name
                            entity_type
                        }
                        objectMarking {
                            id
                            definition_type
                            definition
                            x_opencti_order
                            x_opencti_color
                        }
                    }
                    ... on CaseRfi {
                        name
                        description
                        created
                        createdBy {
                            __typename
                            __isIdentity: __typename
                            id
                            name
                            entity_type
                        }
                        objectMarking {
                            id
                            definition_type
                            definition
                            x_opencti_order
                            x_opencti_color
                        }
                    }
                    ... on CaseRft {
                        name
                        description
                        created
                        createdBy {
                            __typename
                            __isIdentity: __typename
                            id
                            name
                            entity_type
                        }
                        objectMarking {
                            id
                            definition_type
                            definition
                            x_opencti_order
                            x_opencti_color
                        }
                    }
                }
            }
        }
    }

    fragment CaseRftDetails_case on CaseRft {
        id
        name
        description
        created
        modified
        created_at
        takedown_types
        priority
        severity
        objectLabel {
            id
            value
            color
        }
        x_opencti_stix_ids
        status {
            id
            order
            template {
                name
                color
                id
            }
        }
        workflowEnabled
        relatedContainers(
            first: 10
            orderBy: created
            orderMode: desc
            types: ["Case"]
            viaTypes: ["Indicator", "Stix-Cyber-Observable"]
        ) {
            edges {
                node {
                    __typename
                    id
                    entity_type
                    ... on CaseIncident {
                        name
                        description
                        created
                        createdBy {
                            __typename
                            __isIdentity: __typename
                            id
                            name
                            entity_type
                        }
                        objectMarking {
                            id
                            definition_type
                            definition
                            x_opencti_order
                            x_opencti_color
                        }
                    }
                    ... on CaseRfi {
                        name
                        description
                        created
                        createdBy {
                            __typename
                            __isIdentity: __typename
                            id
                            name
                            entity_type
                        }
                        objectMarking {
                            id
                            definition_type
                            definition
                            x_opencti_order
                            x_opencti_color
                        }
                    }
                    ... on CaseRft {
                        name
                        description
                        created
                        createdBy {
                            __typename
                            __isIdentity: __typename
                            id
                            name
                            entity_type
                        }
                        objectMarking {
                            id
                            definition_type
                            definition
                            x_opencti_order
                            x_opencti_color
                        }
                    }
                }
            }
        }
    }

    fragment CaseRftKnowledge_case on CaseRft {
        id
        editContext {
            name
            focusOn
        }
        ...ContainerHeader_container
    }

    fragment CaseUtils_case on Case {
        __isCase: __typename
        id
        name
        standard_id
        entity_type
        x_opencti_stix_ids
        created
        modified
        created_at
        revoked
        description
        confidence
        creators {
            id
            name
        }
        createdBy {
            __typename
            __isIdentity: __typename
            id
            name
            entity_type
            x_opencti_reliability
        }
        objectMarking {
            id
            definition_type
            definition
            x_opencti_order
            x_opencti_color
        }
        objectLabel {
            id
            value
            color
        }
        objectAssignee {
            id
            name
            entity_type
        }
        objectParticipant {
            id
            name
            entity_type
        }
        status {
            id
            order
            template {
                name
                color
                id
            }
        }
        workflowEnabled
        ...CaseIncidentDetails_case
        ...FeedbackDetails_case
        ...CaseRftDetails_case
        ...CaseRfiDetails_case
        ...ContainerHeader_container
        ...ContainerStixObjectsOrStixRelationships_container
    }

    fragment ContainerHeader_container on Container {
        __isContainer: __typename
        id
        entity_type
        standard_id
        confidence
        created
        ... on Report {
            name
        }
        ... on Grouping {
            name
        }
        ... on Case {
            __isCase: __typename
            name
        }
        ... on Feedback {
            name
        }
        ... on Task {
            name
        }
        ... on CaseIncident {
            name
        }
        ... on CaseRfi {
            name
        }
        ... on CaseRft {
            name
        }
        ... on Note {
            attribute_abstract
            content
        }
        ... on Opinion {
            opinion
        }
        ... on ObservedData {
            name
            first_observed
            last_observed
        }
        createdBy {
            __typename
            id
        }
        objectMarking {
            id
            definition_type
            definition
            x_opencti_order
            x_opencti_color
        }
    }

    fragment ContainerStixCyberObservables_container on Container {
        __isContainer: __typename
        id
        ... on Report {
            name
        }
        ... on Grouping {
            name
        }
        ... on Note {
            attribute_abstract
            content
        }
        ... on Opinion {
            opinion
        }
        ... on ObservedData {
            name
            first_observed
            last_observed
        }
        ...ContainerHeader_container
        objects {
            edges {
                types
                node {
                    __typename
                    ... on BasicObject {
                        __isBasicObject: __typename
                        id
                    }
                    ... on AdministrativeArea {
                        id
                    }
                    ... on Artifact {
                        id
                    }
                    ... on AttackPattern {
                        id
                    }
                    ... on AutonomousSystem {
                        id
                    }
                    ... on BankAccount {
                        id
                    }
                    ... on Campaign {
                        id
                    }
                    ... on CaseIncident {
                        id
                    }
                    ... on CaseRfi {
                        id
                    }
                    ... on CaseRft {
                        id
                    }
                    ... on CaseTemplate {
                        id
                    }
                    ... on Channel {
                        id
                    }
                    ... on City {
                        id
                    }
                    ... on Country {
                        id
                    }
                    ... on CourseOfAction {
                        id
                    }
                    ... on Credential {
                        id
                    }
                    ... on CryptocurrencyWallet {
                        id
                    }
                    ... on CryptographicKey {
                        id
                    }
                    ... on CsvMapper {
                        id
                    }
                    ... on DataComponent {
                        id
                    }
                    ... on DataSource {
                        id
                    }
                    ... on Directory {
                        id
                    }
                    ... on DomainName {
                        id
                    }
                    ... on EmailAddr {
                        id
                    }
                    ... on EmailMessage {
                        id
                    }
                    ... on EmailMimePartType {
                        id
                    }
                    ... on EntitySetting {
                        id
                    }
                    ... on Event {
                        id
                    }
                    ... on ExternalReference {
                        id
                    }
                    ... on Feedback {
                        id
                    }
                    ... on Grouping {
                        id
                    }
                    ... on Hostname {
                        id
                    }
                    ... on IPv4Addr {
                        id
                    }
                    ... on IPv6Addr {
                        id
                    }
                    ... on Incident {
                        id
                    }
                    ... on Indicator {
                        id
                    }
                    ... on Individual {
                        id
                    }
                    ... on Infrastructure {
                        id
                    }
                    ... on IntrusionSet {
                        id
                    }
                    ... on KillChainPhase {
                        id
                    }
                    ... on Label {
                        id
                    }
                    ... on Language {
                        id
                    }
                    ... on MacAddr {
                        id
                    }
                    ... on Malware {
                        id
                    }
                    ... on MalwareAnalysis {
                        id
                    }
                    ... on ManagerConfiguration {
                        id
                    }
                    ... on MarkingDefinition {
                        id
                    }
                    ... on MediaContent {
                        id
                    }
                    ... on Mutex {
                        id
                    }
                    ... on Narrative {
                        id
                    }
                    ... on NetworkTraffic {
                        id
                    }
                    ... on Note {
                        id
                    }
                    ... on ObservedData {
                        id
                    }
                    ... on Opinion {
                        id
                    }
                    ... on Organization {
                        id
                    }
                    ... on PaymentCard {
                        id
                    }
                    ... on PhoneNumber {
                        id
                    }
                    ... on Position {
                        id
                    }
                    ... on Process {
                        id
                    }
                    ... on PublicDashboard {
                        id
                    }
                    ... on Region {
                        id
                    }
                    ... on Report {
                        id
                    }
                    ... on Sector {
                        id
                    }
                    ... on Software {
                        id
                    }
                    ... on StixCoreRelationship {
                        id
                    }
                    ... on StixFile {
                        id
                    }
                    ... on StixRefRelationship {
                        id
                    }
                    ... on StixSightingRelationship {
                        id
                    }
                    ... on System {
                        id
                    }
                    ... on Task {
                        id
                    }
                    ... on Text {
                        id
                    }
                    ... on ThreatActorGroup {
                        id
                    }
                    ... on ThreatActorIndividual {
                        id
                    }
                    ... on Tool {
                        id
                    }
                    ... on TrackingNumber {
                        id
                    }
                    ... on Url {
                        id
                    }
                    ... on UserAccount {
                        id
                    }
                    ... on UserAgent {
                        id
                    }
                    ... on Vulnerability {
                        id
                    }
                    ... on WindowsRegistryKey {
                        id
                    }
                    ... on WindowsRegistryValueType {
                        id
                    }
                    ... on Workspace {
                        id
                    }
                    ... on X509Certificate {
                        id
                    }
                }
            }
        }
    }

    fragment ContainerStixDomainObjectLine_node on StixDomainObject {
        __isStixDomainObject: __typename
        id
        standard_id
        entity_type
        parent_types
        created_at
        ... on AttackPattern {
            name
            x_mitre_id
        }
        ... on Campaign {
            name
        }
        ... on CourseOfAction {
            name
        }
        ... on ObservedData {
            name
        }
        ... on Report {
            name
        }
        ... on Grouping {
            name
        }
        ... on Note {
            attribute_abstract
            content
        }
        ... on Opinion {
            opinion
        }
        ... on Individual {
            name
        }
        ... on Organization {
            name
        }
        ... on Sector {
            name
        }
        ... on System {
            name
        }
        ... on Indicator {
            name
        }
        ... on Infrastructure {
            name
        }
        ... on IntrusionSet {
            name
        }
        ... on Position {
            name
        }
        ... on City {
            name
        }
        ... on AdministrativeArea {
            name
        }
        ... on Country {
            name
        }
        ... on Region {
            name
        }
        ... on Malware {
            name
        }
        ... on MalwareAnalysis {
            result_name
        }
        ... on ThreatActor {
            __isThreatActor: __typename
            name
        }
        ... on Tool {
            name
        }
        ... on Vulnerability {
            name
        }
        ... on Incident {
            name
        }
        ... on Event {
            name
        }
        ... on Channel {
            name
        }
        ... on Narrative {
            name
        }
        ... on Language {
            name
        }
        ... on DataComponent {
            name
        }
        ... on DataSource {
            name
        }
        ... on Case {
            __isCase: __typename
            name
        }
        ... on Task {
            name
        }
        objectLabel {
            id
            value
            color
        }
        createdBy {
            __typename
            __isIdentity: __typename
            id
            name
            entity_type
        }
        objectMarking {
            id
            definition_type
            definition
            x_opencti_order
            x_opencti_color
        }
        containersNumber {
            total
        }
    }

    fragment ContainerStixDomainObjects_container on Container {
        __isContainer: __typename
        id
        ... on Report {
            name
        }
        ... on Grouping {
            name
        }
        ... on Note {
            attribute_abstract
            content
        }
        ... on Opinion {
            opinion
        }
        ... on ObservedData {
            name
            first_observed
            last_observed
        }
        ...ContainerHeader_container
        objects {
            edges {
                types
                node {
                    __typename
                    ... on BasicObject {
                        __isBasicObject: __typename
                        id
                    }
                    ...ContainerStixDomainObjectLine_node
                    ... on AdministrativeArea {
                        id
                    }
                    ... on Artifact {
                        id
                    }
                    ... on AttackPattern {
                        id
                    }
                    ... on AutonomousSystem {
                        id
                    }
                    ... on BankAccount {
                        id
                    }
                    ... on Campaign {
                        id
                    }
                    ... on CaseIncident {
                        id
                    }
                    ... on CaseRfi {
                        id
                    }
                    ... on CaseRft {
                        id
                    }
                    ... on CaseTemplate {
                        id
                    }
                    ... on Channel {
                        id
                    }
                    ... on City {
                        id
                    }
                    ... on Country {
                        id
                    }
                    ... on CourseOfAction {
                        id
                    }
                    ... on Credential {
                        id
                    }
                    ... on CryptocurrencyWallet {
                        id
                    }
                    ... on CryptographicKey {
                        id
                    }
                    ... on CsvMapper {
                        id
                    }
                    ... on DataComponent {
                        id
                    }
                    ... on DataSource {
                        id
                    }
                    ... on Directory {
                        id
                    }
                    ... on DomainName {
                        id
                    }
                    ... on EmailAddr {
                        id
                    }
                    ... on EmailMessage {
                        id
                    }
                    ... on EmailMimePartType {
                        id
                    }
                    ... on EntitySetting {
                        id
                    }
                    ... on Event {
                        id
                    }
                    ... on ExternalReference {
                        id
                    }
                    ... on Feedback {
                        id
                    }
                    ... on Grouping {
                        id
                    }
                    ... on Hostname {
                        id
                    }
                    ... on IPv4Addr {
                        id
                    }
                    ... on IPv6Addr {
                        id
                    }
                    ... on Incident {
                        id
                    }
                    ... on Indicator {
                        id
                    }
                    ... on Individual {
                        id
                    }
                    ... on Infrastructure {
                        id
                    }
                    ... on IntrusionSet {
                        id
                    }
                    ... on KillChainPhase {
                        id
                    }
                    ... on Label {
                        id
                    }
                    ... on Language {
                        id
                    }
                    ... on MacAddr {
                        id
                    }
                    ... on Malware {
                        id
                    }
                    ... on MalwareAnalysis {
                        id
                    }
                    ... on ManagerConfiguration {
                        id
                    }
                    ... on MarkingDefinition {
                        id
                    }
                    ... on MediaContent {
                        id
                    }
                    ... on Mutex {
                        id
                    }
                    ... on Narrative {
                        id
                    }
                    ... on NetworkTraffic {
                        id
                    }
                    ... on Note {
                        id
                    }
                    ... on ObservedData {
                        id
                    }
                    ... on Opinion {
                        id
                    }
                    ... on Organization {
                        id
                    }
                    ... on PaymentCard {
                        id
                    }
                    ... on PhoneNumber {
                        id
                    }
                    ... on Position {
                        id
                    }
                    ... on Process {
                        id
                    }
                    ... on PublicDashboard {
                        id
                    }
                    ... on Region {
                        id
                    }
                    ... on Report {
                        id
                    }
                    ... on Sector {
                        id
                    }
                    ... on Software {
                        id
                    }
                    ... on StixCoreRelationship {
                        id
                    }
                    ... on StixFile {
                        id
                    }
                    ... on StixRefRelationship {
                        id
                    }
                    ... on StixSightingRelationship {
                        id
                    }
                    ... on System {
                        id
                    }
                    ... on Task {
                        id
                    }
                    ... on Text {
                        id
                    }
                    ... on ThreatActorGroup {
                        id
                    }
                    ... on ThreatActorIndividual {
                        id
                    }
                    ... on Tool {
                        id
                    }
                    ... on TrackingNumber {
                        id
                    }
                    ... on Url {
                        id
                    }
                    ... on UserAccount {
                        id
                    }
                    ... on UserAgent {
                        id
                    }
                    ... on Vulnerability {
                        id
                    }
                    ... on WindowsRegistryKey {
                        id
                    }
                    ... on WindowsRegistryValueType {
                        id
                    }
                    ... on Workspace {
                        id
                    }
                    ... on X509Certificate {
                        id
                    }
                }
            }
        }
    }

    fragment ContainerStixObjectsOrStixRelationships_container on Container {
        __isContainer: __typename
        id
        confidence
        createdBy {
            __typename
            __isIdentity: __typename
            id
            name
            entity_type
        }
        objectMarking {
            id
            definition_type
            definition
            x_opencti_order
            x_opencti_color
        }
        creators {
            id
            name
        }
        objects {
            edges {
                node {
                    __typename
                    ... on BasicObject {
                        __isBasicObject: __typename
                        id
                    }
                    ... on AdministrativeArea {
                        id
                    }
                    ... on Artifact {
                        id
                    }
                    ... on AttackPattern {
                        id
                    }
                    ... on AutonomousSystem {
                        id
                    }
                    ... on BankAccount {
                        id
                    }
                    ... on Campaign {
                        id
                    }
                    ... on CaseIncident {
                        id
                    }
                    ... on CaseRfi {
                        id
                    }
                    ... on CaseRft {
                        id
                    }
                    ... on CaseTemplate {
                        id
                    }
                    ... on Channel {
                        id
                    }
                    ... on City {
                        id
                    }
                    ... on Country {
                        id
                    }
                    ... on CourseOfAction {
                        id
                    }
                    ... on Credential {
                        id
                    }
                    ... on CryptocurrencyWallet {
                        id
                    }
                    ... on CryptographicKey {
                        id
                    }
                    ... on CsvMapper {
                        id
                    }
                    ... on DataComponent {
                        id
                    }
                    ... on DataSource {
                        id
                    }
                    ... on Directory {
                        id
                    }
                    ... on DomainName {
                        id
                    }
                    ... on EmailAddr {
                        id
                    }
                    ... on EmailMessage {
                        id
                    }
                    ... on EmailMimePartType {
                        id
                    }
                    ... on EntitySetting {
                        id
                    }
                    ... on Event {
                        id
                    }
                    ... on ExternalReference {
                        id
                    }
                    ... on Feedback {
                        id
                    }
                    ... on Grouping {
                        id
                    }
                    ... on Hostname {
                        id
                    }
                    ... on IPv4Addr {
                        id
                    }
                    ... on IPv6Addr {
                        id
                    }
                    ... on Incident {
                        id
                    }
                    ... on Indicator {
                        id
                    }
                    ... on Individual {
                        id
                    }
                    ... on Infrastructure {
                        id
                    }
                    ... on IntrusionSet {
                        id
                    }
                    ... on KillChainPhase {
                        id
                    }
                    ... on Label {
                        id
                    }
                    ... on Language {
                        id
                    }
                    ... on MacAddr {
                        id
                    }
                    ... on Malware {
                        id
                    }
                    ... on MalwareAnalysis {
                        id
                    }
                    ... on ManagerConfiguration {
                        id
                    }
                    ... on MarkingDefinition {
                        id
                    }
                    ... on MediaContent {
                        id
                    }
                    ... on Mutex {
                        id
                    }
                    ... on Narrative {
                        id
                    }
                    ... on NetworkTraffic {
                        id
                    }
                    ... on Note {
                        id
                    }
                    ... on ObservedData {
                        id
                    }
                    ... on Opinion {
                        id
                    }
                    ... on Organization {
                        id
                    }
                    ... on PaymentCard {
                        id
                    }
                    ... on PhoneNumber {
                        id
                    }
                    ... on Position {
                        id
                    }
                    ... on Process {
                        id
                    }
                    ... on PublicDashboard {
                        id
                    }
                    ... on Region {
                        id
                    }
                    ... on Report {
                        id
                    }
                    ... on Sector {
                        id
                    }
                    ... on Software {
                        id
                    }
                    ... on StixCoreRelationship {
                        id
                    }
                    ... on StixFile {
                        id
                    }
                    ... on StixRefRelationship {
                        id
                    }
                    ... on StixSightingRelationship {
                        id
                    }
                    ... on System {
                        id
                    }
                    ... on Task {
                        id
                    }
                    ... on Text {
                        id
                    }
                    ... on ThreatActorGroup {
                        id
                    }
                    ... on ThreatActorIndividual {
                        id
                    }
                    ... on Tool {
                        id
                    }
                    ... on TrackingNumber {
                        id
                    }
                    ... on Url {
                        id
                    }
                    ... on UserAccount {
                        id
                    }
                    ... on UserAgent {
                        id
                    }
                    ... on Vulnerability {
                        id
                    }
                    ... on WindowsRegistryKey {
                        id
                    }
                    ... on WindowsRegistryValueType {
                        id
                    }
                    ... on Workspace {
                        id
                    }
                    ... on X509Certificate {
                        id
                    }
                }
            }
        }
        ...ContainerHeader_container
    }

    fragment FeedbackDetails_case on Feedback {
        id
        name
        description
        rating
        created
        modified
        created_at
        objectLabel {
            id
            value
            color
        }
        x_opencti_stix_ids
        status {
            id
            order
            template {
                name
                color
                id
            }
        }
        workflowEnabled
    }

    fragment FileExportViewer_entity on StixCoreObject {
        __isStixCoreObject: __typename
        id
        exportFiles(first: 500) {
            edges {
                node {
                    id
                    ...FileLine_file
                    __typename
                }
                cursor
            }
            pageInfo {
                endCursor
                hasNextPage
            }
        }
    }

    fragment FileExternalReferencesViewer_entity on StixCoreObject {
        __isStixCoreObject: __typename
        id
        entity_type
        externalReferences {
            edges {
                node {
                    source_name
                    url
                    description
                    importFiles(first: 500) {
                        edges {
                            node {
                                id
                                lastModified
                                ...FileLine_file
                                metaData {
                                    mimetype
                                }
                                __typename
                            }
                            cursor
                        }
                        pageInfo {
                            endCursor
                            hasNextPage
                        }
                    }
                    id
                }
            }
        }
    }

    fragment FileImportViewer_entity on StixCoreObject {
        __isStixCoreObject: __typename
        id
        entity_type
        importFiles(first: 500) {
            edges {
                node {
                    id
                    ...FileLine_file
                    metaData {
                        mimetype
                    }
                    __typename
                }
                cursor
            }
            pageInfo {
                endCursor
                hasNextPage
            }
        }
    }

    fragment FileLine_file on File {
        id
        name
        uploadStatus
        lastModified
        lastModifiedSinceMin
        metaData {
            mimetype
            list_filters
            external_reference_id
            file_markings
            messages {
                timestamp
                message
            }
            errors {
                timestamp
                message
            }
            labels
        }
        ...FileWork_file
    }

    fragment FileWork_file on File {
        id
        works {
            id
            connector {
                name
                id
            }
            user {
                name
                id
            }
            received_time
            tracking {
                import_expected_number
                import_processed_number
            }
            messages {
                timestamp
                message
            }
            errors {
                timestamp
                message
            }
            status
            timestamp
        }
    }

    fragment StixCoreObjectContent_stixCoreObject on StixCoreObject {
        __isStixCoreObject: __typename
        id
        entity_type
        objectMarking {
            id
            definition_type
            definition
            x_opencti_order
            x_opencti_color
        }
        ... on Report {
            name
            description
            contentField: content
            content_mapping
            editContext {
                name
                focusOn
            }
        }
        ... on Case {
            __isCase: __typename
            name
            description
            contentField: content
            content_mapping
            editContext {
                name
                focusOn
            }
        }
        ... on Grouping {
            name
            description
            contentField: content
            content_mapping
            editContext {
                name
                focusOn
            }
        }
        importFiles(first: 500) {
            edges {
                node {
                    id
                    name
                    uploadStatus
                    lastModified
                    lastModifiedSinceMin
                    metaData {
                        mimetype
                        list_filters
                        file_markings
                        messages {
                            timestamp
                            message
                        }
                        errors {
                            timestamp
                            message
                        }
                    }
                    __typename
                }
                cursor
            }
            pageInfo {
                endCursor
                hasNextPage
            }
        }
        exportFiles(first: 500) {
            edges {
                node {
                    id
                    name
                    uploadStatus
                    lastModified
                    lastModifiedSinceMin
                    metaData {
                        mimetype
                        file_markings
                    }
                    ...FileLine_file
                    __typename
                }
                cursor
            }
            pageInfo {
                endCursor
                hasNextPage
            }
        }
        externalReferences {
            edges {
                node {
                    source_name
                    url
                    description
                    importFiles(first: 500) {
                        edges {
                            node {
                                id
                                name
                                uploadStatus
                                lastModified
                                lastModifiedSinceMin
                                metaData {
                                    mimetype
                                    list_filters
                                    external_reference_id
                                    messages {
                                        timestamp
                                        message
                                    }
                                    errors {
                                        timestamp
                                        message
                                    }
                                }
                            }
                        }
                    }
                    id
                }
            }
        }
    }

    fragment StixCoreObjectFilesAndHistory_connectorsExport on Connector {
        id
        name
        active
        connector_scope
        updated_at
    }

    fragment StixCoreObjectFilesAndHistory_connectorsImport on Connector {
        id
        name
        active
        only_contextual
        connector_scope
        updated_at
        configurations {
            id
            name
            configuration
        }
    }

    fragment WorkbenchFileLine_file on File {
        id
        name
        uploadStatus
        lastModified
        lastModifiedSinceMin
        metaData {
            mimetype
            list_filters
            labels
            messages {
                timestamp
                message
            }
            errors {
                timestamp
                message
            }
            creator {
                name
                id
            }
            entity_id
            entity {
                __typename
                ... on AttackPattern {
                    name
                }
                ... on Campaign {
                    name
                }
                ... on Report {
                    name
                }
                ... on Grouping {
                    name
                }
                ... on CourseOfAction {
                    name
                }
                ... on Individual {
                    name
                }
                ... on Organization {
                    name
                }
                ... on Sector {
                    name
                }
                ... on System {
                    name
                }
                ... on Indicator {
                    name
                }
                ... on Infrastructure {
                    name
                }
                ... on IntrusionSet {
                    name
                }
                ... on Position {
                    name
                }
                ... on City {
                    name
                }
                ... on AdministrativeArea {
                    name
                }
                ... on Country {
                    name
                }
                ... on Region {
                    name
                }
                ... on Malware {
                    name
                }
                ... on ThreatActor {
                    __isThreatActor: __typename
                    name
                }
                ... on Tool {
                    name
                }
                ... on Vulnerability {
                    name
                }
                ... on Incident {
                    name
                }
                ... on StixCyberObservable {
                    __isStixCyberObservable: __typename
                    observable_value
                }
                id
            }
        }
        works {
            id
        }
        ...FileWork_file
    }

    fragment WorkbenchFileViewer_entity on StixCoreObject {
        __isStixCoreObject: __typename
        id
        entity_type
        pendingFiles(first: 500) {
            edges {
                node {
                    id
                    ...WorkbenchFileLine_file
                    metaData {
                        mimetype
                    }
                    __typename
                }
                cursor
            }
            pageInfo {
                endCursor
                hasNextPage
            }
        }
    }
`;

export const CaseRftLinesCasesPaginationQuery = gql`
    query CaseRftLinesCasesPaginationQuery(
        $search: String
        $count: Int
        $cursor: ID
        $orderBy: CaseRftsOrdering
        $orderMode: OrderingMode
        $filters: FilterGroup
    ) {
        ...CaseRftLinesCases_data_2wN0PW
    }

    fragment CaseRftLineCase_node on CaseRft {
        id
        name
        description
        entity_type
        created
        takedown_types
        priority
        severity
        objectAssignee {
            entity_type
            id
            name
        }
        objectMarking {
            id
            definition_type
            definition
            x_opencti_order
            x_opencti_color
        }
        objectLabel {
            id
            value
            color
        }
        creators {
            id
            name
        }
        status {
            id
            order
            template {
                name
                color
                id
            }
        }
        workflowEnabled
    }

    fragment CaseRftLinesCases_data_2wN0PW on Query {
        caseRfts(
            search: $search
            first: $count
            after: $cursor
            orderBy: $orderBy
            orderMode: $orderMode
            filters: $filters
        ) {
            edges {
                node {
                    id
                    ...CaseRftLineCase_node
                    __typename
                }
                cursor
            }
            pageInfo {
                endCursor
                hasNextPage
                globalCount
            }
        }
    }
`;

export const StixCoreObjectOrStixRelationshipLastContainersQuery = gql`
    query StixCoreObjectOrStixRelationshipLastContainersQuery(
        $first: Int
        $orderBy: ContainersOrdering
        $orderMode: OrderingMode
        $filters: FilterGroup
    ) {
        containers(first: $first, orderBy: $orderBy, orderMode: $orderMode, filters: $filters) {
            edges {
                node {
                    __typename
                    id
                    created
                    workflowEnabled
                    entity_type
                    status {
                        id
                        order
                        template {
                            name
                            color
                            id
                        }
                    }
                    creators {
                        id
                        name
                    }
                    ... on Note {
                        attribute_abstract
                        content
                        created
                    }
                    ... on Opinion {
                        opinion
                        created
                    }
                    ... on ObservedData {
                        name
                        first_observed
                        last_observed
                        objects(first: 1) {
                            edges {
                                node {
                                    __typename
                                    ... on StixCoreObject {
                                        __isStixCoreObject: __typename
                                        id
                                        entity_type
                                        parent_types
                                        created_at
                                        createdBy {
                                            __typename
                                            __isIdentity: __typename
                                            id
                                            name
                                            entity_type
                                        }
                                        objectMarking {
                                            id
                                            definition_type
                                            definition
                                            x_opencti_order
                                            x_opencti_color
                                        }
                                    }
                                    ... on AttackPattern {
                                        name
                                        description
                                        x_mitre_id
                                        id
                                    }
                                    ... on Campaign {
                                        name
                                        description
                                        first_seen
                                        last_seen
                                        id
                                    }
                                    ... on Note {
                                        attribute_abstract
                                        id
                                    }
                                    ... on ObservedData {
                                        name
                                        first_observed
                                        last_observed
                                        id
                                    }
                                    ... on Opinion {
                                        opinion
                                        id
                                    }
                                    ... on Report {
                                        name
                                        description
                                        id
                                    }
                                    ... on CourseOfAction {
                                        name
                                        description
                                        id
                                    }
                                    ... on Individual {
                                        name
                                        description
                                        id
                                    }
                                    ... on Organization {
                                        name
                                        description
                                        id
                                    }
                                    ... on Sector {
                                        name
                                        description
                                        id
                                    }
                                    ... on System {
                                        name
                                        description
                                        id
                                    }
                                    ... on Indicator {
                                        name
                                        description
                                        valid_from
                                        id
                                    }
                                    ... on Infrastructure {
                                        name
                                        description
                                        id
                                    }
                                    ... on IntrusionSet {
                                        name
                                        description
                                        first_seen
                                        last_seen
                                        id
                                    }
                                    ... on Position {
                                        name
                                        description
                                        id
                                    }
                                    ... on City {
                                        name
                                        description
                                        id
                                    }
                                    ... on AdministrativeArea {
                                        name
                                        description
                                        id
                                    }
                                    ... on Country {
                                        name
                                        description
                                        id
                                    }
                                    ... on Region {
                                        name
                                        description
                                        id
                                    }
                                    ... on Malware {
                                        name
                                        description
                                        first_seen
                                        last_seen
                                        id
                                    }
                                    ... on ThreatActor {
                                        __isThreatActor: __typename
                                        name
                                        description
                                        first_seen
                                        last_seen
                                    }
                                    ... on Tool {
                                        name
                                        description
                                        id
                                    }
                                    ... on Vulnerability {
                                        name
                                        description
                                        id
                                    }
                                    ... on Incident {
                                        name
                                        description
                                        first_seen
                                        last_seen
                                        id
                                    }
                                    ... on Event {
                                        name
                                        description
                                        start_time
                                        stop_time
                                        id
                                    }
                                    ... on Channel {
                                        name
                                        description
                                        id
                                    }
                                    ... on Narrative {
                                        name
                                        description
                                        id
                                    }
                                    ... on Language {
                                        name
                                        id
                                    }
                                    ... on DataComponent {
                                        name
                                        id
                                    }
                                    ... on DataSource {
                                        name
                                        id
                                    }
                                    ... on Case {
                                        __isCase: __typename
                                        name
                                    }
                                    ... on Task {
                                        name
                                        id
                                    }
                                    ... on StixCyberObservable {
                                        __isStixCyberObservable: __typename
                                        observable_value
                                        x_opencti_description
                                    }
                                    ... on Artifact {
                                        id
                                    }
                                    ... on AutonomousSystem {
                                        id
                                    }
                                    ... on BankAccount {
                                        id
                                    }
                                    ... on CaseIncident {
                                        id
                                    }
                                    ... on CaseRfi {
                                        id
                                    }
                                    ... on CaseRft {
                                        id
                                    }
                                    ... on CaseTemplate {
                                        id
                                    }
                                    ... on Credential {
                                        id
                                    }
                                    ... on CryptocurrencyWallet {
                                        id
                                    }
                                    ... on CryptographicKey {
                                        id
                                    }
                                    ... on CsvMapper {
                                        id
                                    }
                                    ... on Directory {
                                        id
                                    }
                                    ... on DomainName {
                                        id
                                    }
                                    ... on EmailAddr {
                                        id
                                    }
                                    ... on EmailMessage {
                                        id
                                    }
                                    ... on EmailMimePartType {
                                        id
                                    }
                                    ... on EntitySetting {
                                        id
                                    }
                                    ... on ExternalReference {
                                        id
                                    }
                                    ... on Feedback {
                                        id
                                    }
                                    ... on Grouping {
                                        id
                                    }
                                    ... on Hostname {
                                        id
                                    }
                                    ... on IPv4Addr {
                                        id
                                    }
                                    ... on IPv6Addr {
                                        id
                                    }
                                    ... on KillChainPhase {
                                        id
                                    }
                                    ... on Label {
                                        id
                                    }
                                    ... on MacAddr {
                                        id
                                    }
                                    ... on MalwareAnalysis {
                                        id
                                    }
                                    ... on ManagerConfiguration {
                                        id
                                    }
                                    ... on MarkingDefinition {
                                        id
                                    }
                                    ... on MediaContent {
                                        id
                                    }
                                    ... on Mutex {
                                        id
                                    }
                                    ... on NetworkTraffic {
                                        id
                                    }
                                    ... on PaymentCard {
                                        id
                                    }
                                    ... on PhoneNumber {
                                        id
                                    }
                                    ... on Process {
                                        id
                                    }
                                    ... on PublicDashboard {
                                        id
                                    }
                                    ... on Software {
                                        id
                                    }
                                    ... on StixCoreRelationship {
                                        id
                                    }
                                    ... on StixFile {
                                        id
                                    }
                                    ... on StixRefRelationship {
                                        id
                                    }
                                    ... on StixSightingRelationship {
                                        id
                                    }
                                    ... on Text {
                                        id
                                    }
                                    ... on ThreatActorGroup {
                                        id
                                    }
                                    ... on ThreatActorIndividual {
                                        id
                                    }
                                    ... on TrackingNumber {
                                        id
                                    }
                                    ... on Url {
                                        id
                                    }
                                    ... on UserAccount {
                                        id
                                    }
                                    ... on UserAgent {
                                        id
                                    }
                                    ... on WindowsRegistryKey {
                                        id
                                    }
                                    ... on WindowsRegistryValueType {
                                        id
                                    }
                                    ... on Workspace {
                                        id
                                    }
                                    ... on X509Certificate {
                                        id
                                    }
                                }
                            }
                        }
                    }
                    ... on Report {
                        name
                    }
                    ... on Grouping {
                        name
                        created
                    }
                    ... on Case {
                        __isCase: __typename
                        name
                        created
                    }
                    ... on Task {
                        name
                    }
                    createdBy {
                        __typename
                        __isIdentity: __typename
                        id
                        name
                        entity_type
                    }
                    objectMarking {
                        id
                        definition_type
                        definition
                        x_opencti_order
                        x_opencti_color
                    }
                    objectLabel {
                        id
                        value
                        color
                    }
                }
            }
        }
    }
`;

export const CaseRftEditionOverviewCaseFieldPatchMutation = gql`
    mutation CaseRftEditionOverviewCaseFieldPatchMutation(
        $id: ID!
        $input: [EditInput]!
        $commitMessage: String
        $references: [String]
    ) {
        stixDomainObjectEdit(id: $id) {
            fieldPatch(input: $input, commitMessage: $commitMessage, references: $references) {
                __typename
                ...CaseRftEditionOverview_case
                ...CaseUtils_case
                id
            }
        }
    }

    fragment CaseIncidentDetails_case on CaseIncident {
        id
        name
        description
        priority
        severity
        created
        modified
        created_at
        response_types
        objectLabel {
            id
            value
            color
        }
        x_opencti_stix_ids
        status {
            id
            order
            template {
                name
                color
                id
            }
        }
        workflowEnabled
        relatedContainers(
            first: 10
            orderBy: created
            orderMode: desc
            types: ["Case"]
            viaTypes: ["Indicator", "Stix-Cyber-Observable"]
        ) {
            edges {
                node {
                    __typename
                    id
                    entity_type
                    ... on CaseIncident {
                        name
                        description
                        created
                        createdBy {
                            __typename
                            __isIdentity: __typename
                            id
                            name
                            entity_type
                        }
                        objectMarking {
                            id
                            definition_type
                            definition
                            x_opencti_order
                            x_opencti_color
                        }
                    }
                    ... on CaseRfi {
                        name
                        description
                        created
                        createdBy {
                            __typename
                            __isIdentity: __typename
                            id
                            name
                            entity_type
                        }
                        objectMarking {
                            id
                            definition_type
                            definition
                            x_opencti_order
                            x_opencti_color
                        }
                    }
                    ... on CaseRft {
                        name
                        description
                        created
                        createdBy {
                            __typename
                            __isIdentity: __typename
                            id
                            name
                            entity_type
                        }
                        objectMarking {
                            id
                            definition_type
                            definition
                            x_opencti_order
                            x_opencti_color
                        }
                    }
                }
            }
        }
    }

    fragment CaseRfiDetails_case on CaseRfi {
        id
        name
        description
        created
        modified
        created_at
        information_types
        severity
        priority
        objectLabel {
            id
            value
            color
        }
        x_opencti_stix_ids
        status {
            id
            order
            template {
                name
                color
                id
            }
        }
        workflowEnabled
        relatedContainers(
            first: 10
            orderBy: created
            orderMode: desc
            types: ["Case"]
            viaTypes: ["Indicator", "Stix-Cyber-Observable"]
        ) {
            edges {
                node {
                    __typename
                    id
                    entity_type
                    ... on CaseIncident {
                        name
                        description
                        created
                        createdBy {
                            __typename
                            __isIdentity: __typename
                            id
                            name
                            entity_type
                        }
                        objectMarking {
                            id
                            definition_type
                            definition
                            x_opencti_order
                            x_opencti_color
                        }
                    }
                    ... on CaseRfi {
                        name
                        description
                        created
                        createdBy {
                            __typename
                            __isIdentity: __typename
                            id
                            name
                            entity_type
                        }
                        objectMarking {
                            id
                            definition_type
                            definition
                            x_opencti_order
                            x_opencti_color
                        }
                    }
                    ... on CaseRft {
                        name
                        description
                        created
                        createdBy {
                            __typename
                            __isIdentity: __typename
                            id
                            name
                            entity_type
                        }
                        objectMarking {
                            id
                            definition_type
                            definition
                            x_opencti_order
                            x_opencti_color
                        }
                    }
                }
            }
        }
    }

    fragment CaseRftDetails_case on CaseRft {
        id
        name
        description
        created
        modified
        created_at
        takedown_types
        priority
        severity
        objectLabel {
            id
            value
            color
        }
        x_opencti_stix_ids
        status {
            id
            order
            template {
                name
                color
                id
            }
        }
        workflowEnabled
        relatedContainers(
            first: 10
            orderBy: created
            orderMode: desc
            types: ["Case"]
            viaTypes: ["Indicator", "Stix-Cyber-Observable"]
        ) {
            edges {
                node {
                    __typename
                    id
                    entity_type
                    ... on CaseIncident {
                        name
                        description
                        created
                        createdBy {
                            __typename
                            __isIdentity: __typename
                            id
                            name
                            entity_type
                        }
                        objectMarking {
                            id
                            definition_type
                            definition
                            x_opencti_order
                            x_opencti_color
                        }
                    }
                    ... on CaseRfi {
                        name
                        description
                        created
                        createdBy {
                            __typename
                            __isIdentity: __typename
                            id
                            name
                            entity_type
                        }
                        objectMarking {
                            id
                            definition_type
                            definition
                            x_opencti_order
                            x_opencti_color
                        }
                    }
                    ... on CaseRft {
                        name
                        description
                        created
                        createdBy {
                            __typename
                            __isIdentity: __typename
                            id
                            name
                            entity_type
                        }
                        objectMarking {
                            id
                            definition_type
                            definition
                            x_opencti_order
                            x_opencti_color
                        }
                    }
                }
            }
        }
    }

    fragment CaseRftEditionOverview_case on CaseRft {
        id
        name
        revoked
        description
        confidence
        entity_type
        created
        takedown_types
        severity
        priority
        creators {
            id
            name
        }
        x_opencti_stix_ids
        createdBy {
            __typename
            __isIdentity: __typename
            id
            name
            entity_type
        }
        status {
            id
            order
            template {
                name
                color
                id
            }
        }
        workflowEnabled
        objectMarking {
            id
            definition_type
            definition
            x_opencti_order
            x_opencti_color
        }
        objectAssignee {
            id
            name
            entity_type
        }
        objectParticipant {
            id
            name
            entity_type
        }
    }

    fragment CaseUtils_case on Case {
        __isCase: __typename
        id
        name
        standard_id
        entity_type
        x_opencti_stix_ids
        created
        modified
        created_at
        revoked
        description
        confidence
        creators {
            id
            name
        }
        createdBy {
            __typename
            __isIdentity: __typename
            id
            name
            entity_type
            x_opencti_reliability
        }
        objectMarking {
            id
            definition_type
            definition
            x_opencti_order
            x_opencti_color
        }
        objectLabel {
            id
            value
            color
        }
        objectAssignee {
            id
            name
            entity_type
        }
        objectParticipant {
            id
            name
            entity_type
        }
        status {
            id
            order
            template {
                name
                color
                id
            }
        }
        workflowEnabled
        ...CaseIncidentDetails_case
        ...FeedbackDetails_case
        ...CaseRftDetails_case
        ...CaseRfiDetails_case
        ...ContainerHeader_container
        ...ContainerStixObjectsOrStixRelationships_container
    }

    fragment ContainerHeader_container on Container {
        __isContainer: __typename
        id
        entity_type
        standard_id
        confidence
        created
        ... on Report {
            name
        }
        ... on Grouping {
            name
        }
        ... on Case {
            __isCase: __typename
            name
        }
        ... on Feedback {
            name
        }
        ... on Task {
            name
        }
        ... on CaseIncident {
            name
        }
        ... on CaseRfi {
            name
        }
        ... on CaseRft {
            name
        }
        ... on Note {
            attribute_abstract
            content
        }
        ... on Opinion {
            opinion
        }
        ... on ObservedData {
            name
            first_observed
            last_observed
        }
        createdBy {
            __typename
            id
        }
        objectMarking {
            id
            definition_type
            definition
            x_opencti_order
            x_opencti_color
        }
    }

    fragment ContainerStixObjectsOrStixRelationships_container on Container {
        __isContainer: __typename
        id
        confidence
        createdBy {
            __typename
            __isIdentity: __typename
            id
            name
            entity_type
        }
        objectMarking {
            id
            definition_type
            definition
            x_opencti_order
            x_opencti_color
        }
        creators {
            id
            name
        }
        objects {
            edges {
                node {
                    __typename
                    ... on BasicObject {
                        __isBasicObject: __typename
                        id
                    }
                    ... on AdministrativeArea {
                        id
                    }
                    ... on Artifact {
                        id
                    }
                    ... on AttackPattern {
                        id
                    }
                    ... on AutonomousSystem {
                        id
                    }
                    ... on BankAccount {
                        id
                    }
                    ... on Campaign {
                        id
                    }
                    ... on CaseIncident {
                        id
                    }
                    ... on CaseRfi {
                        id
                    }
                    ... on CaseRft {
                        id
                    }
                    ... on CaseTemplate {
                        id
                    }
                    ... on Channel {
                        id
                    }
                    ... on City {
                        id
                    }
                    ... on Country {
                        id
                    }
                    ... on CourseOfAction {
                        id
                    }
                    ... on Credential {
                        id
                    }
                    ... on CryptocurrencyWallet {
                        id
                    }
                    ... on CryptographicKey {
                        id
                    }
                    ... on CsvMapper {
                        id
                    }
                    ... on DataComponent {
                        id
                    }
                    ... on DataSource {
                        id
                    }
                    ... on Directory {
                        id
                    }
                    ... on DomainName {
                        id
                    }
                    ... on EmailAddr {
                        id
                    }
                    ... on EmailMessage {
                        id
                    }
                    ... on EmailMimePartType {
                        id
                    }
                    ... on EntitySetting {
                        id
                    }
                    ... on Event {
                        id
                    }
                    ... on ExternalReference {
                        id
                    }
                    ... on Feedback {
                        id
                    }
                    ... on Grouping {
                        id
                    }
                    ... on Hostname {
                        id
                    }
                    ... on IPv4Addr {
                        id
                    }
                    ... on IPv6Addr {
                        id
                    }
                    ... on Incident {
                        id
                    }
                    ... on Indicator {
                        id
                    }
                    ... on Individual {
                        id
                    }
                    ... on Infrastructure {
                        id
                    }
                    ... on IntrusionSet {
                        id
                    }
                    ... on KillChainPhase {
                        id
                    }
                    ... on Label {
                        id
                    }
                    ... on Language {
                        id
                    }
                    ... on MacAddr {
                        id
                    }
                    ... on Malware {
                        id
                    }
                    ... on MalwareAnalysis {
                        id
                    }
                    ... on ManagerConfiguration {
                        id
                    }
                    ... on MarkingDefinition {
                        id
                    }
                    ... on MediaContent {
                        id
                    }
                    ... on Mutex {
                        id
                    }
                    ... on Narrative {
                        id
                    }
                    ... on NetworkTraffic {
                        id
                    }
                    ... on Note {
                        id
                    }
                    ... on ObservedData {
                        id
                    }
                    ... on Opinion {
                        id
                    }
                    ... on Organization {
                        id
                    }
                    ... on PaymentCard {
                        id
                    }
                    ... on PhoneNumber {
                        id
                    }
                    ... on Position {
                        id
                    }
                    ... on Process {
                        id
                    }
                    ... on PublicDashboard {
                        id
                    }
                    ... on Region {
                        id
                    }
                    ... on Report {
                        id
                    }
                    ... on Sector {
                        id
                    }
                    ... on Software {
                        id
                    }
                    ... on StixCoreRelationship {
                        id
                    }
                    ... on StixFile {
                        id
                    }
                    ... on StixRefRelationship {
                        id
                    }
                    ... on StixSightingRelationship {
                        id
                    }
                    ... on System {
                        id
                    }
                    ... on Task {
                        id
                    }
                    ... on Text {
                        id
                    }
                    ... on ThreatActorGroup {
                        id
                    }
                    ... on ThreatActorIndividual {
                        id
                    }
                    ... on Tool {
                        id
                    }
                    ... on TrackingNumber {
                        id
                    }
                    ... on Url {
                        id
                    }
                    ... on UserAccount {
                        id
                    }
                    ... on UserAgent {
                        id
                    }
                    ... on Vulnerability {
                        id
                    }
                    ... on WindowsRegistryKey {
                        id
                    }
                    ... on WindowsRegistryValueType {
                        id
                    }
                    ... on Workspace {
                        id
                    }
                    ... on X509Certificate {
                        id
                    }
                }
            }
        }
        ...ContainerHeader_container
    }

    fragment FeedbackDetails_case on Feedback {
        id
        name
        description
        rating
        created
        modified
        created_at
        objectLabel {
            id
            value
            color
        }
        x_opencti_stix_ids
        status {
            id
            order
            template {
                name
                color
                id
            }
        }
        workflowEnabled
    }
`;

export const ContainerAddStixCoreObjectsLinesRelationAddMutation = gql`
    mutation ContainerAddStixCoreObjectsLinesRelationAddMutation(
        $id: ID!
        $input: StixRefRelationshipAddInput!
        $commitMessage: String
        $references: [String]
    ) {
        containerEdit(id: $id) {
            relationAdd(input: $input, commitMessage: $commitMessage, references: $references) {
                id
                to {
                    __typename
                    ... on StixDomainObject {
                        __isStixDomainObject: __typename
                        ...ContainerStixDomainObjectLine_node
                    }
                    ... on StixCyberObservable {
                        __isStixCyberObservable: __typename
                        ...ContainerStixCyberObservableLine_node
                    }
                    ... on StixFile {
                        observableName: name
                        id
                    }
                    ... on AdministrativeArea {
                        id
                    }
                    ... on Artifact {
                        id
                    }
                    ... on AttackPattern {
                        id
                    }
                    ... on AutonomousSystem {
                        id
                    }
                    ... on BankAccount {
                        id
                    }
                    ... on Campaign {
                        id
                    }
                    ... on CaseIncident {
                        id
                    }
                    ... on CaseRfi {
                        id
                    }
                    ... on CaseRft {
                        id
                    }
                    ... on CaseTemplate {
                        id
                    }
                    ... on Channel {
                        id
                    }
                    ... on City {
                        id
                    }
                    ... on Country {
                        id
                    }
                    ... on CourseOfAction {
                        id
                    }
                    ... on Creator {
                        id
                    }
                    ... on Credential {
                        id
                    }
                    ... on CryptocurrencyWallet {
                        id
                    }
                    ... on CryptographicKey {
                        id
                    }
                    ... on CsvMapper {
                        id
                    }
                    ... on DataComponent {
                        id
                    }
                    ... on DataSource {
                        id
                    }
                    ... on Directory {
                        id
                    }
                    ... on DomainName {
                        id
                    }
                    ... on EmailAddr {
                        id
                    }
                    ... on EmailMessage {
                        id
                    }
                    ... on EmailMimePartType {
                        id
                    }
                    ... on EntitySetting {
                        id
                    }
                    ... on Event {
                        id
                    }
                    ... on ExternalReference {
                        id
                    }
                    ... on Feedback {
                        id
                    }
                    ... on Group {
                        id
                    }
                    ... on Grouping {
                        id
                    }
                    ... on Hostname {
                        id
                    }
                    ... on IPv4Addr {
                        id
                    }
                    ... on IPv6Addr {
                        id
                    }
                    ... on Incident {
                        id
                    }
                    ... on Indicator {
                        id
                    }
                    ... on Individual {
                        id
                    }
                    ... on Infrastructure {
                        id
                    }
                    ... on IntrusionSet {
                        id
                    }
                    ... on KillChainPhase {
                        id
                    }
                    ... on Label {
                        id
                    }
                    ... on Language {
                        id
                    }
                    ... on MacAddr {
                        id
                    }
                    ... on Malware {
                        id
                    }
                    ... on MalwareAnalysis {
                        id
                    }
                    ... on ManagerConfiguration {
                        id
                    }
                    ... on MarkingDefinition {
                        id
                    }
                    ... on MediaContent {
                        id
                    }
                    ... on Mutex {
                        id
                    }
                    ... on Narrative {
                        id
                    }
                    ... on NetworkTraffic {
                        id
                    }
                    ... on Note {
                        id
                    }
                    ... on ObservedData {
                        id
                    }
                    ... on Opinion {
                        id
                    }
                    ... on Organization {
                        id
                    }
                    ... on PaymentCard {
                        id
                    }
                    ... on PhoneNumber {
                        id
                    }
                    ... on Position {
                        id
                    }
                    ... on Process {
                        id
                    }
                    ... on PublicDashboard {
                        id
                    }
                    ... on Region {
                        id
                    }
                    ... on Report {
                        id
                    }
                    ... on Sector {
                        id
                    }
                    ... on Software {
                        id
                    }
                    ... on Status {
                        id
                    }
                    ... on StixCoreRelationship {
                        id
                    }
                    ... on StixRefRelationship {
                        id
                    }
                    ... on StixSightingRelationship {
                        id
                    }
                    ... on System {
                        id
                    }
                    ... on Task {
                        id
                    }
                    ... on Text {
                        id
                    }
                    ... on ThreatActorGroup {
                        id
                    }
                    ... on ThreatActorIndividual {
                        id
                    }
                    ... on Tool {
                        id
                    }
                    ... on TrackingNumber {
                        id
                    }
                    ... on Url {
                        id
                    }
                    ... on UserAccount {
                        id
                    }
                    ... on UserAgent {
                        id
                    }
                    ... on Vulnerability {
                        id
                    }
                    ... on WindowsRegistryKey {
                        id
                    }
                    ... on WindowsRegistryValueType {
                        id
                    }
                    ... on Workspace {
                        id
                    }
                    ... on X509Certificate {
                        id
                    }
                }
            }
        }
    }

    fragment ContainerStixCyberObservableLine_node on StixCyberObservable {
        __isStixCyberObservable: __typename
        id
        standard_id
        observable_value
        entity_type
        parent_types
        created_at
        ... on IPv4Addr {
            countries {
                edges {
                    node {
                        name
                        x_opencti_aliases
                        id
                    }
                }
            }
        }
        ... on IPv6Addr {
            countries {
                edges {
                    node {
                        name
                        x_opencti_aliases
                        id
                    }
                }
            }
        }
        objectLabel {
            id
            value
            color
        }
        createdBy {
            __typename
            __isIdentity: __typename
            id
            name
            entity_type
        }
        objectMarking {
            id
            definition_type
            definition
            x_opencti_order
            x_opencti_color
        }
        containersNumber {
            total
        }
    }

    fragment ContainerStixDomainObjectLine_node on StixDomainObject {
        __isStixDomainObject: __typename
        id
        standard_id
        entity_type
        parent_types
        created_at
        ... on AttackPattern {
            name
            x_mitre_id
        }
        ... on Campaign {
            name
        }
        ... on CourseOfAction {
            name
        }
        ... on ObservedData {
            name
        }
        ... on Report {
            name
        }
        ... on Grouping {
            name
        }
        ... on Note {
            attribute_abstract
            content
        }
        ... on Opinion {
            opinion
        }
        ... on Individual {
            name
        }
        ... on Organization {
            name
        }
        ... on Sector {
            name
        }
        ... on System {
            name
        }
        ... on Indicator {
            name
        }
        ... on Infrastructure {
            name
        }
        ... on IntrusionSet {
            name
        }
        ... on Position {
            name
        }
        ... on City {
            name
        }
        ... on AdministrativeArea {
            name
        }
        ... on Country {
            name
        }
        ... on Region {
            name
        }
        ... on Malware {
            name
        }
        ... on MalwareAnalysis {
            result_name
        }
        ... on ThreatActor {
            __isThreatActor: __typename
            name
        }
        ... on Tool {
            name
        }
        ... on Vulnerability {
            name
        }
        ... on Incident {
            name
        }
        ... on Event {
            name
        }
        ... on Channel {
            name
        }
        ... on Narrative {
            name
        }
        ... on Language {
            name
        }
        ... on DataComponent {
            name
        }
        ... on DataSource {
            name
        }
        ... on Case {
            __isCase: __typename
            name
        }
        ... on Task {
            name
        }
        objectLabel {
            id
            value
            color
        }
        createdBy {
            __typename
            __isIdentity: __typename
            id
            name
            entity_type
        }
        objectMarking {
            id
            definition_type
            definition
            x_opencti_order
            x_opencti_color
        }
        containersNumber {
            total
        }
    }
`;

export const ContainerStixCoreObjectPopoverRemoveMutation = gql`
    mutation ContainerStixCoreObjectPopoverRemoveMutation(
        $id: ID!
        $toId: StixRef!
        $relationship_type: String!
        $commitMessage: String
        $references: [String]
    ) {
        containerEdit(id: $id) {
            relationDelete(
                toId: $toId
                relationship_type: $relationship_type
                commitMessage: $commitMessage
                references: $references
            ) {
                __typename
                id
            }
        }
    }
`;

export const CaseRfiCreationCaseMutation = gql`
    mutation CaseRfiCreationCaseMutation($input: CaseRfiAddInput!) {
        caseRfiAdd(input: $input) {
            id
            standard_id
            entity_type
            parent_types
            name
            description
            ...CaseRfiLineCase_node
        }
    }

    fragment CaseRfiLineCase_node on CaseRfi {
        id
        name
        description
        created
        information_types
        priority
        severity
        entity_type
        objectAssignee {
            entity_type
            id
            name
        }
        objectMarking {
            id
            definition_type
            definition
            x_opencti_order
            x_opencti_color
        }
        objectLabel {
            id
            value
            color
        }
        creators {
            id
            name
        }
        status {
            id
            order
            template {
                name
                color
                id
            }
        }
        workflowEnabled
    }
`;

export const CaseRfiEditionOverviewCaseFieldPatchMutation = gql`
    mutation CaseRfiEditionOverviewCaseFieldPatchMutation(
        $id: ID!
        $input: [EditInput]!
        $commitMessage: String
        $references: [String]
    ) {
        stixDomainObjectEdit(id: $id) {
            fieldPatch(input: $input, commitMessage: $commitMessage, references: $references) {
                __typename
                ...CaseRfiEditionOverview_case
                ...CaseUtils_case
                id
            }
        }
    }

    fragment CaseIncidentDetails_case on CaseIncident {
        id
        name
        description
        priority
        severity
        created
        modified
        created_at
        response_types
        objectLabel {
            id
            value
            color
        }
        x_opencti_stix_ids
        status {
            id
            order
            template {
                name
                color
                id
            }
        }
        workflowEnabled
        relatedContainers(
            first: 10
            orderBy: created
            orderMode: desc
            types: ["Case"]
            viaTypes: ["Indicator", "Stix-Cyber-Observable"]
        ) {
            edges {
                node {
                    __typename
                    id
                    entity_type
                    ... on CaseIncident {
                        name
                        description
                        created
                        createdBy {
                            __typename
                            __isIdentity: __typename
                            id
                            name
                            entity_type
                        }
                        objectMarking {
                            id
                            definition_type
                            definition
                            x_opencti_order
                            x_opencti_color
                        }
                    }
                    ... on CaseRfi {
                        name
                        description
                        created
                        createdBy {
                            __typename
                            __isIdentity: __typename
                            id
                            name
                            entity_type
                        }
                        objectMarking {
                            id
                            definition_type
                            definition
                            x_opencti_order
                            x_opencti_color
                        }
                    }
                    ... on CaseRft {
                        name
                        description
                        created
                        createdBy {
                            __typename
                            __isIdentity: __typename
                            id
                            name
                            entity_type
                        }
                        objectMarking {
                            id
                            definition_type
                            definition
                            x_opencti_order
                            x_opencti_color
                        }
                    }
                }
            }
        }
    }

    fragment CaseRfiDetails_case on CaseRfi {
        id
        name
        description
        created
        modified
        created_at
        information_types
        severity
        priority
        objectLabel {
            id
            value
            color
        }
        x_opencti_stix_ids
        status {
            id
            order
            template {
                name
                color
                id
            }
        }
        workflowEnabled
        relatedContainers(
            first: 10
            orderBy: created
            orderMode: desc
            types: ["Case"]
            viaTypes: ["Indicator", "Stix-Cyber-Observable"]
        ) {
            edges {
                node {
                    __typename
                    id
                    entity_type
                    ... on CaseIncident {
                        name
                        description
                        created
                        createdBy {
                            __typename
                            __isIdentity: __typename
                            id
                            name
                            entity_type
                        }
                        objectMarking {
                            id
                            definition_type
                            definition
                            x_opencti_order
                            x_opencti_color
                        }
                    }
                    ... on CaseRfi {
                        name
                        description
                        created
                        createdBy {
                            __typename
                            __isIdentity: __typename
                            id
                            name
                            entity_type
                        }
                        objectMarking {
                            id
                            definition_type
                            definition
                            x_opencti_order
                            x_opencti_color
                        }
                    }
                    ... on CaseRft {
                        name
                        description
                        created
                        createdBy {
                            __typename
                            __isIdentity: __typename
                            id
                            name
                            entity_type
                        }
                        objectMarking {
                            id
                            definition_type
                            definition
                            x_opencti_order
                            x_opencti_color
                        }
                    }
                }
            }
        }
    }

    fragment CaseRfiEditionOverview_case on CaseRfi {
        id
        name
        revoked
        description
        confidence
        entity_type
        created
        information_types
        severity
        priority
        creators {
            id
            name
        }
        x_opencti_stix_ids
        createdBy {
            __typename
            __isIdentity: __typename
            id
            name
            entity_type
        }
        status {
            id
            order
            template {
                name
                color
                id
            }
        }
        workflowEnabled
        objectMarking {
            id
            definition_type
            definition
            x_opencti_order
            x_opencti_color
        }
        objectAssignee {
            id
            name
            entity_type
        }
        objectParticipant {
            id
            name
            entity_type
        }
    }

    fragment CaseRftDetails_case on CaseRft {
        id
        name
        description
        created
        modified
        created_at
        takedown_types
        priority
        severity
        objectLabel {
            id
            value
            color
        }
        x_opencti_stix_ids
        status {
            id
            order
            template {
                name
                color
                id
            }
        }
        workflowEnabled
        relatedContainers(
            first: 10
            orderBy: created
            orderMode: desc
            types: ["Case"]
            viaTypes: ["Indicator", "Stix-Cyber-Observable"]
        ) {
            edges {
                node {
                    __typename
                    id
                    entity_type
                    ... on CaseIncident {
                        name
                        description
                        created
                        createdBy {
                            __typename
                            __isIdentity: __typename
                            id
                            name
                            entity_type
                        }
                        objectMarking {
                            id
                            definition_type
                            definition
                            x_opencti_order
                            x_opencti_color
                        }
                    }
                    ... on CaseRfi {
                        name
                        description
                        created
                        createdBy {
                            __typename
                            __isIdentity: __typename
                            id
                            name
                            entity_type
                        }
                        objectMarking {
                            id
                            definition_type
                            definition
                            x_opencti_order
                            x_opencti_color
                        }
                    }
                    ... on CaseRft {
                        name
                        description
                        created
                        createdBy {
                            __typename
                            __isIdentity: __typename
                            id
                            name
                            entity_type
                        }
                        objectMarking {
                            id
                            definition_type
                            definition
                            x_opencti_order
                            x_opencti_color
                        }
                    }
                }
            }
        }
    }

    fragment CaseUtils_case on Case {
        __isCase: __typename
        id
        name
        standard_id
        entity_type
        x_opencti_stix_ids
        created
        modified
        created_at
        revoked
        description
        confidence
        creators {
            id
            name
        }
        createdBy {
            __typename
            __isIdentity: __typename
            id
            name
            entity_type
            x_opencti_reliability
        }
        objectMarking {
            id
            definition_type
            definition
            x_opencti_order
            x_opencti_color
        }
        objectLabel {
            id
            value
            color
        }
        objectAssignee {
            id
            name
            entity_type
        }
        objectParticipant {
            id
            name
            entity_type
        }
        status {
            id
            order
            template {
                name
                color
                id
            }
        }
        workflowEnabled
        ...CaseIncidentDetails_case
        ...FeedbackDetails_case
        ...CaseRftDetails_case
        ...CaseRfiDetails_case
        ...ContainerHeader_container
        ...ContainerStixObjectsOrStixRelationships_container
    }

    fragment ContainerHeader_container on Container {
        __isContainer: __typename
        id
        entity_type
        standard_id
        confidence
        created
        ... on Report {
            name
        }
        ... on Grouping {
            name
        }
        ... on Case {
            __isCase: __typename
            name
        }
        ... on Feedback {
            name
        }
        ... on Task {
            name
        }
        ... on CaseIncident {
            name
        }
        ... on CaseRfi {
            name
        }
        ... on CaseRft {
            name
        }
        ... on Note {
            attribute_abstract
            content
        }
        ... on Opinion {
            opinion
        }
        ... on ObservedData {
            name
            first_observed
            last_observed
        }
        createdBy {
            __typename
            id
        }
        objectMarking {
            id
            definition_type
            definition
            x_opencti_order
            x_opencti_color
        }
    }

    fragment ContainerStixObjectsOrStixRelationships_container on Container {
        __isContainer: __typename
        id
        confidence
        createdBy {
            __typename
            __isIdentity: __typename
            id
            name
            entity_type
        }
        objectMarking {
            id
            definition_type
            definition
            x_opencti_order
            x_opencti_color
        }
        creators {
            id
            name
        }
        objects {
            edges {
                node {
                    __typename
                    ... on BasicObject {
                        __isBasicObject: __typename
                        id
                    }
                    ... on AdministrativeArea {
                        id
                    }
                    ... on Artifact {
                        id
                    }
                    ... on AttackPattern {
                        id
                    }
                    ... on AutonomousSystem {
                        id
                    }
                    ... on BankAccount {
                        id
                    }
                    ... on Campaign {
                        id
                    }
                    ... on CaseIncident {
                        id
                    }
                    ... on CaseRfi {
                        id
                    }
                    ... on CaseRft {
                        id
                    }
                    ... on CaseTemplate {
                        id
                    }
                    ... on Channel {
                        id
                    }
                    ... on City {
                        id
                    }
                    ... on Country {
                        id
                    }
                    ... on CourseOfAction {
                        id
                    }
                    ... on Credential {
                        id
                    }
                    ... on CryptocurrencyWallet {
                        id
                    }
                    ... on CryptographicKey {
                        id
                    }
                    ... on CsvMapper {
                        id
                    }
                    ... on DataComponent {
                        id
                    }
                    ... on DataSource {
                        id
                    }
                    ... on Directory {
                        id
                    }
                    ... on DomainName {
                        id
                    }
                    ... on EmailAddr {
                        id
                    }
                    ... on EmailMessage {
                        id
                    }
                    ... on EmailMimePartType {
                        id
                    }
                    ... on EntitySetting {
                        id
                    }
                    ... on Event {
                        id
                    }
                    ... on ExternalReference {
                        id
                    }
                    ... on Feedback {
                        id
                    }
                    ... on Grouping {
                        id
                    }
                    ... on Hostname {
                        id
                    }
                    ... on IPv4Addr {
                        id
                    }
                    ... on IPv6Addr {
                        id
                    }
                    ... on Incident {
                        id
                    }
                    ... on Indicator {
                        id
                    }
                    ... on Individual {
                        id
                    }
                    ... on Infrastructure {
                        id
                    }
                    ... on IntrusionSet {
                        id
                    }
                    ... on KillChainPhase {
                        id
                    }
                    ... on Label {
                        id
                    }
                    ... on Language {
                        id
                    }
                    ... on MacAddr {
                        id
                    }
                    ... on Malware {
                        id
                    }
                    ... on MalwareAnalysis {
                        id
                    }
                    ... on ManagerConfiguration {
                        id
                    }
                    ... on MarkingDefinition {
                        id
                    }
                    ... on MediaContent {
                        id
                    }
                    ... on Mutex {
                        id
                    }
                    ... on Narrative {
                        id
                    }
                    ... on NetworkTraffic {
                        id
                    }
                    ... on Note {
                        id
                    }
                    ... on ObservedData {
                        id
                    }
                    ... on Opinion {
                        id
                    }
                    ... on Organization {
                        id
                    }
                    ... on PaymentCard {
                        id
                    }
                    ... on PhoneNumber {
                        id
                    }
                    ... on Position {
                        id
                    }
                    ... on Process {
                        id
                    }
                    ... on PublicDashboard {
                        id
                    }
                    ... on Region {
                        id
                    }
                    ... on Report {
                        id
                    }
                    ... on Sector {
                        id
                    }
                    ... on Software {
                        id
                    }
                    ... on StixCoreRelationship {
                        id
                    }
                    ... on StixFile {
                        id
                    }
                    ... on StixRefRelationship {
                        id
                    }
                    ... on StixSightingRelationship {
                        id
                    }
                    ... on System {
                        id
                    }
                    ... on Task {
                        id
                    }
                    ... on Text {
                        id
                    }
                    ... on ThreatActorGroup {
                        id
                    }
                    ... on ThreatActorIndividual {
                        id
                    }
                    ... on Tool {
                        id
                    }
                    ... on TrackingNumber {
                        id
                    }
                    ... on Url {
                        id
                    }
                    ... on UserAccount {
                        id
                    }
                    ... on UserAgent {
                        id
                    }
                    ... on Vulnerability {
                        id
                    }
                    ... on WindowsRegistryKey {
                        id
                    }
                    ... on WindowsRegistryValueType {
                        id
                    }
                    ... on Workspace {
                        id
                    }
                    ... on X509Certificate {
                        id
                    }
                }
            }
        }
        ...ContainerHeader_container
    }

    fragment FeedbackDetails_case on Feedback {
        id
        name
        description
        rating
        created
        modified
        created_at
        objectLabel {
            id
            value
            color
        }
        x_opencti_stix_ids
        status {
            id
            order
            template {
                name
                color
                id
            }
        }
        workflowEnabled
    }
`;

export const ImportContentQuery = gql`
    query ImportContentQuery {
        connectorsForImport {
            ...ImportContent_connectorsImport
            id
        }
        importFiles(first: 500) {
            edges {
                node {
                    id
                    ...FileLine_file
                    metaData {
                        mimetype
                    }
                    __typename
                }
                cursor
            }
            pageInfo {
                endCursor
                hasNextPage
            }
        }
        pendingFiles(first: 500) {
            edges {
                node {
                    id
                    ...WorkbenchFileLine_file
                    metaData {
                        mimetype
                    }
                    __typename
                }
                cursor
            }
            pageInfo {
                endCursor
                hasNextPage
            }
        }
    }
`;

export const WorkbenchFileContentMutation = gql`
    mutation WorkbenchFileContentMutation($file: Upload!, $entityId: String) {
        uploadPending(file: $file, entityId: $entityId) {
            id
        }
    }
`;

export const FileManagerAskJobImportMutation = gql`
    mutation FileManagerAskJobImportMutation(
        $fileName: ID!
        $connectorId: String
        $configuration: String
        $bypassValidation: Boolean
    ) {
        askJobImport(
            fileName: $fileName
            connectorId: $connectorId
            configuration: $configuration
            bypassValidation: $bypassValidation
        ) {
            ...FileLine_file
            id
        }
    }
`;

export const WorkbenchFileLineDeleteMutation = gql`
    mutation WorkbenchFileLineDeleteMutation($fileName: String) {
        deleteImport(fileName: $fileName)
    }
`;

export const StixDomainObjectsLinesSearchQuery = gql`
    query StixDomainObjectsLinesSearchQuery($search: String, $types: [String], $count: Int, $filters: FilterGroup) {
        stixDomainObjects(search: $search, types: $types, first: $count, filters: $filters) {
            edges {
                node {
                    __typename
                    id
                    entity_type
                    standard_id
                    ... on AttackPattern {
                        name
                        description
                        x_mitre_id
                    }
                    ... on Note {
                        attribute_abstract
                        content
                    }
                    ... on ObservedData {
                        name
                        first_observed
                        last_observed
                    }
                    ... on Opinion {
                        opinion
                    }
                    ... on Report {
                        name
                    }
                    ... on Grouping {
                        name
                        description
                    }
                    ... on Campaign {
                        name
                        description
                    }
                    ... on CourseOfAction {
                        name
                        description
                    }
                    ... on Individual {
                        name
                        description
                    }
                    ... on Organization {
                        name
                        description
                    }
                    ... on Sector {
                        name
                        description
                    }
                    ... on System {
                        name
                        description
                    }
                    ... on Indicator {
                        name
                        description
                    }
                    ... on Infrastructure {
                        name
                        description
                    }
                    ... on IntrusionSet {
                        name
                        description
                    }
                    ... on Position {
                        name
                        description
                    }
                    ... on City {
                        name
                        description
                    }
                    ... on CaseIncident {
                        name
                        description
                    }
                    ... on CaseRfi {
                        name
                        description
                    }
                    ... on CaseRft {
                        name
                        description
                    }
                    ... on Task {
                        name
                        description
                    }
                    ... on AdministrativeArea {
                        name
                        description
                    }
                    ... on Country {
                        name
                        description
                    }
                    ... on Region {
                        name
                        description
                    }
                    ... on Malware {
                        name
                        description
                    }
                    ... on ThreatActor {
                        __isThreatActor: __typename
                        name
                        description
                    }
                    ... on Tool {
                        name
                        description
                    }
                    ... on Vulnerability {
                        name
                        description
                    }
                    ... on Incident {
                        name
                        description
                    }
                    createdBy {
                        __typename
                        __isIdentity: __typename
                        id
                        name
                        entity_type
                    }
                    objectMarking {
                        definition
                        definition_type
                        x_opencti_order
                        x_opencti_color
                        id
                    }
                }
            }
        }
    }
`;
