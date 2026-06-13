<script lang="ts">
    import ExperienceList from "./ExperienceList.svelte";
    import EducationDisplay from "./EducationDisplay.svelte";
    import Competance from "./Competance.svelte";
    import TechPreferance from "./TechPreferance.svelte";
    import { t } from "../stores/i18n";

    type Section = "experience" | "skills" | "education" | "additional";

    let activeTab: Section = "experience";
    $: tabs = [
        { id: "experience" as Section, label: $t.experience },
        { id: "education" as Section, label: $t.education },
        { id: "skills" as Section, label: $t.pdfSkills },
        { id: "additional" as Section, label: $t.additional },
    ];
</script>

<nav class="tabs" aria-label={$t.sections}>
    {#each tabs as tab (tab.id)}
        <button
            id="tab-{tab.id}"
            type="button"
            class:active={activeTab === tab.id}
            aria-current={activeTab === tab.id ? "page" : undefined}
            on:click={() => (activeTab = tab.id)}
        >
            {tab.label}
        </button>
    {/each}
</nav>

<div class="tab-content" aria-labelledby="tab-{activeTab}">
    {#if activeTab === "experience"}
        <ExperienceList />
    {:else if activeTab === "education"}
        <EducationDisplay />
    {:else if activeTab === "skills"}
        <TechPreferance />
    {:else}
        <Competance />
    {/if}
</div>

<style>
    .tabs {
        display: flex;
        flex-wrap: wrap;
        gap: 0.6rem;
        margin-bottom: 2.2rem;
    }

    button {
        border: 1px solid color-mix(in srgb, var(--primary-color) 40%, var(--border-color));
        border-radius: 999px;
        background: var(--surface-color);
        color: var(--text-muted);
        cursor: pointer;
        font-size: 0.95rem;
        font-weight: bold;
        padding: 0.7rem 1.05rem;
        transition:
            border-color 0.2s ease,
            background-color 0.2s ease,
            color 0.2s ease;
    }

    button:hover,
    button:focus-visible {
        border-color: var(--primary-color);
        color: var(--primary-color);
        background: color-mix(in srgb, var(--primary-color) 12%, var(--surface-color));
    }

    button.active {
        border-color: var(--primary-color);
        background: var(--primary-color);
        color: #07140f;
    }

    .tab-content {
        max-width: 880px;
    }

    @media (max-width: 520px) {
        .tabs {
            display: grid;
            grid-template-columns: repeat(2, minmax(0, 1fr));
        }

        button {
            width: 100%;
        }
    }
</style>
