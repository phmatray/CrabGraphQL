import {
    GraphQLSchema,
    GraphQLObjectType,
    GraphQLString,
    GraphQLList
} from 'graphql';

import fetch from 'node-fetch';

const BASE_URL = 'http://localhost:65094/api/'

function getRegionByURL(relativeURL) {
    return fetch(`${BASE_URL}${relativeURL}`)
        .then(res => res.json())
}

const CommuneType = new GraphQLObjectType({
    name: 'Commune',
    description: '...',

    fields: () => ({
        url: {
            type: GraphQLString
        },
        description: {
            type: GraphQLString
        },
        id: {
            type: GraphQLString
        },
        name: {
            type: GraphQLString
        },
        nameLanguageCode: {
            type: GraphQLString
        },
        languageCode1: {
            type: GraphQLString
        },
        languageCode2: {
            type: GraphQLString
        },
        nisCommuneCode: {
            type: GraphQLString
        }
    })
});

const RegionType = new GraphQLObjectType({
    name: 'Region',
    description: '...',

    fields: () => ({
        url: {
            type: GraphQLString,
        },
        description: {
            type: GraphQLString,
        },
        id: {
            type: GraphQLString
        },
        name: {
            type: GraphQLString
        },
        nameLanguageCode: {
            type: GraphQLString
        },
        centerX: {
            type: GraphQLString
        },
        centerY: {
            type: GraphQLString
        },
        minimumX: {
            type: GraphQLString
        },
        minimumY: {
            type: GraphQLString
        },
        maximumX: {
            type: GraphQLString
        },
        maximumY: {
            type: GraphQLString
        },
        startDate: {
            type: GraphQLString
        },
        startTime: {
            type: GraphQLString
        },
        startExploitation: {
            type: GraphQLString
        },
        startOrganisation: {
            type: GraphQLString
        },
        communes: {
            type: new GraphQLList(CommuneType),
            resolve: (region) => getRegionByURL(region.communes)
        }
    })
});

const QueryType = new GraphQLObjectType({
    name: 'Query',
    description: '...',

    fields: () => ({
        region: {
            type: RegionType,
            args: {
                id: {
                    type: GraphQLString
                }
            },
            resolve: (root, args) => getRegionByURL(`/regions/${args.id}/`)
        }
    })
});

export default new GraphQLSchema({
    query: QueryType
})
