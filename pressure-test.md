Let’s treat this as:
**“How do I describe my tiny world of 2 fragments in a way that:**

* is machine-readable,
* is human-navigable, and
* can scale later to many targets/locales?”

I’ll give you:

1. A **Path Data Gathering List Template** (fill-in structure).
2. A **concrete example** for your tiny experiment (one target, en-US + fr-FR).
3. A simple **method to gather + organize** this logic for fast navigation/search.

---

## 1. Path Data Gathering List Template

Conceptually: each **unique target** (e.g., a product/page slug) has:

* A **golden copy** (one CF in one locale).
* One or more **locale variants**.
* One or more **page URLs** where that CF is used.

So one record looks like:

```jsonc
{
  "targetId": "widget-x",                // stable ID for this logical thing
  "targetLabel": "Widget X Pro",        // human-friendly name
  "cfModel": "product-detail",          // CF model name
  "golden": {
    "locale": "en-US",
    "cfPath": "/content/dam/site/content-fragments/products/widget-x/en-us-product-detail",
    "pageUrl": "/us/en/products/widget-x"   // canonical page URL
  },
  "variants": [
    {
      "locale": "fr-FR",
      "cfPath": "/content/dam/site/content-fragments/products/widget-x/fr-fr-product-detail",
      "pageUrl": "/fr/fr/produits/widget-x"
    }
    // later: add more locales here
  ]
}
```

Now make it a **list** for many targets:

```jsonc
{
  "targets": [
    {
      "targetId": "widget-x",
      "targetLabel": "Widget X Pro",
      "cfModel": "product-detail",
      "golden": {
        "locale": "en-US",
        "cfPath": "/content/dam/site/content-fragments/products/widget-x/en-us-product-detail",
        "pageUrl": "/us/en/products/widget-x"
      },
      "variants": [
        {
          "locale": "fr-FR",
          "cfPath": "/content/dam/site/content-fragments/products/widget-x/fr-fr-product-detail",
          "pageUrl": "/fr/fr/produits/widget-x"
        }
      ]
    }
    // more targets go here
  ]
}
```

That’s your **path data gathering list**: a small manifest the agent can read.

---

## 2. Tiny Experiment: Filled-In Example for 2 Fragments

For your pressure test:

* **One CF model**: `product-detail`
* **One target**: `widget-x`
* **Golden locale**: `en-US`
* **One variant**: `fr-FR`

You can literally start with this as `cf-targets.json`:

```json
{
  "targets": [
    {
      "targetId": "widget-x",
      "targetLabel": "Widget X Pro",
      "cfModel": "product-detail",

      "golden": {
        "locale": "en-US",
        "cfPath": "/content/dam/site/content-fragments/products/widget-x/en-us-product-detail",
        "pageUrl": "/us/en/products/widget-x"
      },

      "variants": [
        {
          "locale": "fr-FR",
          "cfPath": "/content/dam/site/content-fragments/products/widget-x/fr-fr-product-detail",
          "pageUrl": "/fr/fr/produits/widget-x"
        }
      ]
    }
  ]
}
```

Later you can add:

* another target (`widget-y`),
* another locale (`de-DE`), etc.
  The shape stays the same.

---

## 3. How to Gather & Organize This Logic (Fast Nav/Search)

### Step 1 – Decide your **targetId** convention

Make `targetId` the glue between everything:

* Often the **product slug** or **page slug** works:

  * `widget-x`, `macbook-pro-16`, `iphone-16-pro`, etc.
* You can also store this **as metadata** on the CF:

  * A custom property like `cq:targetId` or `productId`.

This gives you a stable handle for:

* CF paths,
* page URLs,
* analytics,
* AI agents.

---

### Step 2 – Build the initial list manually (for the tiny test)

Since we’re only talking **two fragments**, don’t over-automate yet:

1. Open your CFs in AEM.
2. Copy the **DAM path** for:

   * Golden CF (en-US).
   * fr-FR CF.
3. Copy the **page URLs** they appear on.
4. Drop them into the `cf-targets.json` structure above.

That’s your **v0 manifest**.

---

### Step 3 – Use the manifest for *fast navigation & search*

Once you have `cf-targets.json`, you can:

* Search by `targetId` to find:

  * All locales.
  * All CF paths.
  * All page URLs.

Example pseudo-code for a tiny CLI:

```js
// pseudo-code to quickly find CFs by targetId or URL

const manifest = require('./cf-targets.json');

function findByTargetId(targetId) {
  return manifest.targets.find(t => t.targetId === targetId);
}

function findByUrl(url) {
  return manifest.targets.filter(t => {
    if (t.golden.pageUrl === url) return true;
    return t.variants.some(v => v.pageUrl === url);
  });
}

// Usage:

console.log(findByTargetId('widget-x'));
// => returns both en-US and fr-FR paths + URLs

console.log(findByUrl('/fr/fr/produits/widget-x'));
// => returns the target and its golden/variant info
```

For now you don’t even need a CLI; you can:

* Keep the JSON in your repo,
* Use an editor’s search or `jq` to filter.

---

### Step 4 – Hook this into your AI agent later

Your **Golden vs Locale Consistency Agent** (from the previous message) can now:

1. Read `cf-targets.json`.
2. For each `target`:

   * Fetch golden and variant CF JSON using `cfPath`.
   * Compare them (deterministic diff).
   * Ask the LLM to summarize issues.
3. Attach `targetId`, `targetLabel`, and `pageUrl` to the report, so content managers can click straight to the relevant CF or page.

Because everything is keyed by **targetId + locale**, navigation is fast:

* From **slug** → CF path(s).
* From **page URL** → all CFs that back it.
* From **targetId** → golden + all locales.

---

### Step 5 – How this scales later

Once the tiny experiment feels good, you can:

* Add more targets to the same JSON.
* Eventually generate this manifest automatically by:

  * Querying JCR for CFs with a `targetId` property.
  * Grouping them by `targetId` and locale.
  * Emitting `cf-targets.json` as a build artifact.

At that point, it’s no longer just a manifest; it’s the **index** your agents and tools use for:

* Golden consistency checks.
* Launch vs Source comparisons.
* Orphaned fragment detection.

That little structure is the “map” your AI agents will use to navigate your AEM world without getting lost.


---

Nice, that constraint actually *simplifies* the world:

> Golden CFs are the source of truth.
> Variants **always** exist *because* they were rolled down from the golden.
> Another team only localizes language, not structure.

Let’s bake that into the tiny experiment and the tooling concept.

---

## 1. What your “golden-centric” rule changes

Two key implications:

1. **Direction is fixed:**

   * Golden → rolled down → localized variants.
   * There should never be a “random variant” that isn’t tied to a golden.

2. **Responsibilities split:**

   * Global team: owns **structure + canonical content** in the golden CF.
   * Local team: owns **textual/localizable fields only** in variants.

So our tools and agents should:

* Start from **golden CFs only**.
* Derive or verify **all variants** from each golden.
* Enforce “local team can only change translatable fields”.

---

## 2. Updated Path Data Manifest (golden-first)

Let’s adjust the manifest from before so it explicitly encodes:

* “This CF is golden.”
* “These are the locales expected to exist below it.”
* “These variant paths were rolled down from this golden.”

For the tiny experiment (1 golden, 1 variant), a good shape is:

```jsonc
{
  "targets": [
    {
      "targetId": "widget-x",
      "targetLabel": "Widget X Pro",
      "cfModel": "product-detail",

      "golden": {
        "isGolden": true,
        "ownerTeam": "Global Content",
        "locale": "en-US",
        "cfPath": "/content/dam/site/content-fragments/products/widget-x/en-us-product-detail",
        "pageUrl": "/us/en/products/widget-x",
        "expectedLocales": ["fr-FR"]         // what *should* exist below
      },

      "variants": [
        {
          "locale": "fr-FR",
          "cfPath": "/content/dam/site/content-fragments/products/widget-x/fr-fr-product-detail",
          "pageUrl": "/fr/fr/produits/widget-x",
          "sourceGoldenPath": "/content/dam/site/content-fragments/products/widget-x/en-us-product-detail",
          "ownerTeam": "FR Local Market"
        }
      ]
    }
  ]
}
```

Two important details:

* `expectedLocales` lives on the **golden** definition.
* Each variant has a `sourceGoldenPath` so your tools/agents always know where it came from.

Even at this tiny scale, this gives you:

* Fast navigation: start at golden → jump to all variants.
* A clear contract: “If `expectedLocales` includes `fr-FR`, there *must* be a variant for it.”

---

## 3. How to gather & organize this for your tiny test

For the experiment with **just 2 fragments**:

1. **Start from the golden CF list**, not the variants:

   * Decide your set of “golden targets” (e.g. one for each product or key page).
   * For each, note:

     * `targetId`
     * `cfModel`
     * `golden.cfPath`
     * `golden.pageUrl`
     * `golden.expectedLocales` (for now: `["fr-FR"]`)

2. **Then fill in variants per golden:**

   * For `widget-x` + `fr-FR`:

     * Paste variant `cfPath` and `pageUrl`.
     * Set `sourceGoldenPath` to the golden’s `cfPath`.

3. **Store this manifest** in version control:

   * e.g. `config/cf-targets.json`.

4. **Use golden as the index key:**

   * Search by `targetId` → see golden + all variants.
   * Search by `golden.cfPath` → list all variants for that exact CF.
   * Search by `locale` → see all variants in that locale and their goldens.

That’s enough to let an agent quickly answer:

> “Show me all variants of the golden `widget-x` fragment, and whether they’re consistent.”

---

## 4. Tiny navigation/search helper (golden-centric)

Still staying in “tiny experiment” territory, you could imagine something like:

```js
// pseudo-code for golden-centric lookup

const manifest = require('./cf-targets.json');

function getGolden(targetId) {
  return manifest.targets.find(t => t.targetId === targetId)?.golden;
}

function getVariantsForGolden(goldenPath) {
  return manifest.targets
    .flatMap(t => t.variants.map(v => ({ targetId: t.targetId, ...v })))
    .filter(v => v.sourceGoldenPath === goldenPath);
}

// Example usage:

const golden = getGolden('widget-x');
// => golden.cfPath = "/content/dam/.../en-us-product-detail"

const variants = getVariantsForGolden(golden.cfPath);
// => [{ locale: "fr-FR", cfPath: "/content/dam/.../fr-fr-product-detail", ... }]
```

This is deliberately small, but it proves the navigation model:

* Start from **golden** → get all variants → feed into your consistency checks.

---

## 5. How the “golden-first” rule shapes your first agent

Reusing the diff + agent idea from before, the rules get sharper:

* **Golden is canonical:**

  * All structural fields must match the golden:

    * Model type
    * Presence of required fields
    * Reference relationships (e.g. nested CF references)

* **Variants may only change translatable fields:**

  * e.g., `title`, `subtitle`, `shortDescription`, `longDescription`, `ctaLabel`.
  * Non-translatable fields (like `heroImage`, `productId`, maybe `price` depending on org) should either:

    * match golden exactly, or
    * differ only where you explicitly allow it.

So the tiny experiment’s **Golden vs Locale agent** can assume:

1. There *must* be a variant for each `expectedLocales` entry
   (if missing → error).
2. All non-translatable fields must match golden
   (if changed → error).
3. All translatable fields **should** differ in ways consistent with the locale
   (if they don’t differ at all, you might flag “missing translation” as a soft warning).

---

If you’re comfortable with this golden-first framing, the next useful step is:

> For `product-detail`, which fields in your real model are **translatable** vs **structural**?

Once you list 5–8 real fields from your actual CF model and split them into those two buckets, we can shape the *exact* rule set your first agent would use in production.
