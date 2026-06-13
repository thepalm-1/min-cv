<script lang="ts">
    import type { Publication } from "../types/publication";
    import publications from "../dataFiles/publications.json";
    import { t } from "../stores/i18n";

    const publicationList = (publications as Publication[]).map(
        (publication) => ({
            ...publication,
            citation: `${String(publication.title)}. ${String(publication.authors)}. ${String(publication.journal)} ${String(publication.year)}${publication.volume ? `, ${publication.volume}` : ""}${publication.issue ? `(${publication.issue})` : ""}${publication.pages ? `, ${publication.pages}` : ""}`,
        }),
    );
</script>

<section class="publications" aria-labelledby="publications-heading">
    <h2 id="publications-heading">{$t.publications}</h2>
    <p class="intro">{$t.publicationsIntro}</p>
    <ul>
        {#each publicationList as publication (publication.citation)}
            <li>
                <strong>{publication.citation}</strong>
                {#if publication.doi}
                    <a href={`https://doi.org/${publication.doi}`}>{publication.doi}</a>
                {/if}
            </li>
        {/each}
    </ul>
</section>

<style>
    h2 {
        font-size: clamp(1.55rem, 3vw, 1.9rem);
        margin: 0 0 0.45rem;
    }

    .intro {
        color: var(--text-muted);
        margin: 0 0 1rem;
    }

    ul {
        border: 1px solid var(--border-color);
        border-radius: 1rem;
        background: var(--surface-color);
        display: grid;
        gap: 0.8rem;
        margin: 0;
        padding: 1.1rem 1.25rem;
    }

    li {
        display: grid;
        gap: 0.2rem;
        line-height: 1.45;
    }

    strong {
        color: var(--text-color);
        font-size: 0.98rem;
    }

    a {
        color: var(--text-muted);
        font-size: 0.92rem;
    }

    a {
        text-decoration: underline;
        text-underline-offset: 0.15em;
    }
</style>
