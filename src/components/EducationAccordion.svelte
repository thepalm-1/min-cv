<script lang="ts">
    import type { Education } from "../types/education";
    import { t } from "../stores/i18n";

    export let education: Education;

    let isOpen = false;
    $: contentId = `education-${education.name}-${education.type}`
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-");
</script>

<article class="education-entry">
    <button
        type="button"
        class="header"
        aria-expanded={isOpen}
        aria-controls={contentId}
        aria-label={`${isOpen ? $t.collapse : $t.expand} ${education.name}`}
        on:click={() => (isOpen = !isOpen)}
    >
        <span>
            <strong>{education.name}</strong>
            <small>{education.school} · {education.type}</small>
        </span>
        <span class="period">{education.from} – {education.to}</span>
        <span class="indicator" aria-hidden="true">{isOpen ? "▾" : "▸"}</span>
    </button>

    {#if isOpen}
        <div class="body" id={contentId}>
            {#if education.thesis}
                <p>
                    <strong>{$t.pdfThesis}:</strong>
                    {education.thesis.name} –
                    {education.thesis.subTitle}
                </p>
            {/if}

            {#if education.subjects.length > 0}
                <p>
                    <strong>{$t.topics}:</strong>
                    {education.subjects.join(", ")}
                </p>
            {/if}
        </div>
    {/if}
</article>

<style>
    .education-entry {
        width: 100%;
        border: 1px solid var(--border-color);
        border-radius: 1rem;
        background: var(--surface-color);
        overflow: hidden;
    }

    .header {
        display: grid;
        grid-template-columns: minmax(0, 1fr) auto auto;
        align-items: center;
        gap: 1rem;
        width: 100%;
        border: 0;
        background: transparent;
        color: var(--text-color);
        cursor: pointer;
        padding: 1.2rem 1.4rem;
        text-align: left;
    }

    .header:hover,
    .header:focus-visible {
        background: color-mix(in srgb, var(--primary-color) 10%, var(--surface-muted));
    }

    strong {
        display: block;
        font-size: 1.1rem;
        margin-bottom: 0.25rem;
    }

    small,
    .period,
    .body {
        color: var(--text-muted);
        font-size: 0.95rem;
    }

    .period {
        white-space: nowrap;
    }

    .indicator {
        color: var(--primary-color);
        font-size: 1.35rem;
        font-weight: bold;
    }

    .body {
        border-top: 1px solid var(--border-color);
        line-height: 1.55;
        padding: 1rem 1.4rem 1.2rem;
    }

    .body p {
        margin: 0;
    }

    .body p + p {
        margin-top: 0.65rem;
    }

    .body strong {
        display: inline;
        font-size: inherit;
        margin: 0;
    }

    @media (max-width: 600px) {
        .header {
            grid-template-columns: minmax(0, 1fr) auto;
            padding: 1rem;
        }

        .period {
            grid-column: 1;
            grid-row: 2;
        }

        .indicator {
            grid-column: 2;
            grid-row: 1 / span 2;
        }

        .body {
            padding: 0.9rem 1rem 1rem;
        }
    }
</style>
