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
    Url: {type: GraphQLString},
    Description: {type: GraphQLString},
    Id: {type: GraphQLString},
    Name: {type: GraphQLString},
    NameLanguageCode: {type: GraphQLString},
    LanguageCode1: {type: GraphQLString},
    LanguageCode2: {type: GraphQLString},
    NISCommuneCode: {type: GraphQLString}
  })
});

const RegionType = new GraphQLObjectType({
  name: 'Region',
  description: '...',

  fields: () => ({
    Url: {type: GraphQLString},
    Description: {type: GraphQLString},
    Id: {type: GraphQLString},
    Name: {type: GraphQLString},
    NameLanguageCode: {type: GraphQLString},
    CenterX: {type: GraphQLString},
    CenterY: {type: GraphQLString},
    MinimumX: {type: GraphQLString},
    MinimumY: {type: GraphQLString},
    MaximumX: {type: GraphQLString},
    MaximumY: {type: GraphQLString},
    StartDate: {type: GraphQLString},
    StartTime: {type: GraphQLString},
    StartExploitation: {type: GraphQLString},
    StartOrganisation: {type: GraphQLString},
    Communes: {
      type: new GraphQLList(CommuneType),
      resolve: (region) => getRegionByURL(region.Communes)
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
        id: {type: GraphQLString}
      },
      resolve: (root, args) => getRegionByURL(`/regions/${args.id}/`)
    }
  })
});

export default new GraphQLSchema({
  query: QueryType
})
