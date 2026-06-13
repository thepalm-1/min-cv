<script lang="ts">
    import type { School } from "../types/school";
    import schools from "../dataFiles/schools.json";
    import { t } from "../stores/i18n";

    const schoolList = schools.schools as School[];
</script>

<section class="schools" aria-labelledby="schools-heading">
    <h2 id="schools-heading">{$t.school}</h2>
    <div class="entries">
        {#each schoolList as school (school.name + school.from + school.to)}
            <article>
                <h3>{school.name}</h3>
                <p class="meta">{school.type}</p>
                <p class="meta">{school.from}–{school.to}</p>
                {#if school.fordypning}
                    <p class="detail">{school.fordypning}</p>
                {/if}
            </article>
        {/each}
    </div>
</section>

<style>
    h2 {
        font-size: clamp(1.55rem, 3vw, 1.9rem);
        margin: 0 0 1.1rem;
    }

    .entries {
        display: grid;
        grid-template-columns: repeat(2, minmax(0, 1fr));
        gap: 0.9rem;
    }

    article {
        border: 1px solid var(--border-color);
        border-radius: 1rem;
        background: var(--surface-color);
        padding: 1.15rem 1.25rem;
    }

    h3 {
        font-size: 1rem;
        margin: 0 0 0.4rem;
    }

    .meta,
    .detail {
        color: var(--text-muted);
        font-size: 0.92rem;
        line-height: 1.55;
        margin: 0;
    }

    .detail {
        margin-top: 0.55rem;
    }

    @media (max-width: 720px) {
        .entries {
            grid-template-columns: 1fr;
        }
    }
</style>
