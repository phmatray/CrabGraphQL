![CrabGraphQL banner](.github/banner.png)

# CrabGraphQL

<!-- portfolio-badges:start -->
<!-- Identity -->
[![phmatray - CrabGraphQL](https://img.shields.io/static/v1?label=phmatray&message=CrabGraphQL&color=blue&logo=github)](https://github.com/phmatray/CrabGraphQL)
![Top language](https://img.shields.io/github/languages/top/phmatray/CrabGraphQL)
[![Stars](https://img.shields.io/github/stars/phmatray/CrabGraphQL?style=social)](https://github.com/phmatray/CrabGraphQL/stargazers)
[![Forks](https://img.shields.io/github/forks/phmatray/CrabGraphQL?style=social)](https://github.com/phmatray/CrabGraphQL/network/members)
[![License](https://img.shields.io/github/license/phmatray/CrabGraphQL)](https://github.com/phmatray/CrabGraphQL/blob/HEAD/LICENSE)

<!-- Activity -->
[![Issues](https://img.shields.io/github/issues/phmatray/CrabGraphQL)](https://github.com/phmatray/CrabGraphQL/issues)
[![Pull requests](https://img.shields.io/github/issues-pr/phmatray/CrabGraphQL)](https://github.com/phmatray/CrabGraphQL/pulls)
[![Last commit](https://img.shields.io/github/last-commit/phmatray/CrabGraphQL)](https://github.com/phmatray/CrabGraphQL/commits)
<!-- portfolio-badges:end -->


<!-- portfolio-toc:start -->

## Table of Contents

- [The Problem](#the-problem)
- [The Solution](#the-solution)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Usage](#usage)
- [Roadmap](#roadmap)
- [Contributing](#contributing)
- [License](#license)

<!-- portfolio-toc:end -->


> **A GraphQL endpoint that wraps a REST API for Belgian regions and communes ("Crab") behind a typed `Region` / `Commune` schema.**

<!-- Row 1 — Identity -->
[![phmatray - CrabGraphQL](https://img.shields.io/static/v1?label=phmatray&message=CrabGraphQL&color=blue&logo=github)](https://github.com/phmatray/CrabGraphQL)
[![Node.js](https://img.shields.io/badge/Node.js-Express_5-339933?logo=node.js&logoColor=white)](https://nodejs.org/)
[![GraphQL 16](https://img.shields.io/badge/GraphQL-16-E10098?logo=graphql&logoColor=white)](https://graphql.org/)
[![stars](https://img.shields.io/github/stars/phmatray/CrabGraphQL?style=social)](https://github.com/phmatray/CrabGraphQL/stargazers)
[![forks](https://img.shields.io/github/forks/phmatray/CrabGraphQL?style=social)](https://github.com/phmatray/CrabGraphQL/network/members)

<!-- Row 2 — Activity -->
[![issues](https://img.shields.io/github/issues/phmatray/CrabGraphQL)](https://github.com/phmatray/CrabGraphQL/issues)
[![pull requests](https://img.shields.io/github/issues-pr/phmatray/CrabGraphQL)](https://github.com/phmatray/CrabGraphQL/pulls)
[![last commit](https://img.shields.io/github/last-commit/phmatray/CrabGraphQL)](https://github.com/phmatray/CrabGraphQL/commits/dev)

## The Problem

The "Crab" backend exposes Belgian regions and communes over a plain REST API (a `/regions/:id/` style endpoint returning nested links). Consuming that from a client means chasing hyperlinks and reshaping ad-hoc JSON by hand.

## The Solution

CrabGraphQL is a small Express server that sits in front of that REST API and exposes it as a single typed GraphQL schema. A `region(id)` query resolves a `Region` (with geographic center/bounding-box fields, exploitation/organisation dates, etc.) and lazily follows its `communes` link to resolve the nested `Commune` list — so a client asks one GraphQL query instead of walking REST links itself.

## Features

- **Typed `Region` / `Commune` schema** — `GraphQLObjectType` definitions mirror the REST resource shape (id, name, NIS commune code, bounding box, language codes, dates).
- **Query root** — `region(id)` resolves a `Region` directly from the REST API.
- **Lazy nested resolution** — the `communes` field on `Region` fetches its commune list on demand via `node-fetch`, instead of the client following the raw REST link.
- **GraphiQL** — the endpoint is mounted with `graphiql: true` for interactive exploration.

## Tech Stack

- **Node.js** with Babel (`es2015` + `stage-0` presets) for ES module/class-property syntax
- **Express 5** — HTTP server
- **express-graphql** — mounts the GraphQL schema as an HTTP endpoint (with GraphiQL)
- **graphql 16** + **graphql-relay** — schema definition
- **node-fetch** — resolves nested fields from the upstream REST API
- **nodemon** — dev-time auto-restart

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/)
- A running instance of the upstream REST API (defaults to `http://localhost:65094/api/`, see `schema.js`)

### Installation

```bash
git clone https://github.com/phmatray/CrabGraphQL.git
cd CrabGraphQL
npm install
```

### Running

```bash
npm start
```

The server listens on port `5000`; open `http://localhost:5000/` for the GraphiQL playground.

## Usage

```graphql
query {
  region(id: "10000") {
    name
    communes {
      name
      nisCommuneCode
    }
  }
}
```

## Roadmap

See the [open issues](https://github.com/phmatray/CrabGraphQL/issues) — currently limited to Renovate's dependency dashboard.

## Contributing

Contributions are welcome. Open an issue first to discuss any significant change.

1. Fork → branch (`git checkout -b feat/my-feature`)
2. Commit (`git commit -m 'feat: ...'`)
3. Push + Pull Request

## License

`package.json` declares `MIT`, but no `LICENSE` file is present in the repository, so GitHub does not detect a license. Treat the project as unlicensed until a `LICENSE` file is added — see [choosealicense.com](https://choosealicense.com/).

---

© 2026 Philippe Matray
