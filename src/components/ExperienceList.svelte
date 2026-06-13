<script lang="ts">
    import ExperienceAccordion from "./ExperienceAccordion.svelte";
    import erfaringNo from "../dataFiles/experience.json";
    import type { ExperienceData } from "../types/experienceData";
    import { t } from "../stores/i18n";

    const erfaring = erfaringNo as ExperienceData;
</script>

<section class="experience-container" aria-labelledby="experience-heading">
    <h2 id="experience-heading">{$t.pdfExperience}</h2>
    <p class="intro">{$t.experienceIntro}</p>
    <div class="experience-list">
        {#each erfaring.erfaring as exp, index (exp.company + exp.from + exp.role)}
            <ExperienceAccordion experience={exp} featured={index < 2} />
        {/each}
    </div>
</section>

<style>
    h2 {
        font-size: clamp(1.55rem, 3vw, 1.9rem);
        margin: 0 0 0.45rem;
    }

    .intro {
        color: var(--text-muted);
        margin: 0 0 1.5rem;
    }

    .experience-list {
        display: flex;
        flex-direction: column;
        gap: 0.9rem;
    }
</style>
