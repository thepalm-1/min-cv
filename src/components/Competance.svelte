<script lang="ts">
    import type { Language } from "../types/language";
    import languagesNo from "../dataFiles/language.json";
    import competenciesNo from "../dataFiles/kompetanse.json";
    import { t } from "../stores/i18n";

    export let languages: Language[] | undefined = undefined;
    export let achievements: string[] | undefined = undefined;

    $: displayLanguages = languages ?? languagesNo;
    $: displayAchievements = achievements ?? competenciesNo;
</script>

<section class="additional" aria-labelledby="additional-heading">
    <h2 id="additional-heading">{$t.additional}</h2>
    <div class="cards">
        <article>
            <h3>{$t.lang}</h3>
            <ul>
                {#each displayLanguages as lang (lang.name)}
                    <li><strong>{lang.name}:</strong> {lang.level}</li>
                {/each}
            </ul>
        </article>
        <article>
            <h3>{$t.achievements}</h3>
            <ul>
                {#each displayAchievements as achievement (achievement)}
                    <li>{achievement}</li>
                {/each}
            </ul>
        </article>
    </div>
</section>

<style>
    h2 {
        font-size: clamp(1.55rem, 3vw, 1.9rem);
        margin: 0 0 1.4rem;
    }

    .cards {
        display: grid;
        grid-template-columns: repeat(2, minmax(0, 1fr));
        gap: 0.9rem;
    }

    article {
        border: 1px solid var(--border-color);
        border-radius: 1rem;
        background: var(--surface-color);
        padding: 1.2rem 1.4rem;
    }

    h3 {
        font-size: 1.08rem;
        margin: 0 0 0.8rem;
    }

    ul {
        line-height: 1.55;
        margin: 0;
        padding-left: 1.1rem;
    }

    li + li {
        margin-top: 0.4rem;
    }

    @media (max-width: 680px) {
        .cards {
            grid-template-columns: 1fr;
        }
    }
</style>
