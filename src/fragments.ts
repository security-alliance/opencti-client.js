import { gql } from "@apollo/client/core/index.js";

export const StixCyberObservable_stixCyberObservable = gql`
    fragment StixCyberObservable_stixCyberObservable on StixCyberObservable {
        __isStixCyberObservable: __typename
        id
        entity_type
        standard_id
        x_opencti_stix_ids
        spec_version
        created_at
        updated_at
        createdBy {
            __typename
            __isIdentity: __typename
            id
            name
            entity_type
        }
        creators {
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
        observable_value
        x_opencti_score
        ...StixCyberObservableDetails_stixCyberObservable
        ...StixCyberObservableHeader_stixCyberObservable
    }
`;

export const StixCyberObservableDetails_stixCyberObservable = gql`
    fragment StixCyberObservableDetails_stixCyberObservable on StixCyberObservable {
        __isStixCyberObservable: __typename
        id
        entity_type
        x_opencti_score
        x_opencti_description
        observable_value
        ... on AutonomousSystem {
            number
            observableName: name
            rir
        }
        ... on Directory {
            path
            path_enc
            ctime
            mtime
            atime
        }
        ... on DomainName {
            value
        }
        ... on EmailAddr {
            value
            display_name
        }
        ... on EmailMessage {
            is_multipart
            attribute_date
            content_type
            message_id
            subject
            received_lines
            body
        }
        ... on Artifact {
            x_opencti_additional_names
            mime_type
            payload_bin
            url
            encryption_algorithm
            decryption_key
            hashes {
                algorithm
                hash
            }
            importFiles(first: 500) {
                edges {
                    node {
                        id
                        name
                        size
                        metaData {
                            mimetype
                        }
                    }
                }
            }
        }
        ... on StixFile {
            extensions
            size
            observableName: name
            name_enc
            magic_number_hex
            mime_type
            ctime
            mtime
            atime
            x_opencti_additional_names
            obsContent {
                id
            }
            hashes {
                algorithm
                hash
            }
        }
        ... on X509Certificate {
            is_self_signed
            version
            serial_number
            signature_algorithm
            issuer
            subject
            subject_public_key_algorithm
            subject_public_key_modulus
            subject_public_key_exponent
            validity_not_before
            validity_not_after
            hashes {
                algorithm
                hash
            }
            basic_constraints
            name_constraints
            policy_constraints
            key_usage
            extended_key_usage
            subject_key_identifier
            authority_key_identifier
            subject_alternative_name
            issuer_alternative_name
            subject_directory_attributes
            crl_distribution_points
            inhibit_any_policy
            private_key_usage_period_not_before
            private_key_usage_period_not_after
            certificate_policies
            policy_mappings
        }
        ... on IPv4Addr {
            value
        }
        ... on IPv6Addr {
            value
        }
        ... on MacAddr {
            value
        }
        ... on Mutex {
            observableName: name
        }
        ... on NetworkTraffic {
            extensions
            start
            end
            is_active
            src_port
            dst_port
            protocols
            src_byte_count
            dst_byte_count
            src_packets
            dst_packets
        }
        ... on Process {
            extensions
            is_hidden
            pid
            created_time
            cwd
            command_line
            environment_variables
            aslr_enabled
            dep_enabled
            priority
            owner_sid
            window_title
            startup_info {
                key
                value
            }
            integrity_level
            service_name
            descriptions
            display_name
            group_name
            start_type
            service_type
            service_status
        }
        ... on Software {
            observableName: name
            cpe
            swid
            languages
            vendor
            version
        }
        ... on Url {
            value
        }
        ... on UserAccount {
            extensions
            user_id
            credential
            account_login
            account_type
            display_name
            is_service_account
            is_privileged
            can_escalate_privs
            is_disabled
            account_created
            account_expires
            credential_last_changed
            account_first_login
            account_last_login
        }
        ... on WindowsRegistryKey {
            attribute_key
            modified_time
            number_of_subkeys
        }
        ... on WindowsRegistryValueType {
            observableName: name
            data
            data_type
        }
        ... on Hostname {
            value
        }
        ... on CryptographicKey {
            value
        }
        ... on CryptocurrencyWallet {
            value
        }
        ... on Text {
            value
        }
        ... on UserAgent {
            value
        }
        ... on BankAccount {
            iban
            bic
            account_number
        }
        ... on Credential {
            value
        }
        ... on TrackingNumber {
            value
        }
        ... on PhoneNumber {
            value
        }
        ... on PaymentCard {
            card_number
            expiration_date
            cvv
            holder_name
        }
        ... on MediaContent {
            title
            content
            media_category
            url
            publication_date
        }
        ...StixCyberObservableIndicators_stixCyberObservable
    }
`;

export const StixCyberObservableHeader_stixCyberObservable = gql`
    fragment StixCyberObservableHeader_stixCyberObservable on StixCyberObservable {
        __isStixCyberObservable: __typename
        id
        entity_type
        observable_value
    }
`;

export const StixCyberObservableIndicators_stixCyberObservable = gql`
    fragment StixCyberObservableIndicators_stixCyberObservable on StixCyberObservable {
        __isStixCyberObservable: __typename
        id
        observable_value
        parent_types
        entity_type
        indicators(first: 200) {
            edges {
                node {
                    id
                    entity_type
                    parent_types
                    name
                    created_at
                    updated_at
                    pattern_type
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

export const StixCyberObservableKnowledge_stixCyberObservable = gql`
    fragment StixCyberObservableKnowledge_stixCyberObservable on StixCyberObservable {
        __isStixCyberObservable: __typename
        id
        entity_type
        ...StixCyberObservableHeader_stixCyberObservable
        ...StixCyberObservableIndicators_stixCyberObservable
    }
`;

export const FileExportViewer_entity = gql`
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
`;

export const FileExternalReferencesViewer_entity = gql`
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
`;

export const FileImportViewer_entity = gql`
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
`;

export const FileLine_file = gql`
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
`;

export const FileManager_connectorsExport = gql`
    fragment FileManager_connectorsExport on Connector {
        id
        name
        active
        connector_scope
        updated_at
    }
`;

export const FileManager_connectorsImport = gql`
    fragment FileManager_connectorsImport on Connector {
        id
        name
        active
        connector_scope
        updated_at
        configurations {
            id
            name
            configuration
        }
    }
`;

export const FileWork_file = gql`
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
`;

export const StixCoreObjectContent_stixCoreObject = gql`
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
`;

export const WorkbenchFileLine_file = gql`
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
`;

export const WorkbenchFileViewer_entity = gql`
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

export const PictureManagementViewer_entity = gql`
    fragment PictureManagementViewer_entity on StixDomainObject {
        __isStixDomainObject: __typename
        id
        entity_type
        images: importFiles(prefixMimeType: "image/") {
            edges {
                node {
                    id
                    name
                    ...PictureManagementUtils_node
                }
            }
        }
    }
`;

export const PictureManagementUtils_node = gql`
    fragment PictureManagementUtils_node on File {
        id
        name
        metaData {
            description
            order
            inCarousel
        }
    }
`;

export const ImportContent_connectorsImport = gql`
    fragment ImportContent_connectorsImport on Connector {
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
`;

//#region individuals
export const IndividualDetails_individual = gql`
    fragment IndividualDetails_individual on Individual {
        id
        contact_information
        description
        x_opencti_reliability
    }
`;

export const IndividualKnowledge_individual = gql`
    fragment IndividualKnowledge_individual on Individual {
        id
        name
        x_opencti_aliases
    }
`;

export const Individual_individual = gql`
    fragment Individual_individual on Individual {
        id
        standard_id
        entity_type
        x_opencti_stix_ids
        spec_version
        revoked
        x_opencti_reliability
        confidence
        created
        modified
        created_at
        updated_at
        isUser
        createdBy {
            __typename
            __isIdentity: __typename
            id
            name
            entity_type
            x_opencti_reliability
        }
        creators {
            id
            name
        }
        objectMarking {
            id
            standard_id # SEAL
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
        name
        x_opencti_aliases
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
        ...IndividualDetails_individual
    }
`;

export const IndividualLine_node = gql`
    fragment IndividualLine_node on Individual {
        id
        name
        created
        modified
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
`;
//#endregion

//#region incidents
export const IncidentDetails_incident = gql`
    fragment IncidentDetails_incident on Incident {
        id
        first_seen
        last_seen
        objective
        description
        incident_type
        severity
        source
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
        is_inferred
    }
`;

export const IncidentKnowledge_incident = gql`
    fragment IncidentKnowledge_incident on Incident {
        id
        name
        aliases
        first_seen
        last_seen
    }
`;

export const Incident_incident = gql`
    fragment Incident_incident on Incident {
        id
        standard_id
        entity_type
        x_opencti_stix_ids
        spec_version
        revoked
        confidence
        created
        modified
        created_at
        updated_at
        createdBy {
            __typename
            __isIdentity: __typename
            id
            name
            entity_type
            x_opencti_reliability
        }
        creators {
            name
            id
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
            entity_type
            id
            name
        }
        name
        aliases
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
        ...IncidentDetails_incident
    }
`;

export const IncidentLine_node = gql`
    fragment IncidentLine_node on Incident {
        id
        name
        incident_type
        severity
        created
        modified
        confidence
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
//#endregion

//#region indicators
export const Indicator_indicator = gql`
    fragment Indicator_indicator on Indicator {
        id
        standard_id
        entity_type
        x_opencti_stix_ids
        # SEAL
        x_opencti_main_observable_type
        spec_version
        revoked
        confidence
        created
        modified
        created_at
        updated_at
        createdBy {
            __typename
            __isIdentity: __typename
            id
            name
            entity_type
            x_opencti_reliability
        }
        creators {
            id
            name
        }
        objectMarking {
            id
            entity_type # SEAL
            standard_id # SEAL
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
        name
        pattern_type
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
        ...IndicatorDetails_indicator
    }
`;

export const IndicatorDetails_indicator = gql`
    fragment IndicatorDetails_indicator on Indicator {
        id
        description
        pattern
        valid_from
        valid_until
        x_opencti_score
        x_opencti_detection
        x_mitre_platforms
        indicator_types
        decay_base_score
        decay_base_score_date
        decay_history {
            score
            updated_at
        }
        decay_applied_rule {
            decay_rule_id
            decay_lifetime
            decay_pound
            decay_points
            decay_revoke_score
        }
        decayLiveDetails {
            live_score
            live_points {
                score
                updated_at
            }
        }
        decayChartData {
            live_score_serie {
                updated_at
                score
            }
        }
        objectLabel {
            id
            value
            color
        }
        killChainPhases {
            id
            entity_type
            kill_chain_name
            phase_name
            x_opencti_order
        }
        ...IndicatorObservables_indicator
    }
`;

export const IndicatorObservables_indicator = gql`
    fragment IndicatorObservables_indicator on Indicator {
        id
        name
        parent_types
        entity_type
        observables(first: 25) {
            edges {
                node {
                    __typename
                    id
                    entity_type
                    parent_types
                    observable_value
                    created_at
                    updated_at
                }
            }
            pageInfo {
                globalCount
            }
        }
    }
`;

export const IndicatorLine_node = gql`
    fragment IndicatorLine_node on Indicator {
        id
        entity_type
        name
        pattern_type
        valid_from
        valid_until
        x_opencti_score
        x_opencti_main_observable_type
        created
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
        objectLabel {
            id
            value
            color
        }
        creators {
            id
            name
        }
    }
`;

export const IndicatorEditionOverview_indicator = gql`
    fragment IndicatorEditionOverview_indicator on Indicator {
        id
        name
        confidence
        entity_type
        description
        pattern
        valid_from
        valid_until
        revoked
        x_opencti_score
        x_opencti_detection
        x_mitre_platforms
        indicator_types
        createdBy {
            __typename
            __isIdentity: __typename
            id
            name
            entity_type
        }
        killChainPhases {
            id
            entity_type
            kill_chain_name
            phase_name
            x_opencti_order
        }
        objectMarking {
            id
            definition_type
            definition
            x_opencti_order
            x_opencti_color
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
//#endregion

export const EntityStixCoreRelationshipLineAll_node = gql`
    fragment EntityStixCoreRelationshipLineAll_node on StixCoreRelationship {
        id
        entity_type
        parent_types
        relationship_type
        confidence
        start_time
        stop_time
        description
        is_inferred
        created
        created_at
        x_opencti_inferences {
            rule {
                id
                name
            }
        }
        createdBy {
            __typename
            __isIdentity: __typename
            name
            id
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
        killChainPhases {
            id
            phase_name
            x_opencti_order
        }
        from {
            __typename
            ... on StixCoreObject {
                __isStixCoreObject: __typename
                id
                entity_type
                parent_types
                created_at
                updated_at
                objectLabel {
                    id
                    value
                    color
                }
                createdBy {
                    __typename
                    __isIdentity: __typename
                    name
                    id
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
            }
            ... on StixDomainObject {
                __isStixDomainObject: __typename
                created
                modified
            }
            ... on AttackPattern {
                name
                description
                x_mitre_id
                killChainPhases {
                    id
                    phase_name
                    x_opencti_order
                }
                id
            }
            ... on Campaign {
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
                pattern_type
                pattern_version
                valid_from
                valid_until
                x_opencti_score
                x_opencti_main_observable_type
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
                id
            }
            ... on ThreatActor {
                __isThreatActor: __typename
                name
                description
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
                id
            }
            ... on Event {
                name
                description
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
            ... on StixCyberObservable {
                __isStixCyberObservable: __typename
                observable_value
            }
            ... on StixCoreRelationship {
                id
                entity_type
                parent_types
                created
                created_at
                from {
                    __typename
                    ... on StixCoreObject {
                        __isStixCoreObject: __typename
                        id
                        entity_type
                        parent_types
                        created_at
                        updated_at
                        objectLabel {
                            id
                            value
                            color
                        }
                        createdBy {
                            __typename
                            __isIdentity: __typename
                            name
                            id
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
                    }
                    ... on StixDomainObject {
                        __isStixDomainObject: __typename
                        created
                        modified
                    }
                    ... on AttackPattern {
                        name
                        description
                        x_mitre_id
                        killChainPhases {
                            id
                            phase_name
                            x_opencti_order
                        }
                        id
                    }
                    ... on Campaign {
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
                        pattern_type
                        pattern_version
                        valid_from
                        valid_until
                        x_opencti_score
                        x_opencti_main_observable_type
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
                        id
                    }
                    ... on ThreatActor {
                        __isThreatActor: __typename
                        name
                        description
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
                        id
                    }
                    ... on Event {
                        name
                        description
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
                    ... on StixCyberObservable {
                        __isStixCyberObservable: __typename
                        observable_value
                    }
                    ... on StixCoreRelationship {
                        id
                        entity_type
                        parent_types
                        created
                        created_at
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
                    ... on Note {
                        id
                    }
                    ... on ObservedData {
                        id
                    }
                    ... on Opinion {
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
                    ... on Report {
                        id
                    }
                    ... on Software {
                        id
                    }
                    ... on Status {
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
                to {
                    __typename
                    ... on StixCoreObject {
                        __isStixCoreObject: __typename
                        id
                        entity_type
                        parent_types
                        created_at
                        updated_at
                        objectLabel {
                            id
                            value
                            color
                        }
                        createdBy {
                            __typename
                            __isIdentity: __typename
                            name
                            id
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
                    }
                    ... on StixDomainObject {
                        __isStixDomainObject: __typename
                        created
                        modified
                    }
                    ... on AttackPattern {
                        name
                        description
                        x_mitre_id
                        killChainPhases {
                            id
                            phase_name
                            x_opencti_order
                        }
                        id
                    }
                    ... on Campaign {
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
                        pattern_type
                        pattern_version
                        valid_from
                        valid_until
                        x_opencti_score
                        x_opencti_main_observable_type
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
                        id
                    }
                    ... on ThreatActor {
                        __isThreatActor: __typename
                        name
                        description
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
                        id
                    }
                    ... on Event {
                        name
                        description
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
                    ... on StixCyberObservable {
                        __isStixCyberObservable: __typename
                        observable_value
                    }
                    ... on StixCoreRelationship {
                        id
                        entity_type
                        created
                        created_at
                        parent_types
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
                    ... on Note {
                        id
                    }
                    ... on ObservedData {
                        id
                    }
                    ... on Opinion {
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
                    ... on Report {
                        id
                    }
                    ... on Software {
                        id
                    }
                    ... on Status {
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
            ... on Note {
                id
            }
            ... on ObservedData {
                id
            }
            ... on Opinion {
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
            ... on Report {
                id
            }
            ... on Software {
                id
            }
            ... on Status {
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
        to {
            __typename
            ... on StixCoreObject {
                __isStixCoreObject: __typename
                id
                entity_type
                parent_types
                created_at
                updated_at
                objectLabel {
                    id
                    value
                    color
                }
                createdBy {
                    __typename
                    __isIdentity: __typename
                    name
                    id
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
            }
            ... on StixDomainObject {
                __isStixDomainObject: __typename
                created
                modified
            }
            ... on AttackPattern {
                name
                description
                x_mitre_id
                killChainPhases {
                    id
                    phase_name
                    x_opencti_order
                }
                id
            }
            ... on Campaign {
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
                pattern_type
                pattern_version
                valid_from
                valid_until
                x_opencti_score
                x_opencti_main_observable_type
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
                id
            }
            ... on ThreatActor {
                __isThreatActor: __typename
                name
                description
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
                id
            }
            ... on Event {
                name
                description
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
            ... on StixCyberObservable {
                __isStixCyberObservable: __typename
                observable_value
            }
            ... on StixCoreRelationship {
                id
                entity_type
                created
                created_at
                parent_types
                from {
                    __typename
                    ... on StixCoreObject {
                        __isStixCoreObject: __typename
                        id
                        entity_type
                        parent_types
                        created_at
                        updated_at
                        objectLabel {
                            id
                            value
                            color
                        }
                        createdBy {
                            __typename
                            __isIdentity: __typename
                            name
                            id
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
                    }
                    ... on StixDomainObject {
                        __isStixDomainObject: __typename
                        created
                        modified
                    }
                    ... on AttackPattern {
                        name
                        description
                        x_mitre_id
                        killChainPhases {
                            id
                            phase_name
                            x_opencti_order
                        }
                        id
                    }
                    ... on Campaign {
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
                        pattern_type
                        pattern_version
                        valid_from
                        valid_until
                        x_opencti_score
                        x_opencti_main_observable_type
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
                        id
                    }
                    ... on ThreatActor {
                        __isThreatActor: __typename
                        name
                        description
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
                        id
                    }
                    ... on Event {
                        name
                        description
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
                    ... on StixCyberObservable {
                        __isStixCyberObservable: __typename
                        observable_value
                    }
                    ... on StixCoreRelationship {
                        id
                        entity_type
                        parent_types
                        created
                        created_at
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
                    ... on Note {
                        id
                    }
                    ... on ObservedData {
                        id
                    }
                    ... on Opinion {
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
                    ... on Report {
                        id
                    }
                    ... on Software {
                        id
                    }
                    ... on Status {
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
                to {
                    __typename
                    ... on StixCoreObject {
                        __isStixCoreObject: __typename
                        id
                        entity_type
                        parent_types
                        created_at
                        updated_at
                        objectLabel {
                            id
                            value
                            color
                        }
                        createdBy {
                            __typename
                            __isIdentity: __typename
                            name
                            id
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
                    }
                    ... on StixDomainObject {
                        __isStixDomainObject: __typename
                        created
                        modified
                    }
                    ... on AttackPattern {
                        name
                        description
                        x_mitre_id
                        killChainPhases {
                            id
                            phase_name
                            x_opencti_order
                        }
                        id
                    }
                    ... on Campaign {
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
                        pattern_type
                        pattern_version
                        valid_from
                        valid_until
                        x_opencti_score
                        x_opencti_main_observable_type
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
                        id
                    }
                    ... on ThreatActor {
                        __isThreatActor: __typename
                        name
                        description
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
                        id
                    }
                    ... on Event {
                        name
                        description
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
                    ... on StixCyberObservable {
                        __isStixCyberObservable: __typename
                        observable_value
                    }
                    ... on StixCoreRelationship {
                        id
                        entity_type
                        created
                        created_at
                        parent_types
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
                    ... on Note {
                        id
                    }
                    ... on ObservedData {
                        id
                    }
                    ... on Opinion {
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
                    ... on Report {
                        id
                    }
                    ... on Software {
                        id
                    }
                    ... on Status {
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
            ... on Note {
                id
            }
            ... on ObservedData {
                id
            }
            ... on Opinion {
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
            ... on Report {
                id
            }
            ... on Software {
                id
            }
            ... on Status {
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
`;
