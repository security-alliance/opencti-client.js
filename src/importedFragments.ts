import { gql } from "@apollo/client/core";

export const incidentFragment = gql`
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
            ... on Identity {
                id
                name
                entity_type
                x_opencti_reliability
            }
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
            }
        }
        workflowEnabled
        ...IncidentDetails_incident
    }
`;
