<script lang="ts">
    import type { TechSkills } from "../types/techSkills";
    import skillsJson from "../dataFiles/techStack.json";
    import SkillAccordion from "./SkillAccordion.svelte";
    import { t } from "../stores/i18n";

    export let skills: TechSkills = skillsJson;
</script>

<section aria-labelledby="skills-heading">
    <h2 id="skills-heading">{$t.pdfSkills}</h2>
    <p class="intro">{$t.skillsIntro}</p>
    <div class="skills-container">
        <SkillAccordion title={$t.programming} list={skills.programming} />
        <SkillAccordion title={$t.clouds} list={skills.clouds} />
        <SkillAccordion title={$t.frameworks} list={skills.framework} />
        <SkillAccordion title={$t.databases} list={skills.database} />
        <SkillAccordion title={$t.infrastructureAsCode} list={skills.iac} />
        <SkillAccordion title="CI/CD" list={skills.cicd} />
        <SkillAccordion title={$t.observability} list={skills.observability} />
        <SkillAccordion title={$t.other} list={skills.other} />
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

    .skills-container {
        display: grid;
        grid-template-columns: repeat(2, minmax(0, 1fr));
        gap: 0.9rem;
    }

    @media (max-width: 680px) {
        .skills-container {
            grid-template-columns: 1fr;
        }
    }
</style>
