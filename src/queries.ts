import {gql} from "@apollo/client";


export const GET_RELATIONS = gql`
    query applicantIndividualCompanyRelations {
        applicantIndividualCompanyRelations {
            data {
                id
                name
            }
        }
    }
`

export const GET_POSITIONS = gql`
    query applicantIndividualCompanyPositions {
        applicantIndividualCompanyPositions {
            data {
                id
                name }
        }
    }
`
