<script lang="ts">
    import type { Experience } from "../types/experience";
    import { t } from "../stores/i18n";

    export let experience: Experience;
    export let featured: boolean = false;

    let isOpen = false;
    $: hasDetails =
        Boolean(experience.accomplishments?.length) ||
        Boolean(experience.comments?.length) ||
        Boolean(experience.remarks?.length);
    $: contentId = `experience-${experience.company}-${experience.role}-${experience.from}`
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-");
</script>

<article class="experience" class:featured>
    {#if hasDetails}
        <button
            type="button"
            class="summary"
            aria-expanded={isOpen}
            aria-controls={contentId}
            aria-label={`${isOpen ? $t.collapse : $t.expand} ${experience.role} ${experience.company}`}
            on:click={() => (isOpen = !isOpen)}
        >
            <span>
                <strong>{experience.role}</strong>
                <small>
                    {experience.company}{experience.department
                        ? ` · ${experience.department}`
                        : ""}
                </small>
            </span>
            <span class="period">
                {experience.from} – {experience.current ? $t.present : experience.to}
            </span>
            <span class="indicator" aria-hidden="true">{isOpen ? "▾" : "▸"}</span>
        </button>
    {:else}
        <div class="summary plain">
            <span>
                <strong>{experience.role}</strong>
                <small>
                    {experience.company}{experience.department
                        ? ` · ${experience.department}`
                        : ""}
                </small>
            </span>
            <span class="period">
                {experience.from} – {experience.current ? $t.present : experience.to}
            </span>
        </div>
    {/if}

    {#if isOpen && hasDetails}
        <div class="body" id={contentId}>
            {#if experience.accomplishments?.length}
                <section class="detail-group accomplishments" aria-label={$t.accomplishments}>
                    <h4>{$t.accomplishments}</h4>
                    <ul class="points">
                        {#each experience.accomplishments as item (item)}
                            <li>{item}</li>
                        {/each}
                    </ul>
                </section>
            {/if}

            {#if experience.comments?.length}
                <section class="detail-group comments" aria-label={$t.comments}>
                    <h4>{$t.comments}</h4>
                    <ul class="points">
                        {#each experience.comments as comment (comment)}
                            <li>{comment}</li>
                        {/each}
                    </ul>
                </section>
            {/if}

            {#if experience.remarks?.length}
                <ul class="tags" aria-label={$t.relevantTopics}>
                    {#each experience.remarks as remark (remark)}
                        <li>{remark}</li>
                    {/each}
                </ul>
            {/if}
        </div>
    {/if}
</article>

<style>
    .experience {
        border: 1px solid var(--border-color);
        border-radius: 1rem;
        background: var(--surface-color);
        overflow: hidden;
        width: 100%;
    }

    .featured {
        border-left: 4px solid var(--primary-color);
    }

    .summary {
        align-items: center;
        background: transparent;
        border: 0;
        color: var(--text-color);
        display: grid;
        gap: 1rem;
        grid-template-columns: minmax(0, 1fr) auto auto;
        padding: 1.2rem 1.4rem;
        text-align: left;
        width: 100%;
    }

    button.summary {
        cursor: pointer;
    }

    button.summary:hover,
    button.summary:focus-visible {
        background: color-mix(in srgb, var(--primary-color) 10%, var(--surface-muted));
    }

    .plain {
        grid-template-columns: minmax(0, 1fr) auto;
    }

    strong {
        display: block;
        font-size: 1.13rem;
        margin: 0 0 0.3rem;
    }

    small,
    .period {
        color: var(--text-muted);
        font-size: 0.94rem;
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
        padding: 0.1rem 1.4rem 1.2rem;
    }

    .detail-group {
        margin-top: 1rem;
    }

    .detail-group h4 {
        color: var(--text-muted);
        font-size: 0.85rem;
        letter-spacing: 0.06em;
        margin: 0 0 0.55rem;
        text-transform: uppercase;
    }

    .accomplishments {
        background: var(--surface-muted);
        border-left: 3px solid var(--primary-color);
        border-radius: 0.6rem;
        padding: 0.75rem 0.9rem;
    }

    .accomplishments h4 {
        color: var(--primary-color);
    }

    .accomplishments + .comments {
        border-top: 1px solid var(--border-color);
        padding-top: 1rem;
    }

    .points {
        line-height: 1.55;
        margin: 0;
        padding-left: 1.2rem;
    }

    .points li + li {
        margin-top: 0.4rem;
    }

    .tags {
        display: flex;
        flex-wrap: wrap;
        gap: 0.42rem;
        list-style: none;
        margin: 1rem 0 0;
        padding: 0;
    }

    .tags li {
        background: var(--surface-muted);
        border-radius: 999px;
        color: var(--text-muted);
        font-size: 0.84rem;
        padding: 0.34rem 0.62rem;
    }

    @media (max-width: 600px) {
        .summary {
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
            padding: 0.1rem 1rem 1rem;
        }
    }
</style>
