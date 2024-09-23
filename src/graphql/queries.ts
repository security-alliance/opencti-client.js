import { gql } from "@apollo/client/core/index.js";

export const GetFileQuery = gql`
    query GetFileQuery($id: String!) {
        file(id: $id) {
            id
            ...WorkbenchFileLine_file
            metaData {
                mimetype
            }
            __typename
        }
    }
`;
