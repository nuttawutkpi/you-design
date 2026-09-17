# You Design

A Thai-localized fork of [OpenDesign](https://github.com/nexu-io/open-design), licensed under Apache-2.0.

You Design is an agent-native design product: detects your installed code-agent CLI, runs design skills + design systems, and streams artifacts into a sandboxed preview.

This fork adds Thai-language support, a Linux desktop build pipeline, and several simplifications over the upstream project.

## What's different from upstream

### Branding

| Upstream | This fork |
|---|---|
| OpenDesign | You Design |
| `@open-design/*` | `@you-design/*` |
| `od` (bin) | `yd` (bin) |

### Track 1 — Linux desktop build (PR guard)
`.github/workflows/build-linux-pr.yml` — PR guard that exercises the full Linux AppImage build + smoke test on every change touching packaging files. Upstream excludes Linux from stable releases ([issue #4368](https://github.com/nexu-io/open-design/issues/4368)).

To enable Linux on the fork: repo Settings → Variables → Actions → set `ENABLE_STABLE_LINUX=true`.

### Track 2 — Thai design system
`design-systems/thai-modern/` — cream + terracotta starter package with Noto Sans Thai typography. Schema-compatible with upstream packages (`schemaVersion = od-design-system-project/v1`). 11 files, schema-validated.

### Track 3 — BYOK dead-export cleanup
Applied `patches/byok-tools-simplification.patch` — removed 5 dead `export const` declarations from `apps/daemon/src/byok-tools.ts`. No behavior change; shrinks the BYOK public surface from 19 → 14 exports.

### Track 4 — HyperFrames Thai palette + sample
`design-templates/hyperframes/palettes/thai-modern.md` + `samples/thai-modern-reveal/` — a Thai-localized HyperFrames palette plus a 6-second Thai product reveal composition.

### Track 5 — Branding rename
The fork itself. Renames package scopes, binary, branding strings, and directory names. Preserves upstream Apache-2.0 attribution in `NOTICE`.

### Track 7 — HyperFrames palette variants
Two additional palettes in the Thai family:
- **`thai-bold`** — saffron accent (`#E8A33D`) on cream canvas, for product launches and high-energy content
- **`thai-dark`** — warm dark canvas (`#0F0D0A`), terracotta accent preserved, for dark interfaces and cinematic content

See `design-templates/hyperframes/palettes/` for all three Thai variants.

## HyperFrames Thai palette family

| Palette | Canvas | Accent | Use for |
|---|---|---|---|
| `thai-modern` | cream `#FBF7F0` | terracotta `#C0512F` | long-form, editorial, calm |
| `thai-bold` | cream `#FBF7F0` | saffron `#E8A33D` | product launches, announcements |
| `thai-dark` | dark `#0F0D0A` | terracotta `#C0512F` | dark interfaces, cinematic |

## Companion: you-design-mcp

`you-design-mcp` is a **separate repo** that exposes the you-design catalog as MCP tools over stdio. Works with antigravity, Claude Desktop, Cursor, Cline, etc.

```json
{
  "mcpServers": {
    "you-design": {
      "command": "npx",
      "args": ["-y", "you-design-mcp"],
      "env": { "YOU_DESIGN_ROOT": "/path/to/you-design" }
    }
  }
}
```

Tools exposed:
- `list_design_systems({ category?, limit?, offset? })` — browse 154 design systems (filter to ~12 Starter by category, paginate with limit/offset)
- `get_design_system(id)` — fetch full manifest for one system
- `list_skills({ limit?, offset? })` — browse 160 skills
- `list_plugins({ scope?, limit?, offset? })` — browse 300+ plugins
- `help` — usage + client config

See [you-design-mcp](https://github.com/nuttawutkpi/you-design-mcp) for full setup.

## Quick start

```bash
corepack enable && pnpm install
pnpm tools-dev run web
```

For Thai palette rendering, install Noto Sans Thai:

```bash
sudo apt-get install fonts-noto fonts-noto-cjk  # Debian/Ubuntu
brew install --cask font-noto-sans-thai         # macOS
```

## Linux desktop build (Track 1)

The packaging code exists in `tools/pack/src/linux.ts` (1,343 lines, full AppImage + headless + containerized build via `electronuserland/builder` Docker). The upstream release workflow gates the `build_linux` job behind `vars.ENABLE_STABLE_LINUX == 'true'` — currently unset.

To enable on this fork:

1. **Repo Settings → Variables → Actions → set `ENABLE_STABLE_LINUX=true`**
2. The existing `release-stable.yml` `build_linux` job will start running automatically

To enable locally + CI verification first:

```bash
# Build with containerized pnpm bootstrap (default for older glibc compat)
pnpm exec tools-pack linux build --to appimage --containerized --json

# Build native (newer Ubuntu/glibc)
pnpm exec tools-pack linux build --to appimage --json
```

## License

Apache-2.0. See [LICENSE](LICENSE).

This is a fork of OpenDesign. See [NOTICE](NOTICE) for full attribution.

## Upstream + companion

- **Upstream**: [github.com/nexu-io/open-design](https://github.com/nexu-io/open-design)
- **Companion**: [github.com/nuttawutkpi/you-design-mcp](https://github.com/nuttawutkpi/you-design-mcp) — MCP server for the catalog
