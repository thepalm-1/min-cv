<script lang="ts">
    import utdanningNo from "../dataFiles/education.json";
    import EducationAccordion from "./EducationAccordion.svelte";
    import type { EducationData } from "../types/educationData";
    import { t } from "../stores/i18n";

    const utdanning = utdanningNo as EducationData;
</script>

<section class="education" aria-labelledby="education-heading">
    <h2 id="education-heading">{$t.education}</h2>
    <p>{$t.educationIntro}</p>
    <div class="entries">
        <EducationAccordion education={utdanning.dnb} />
        <EducationAccordion education={utdanning.master} />
        <EducationAccordion education={utdanning.pt} />
        <EducationAccordion education={utdanning.bachelor} />
    </div>
</section>

<style>
    .education {
        width: 100%;
    }

    h2 {
        font-size: clamp(1.55rem, 3vw, 1.9rem);
        margin: 0 0 0.45rem;
    }

    p {
        color: var(--text-muted);
        margin: 0 0 1.5rem;
    }

    .entries {
        display: grid;
        gap: 0.9rem;
        width: 100%;
    }
</style>
