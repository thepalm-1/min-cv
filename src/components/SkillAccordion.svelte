<script lang="ts">
    import type { Course } from "../types/techSkills";

    export let title: string;
    export let list: Array<string | Course> = [];

    const isCourse = (item: string | Course): item is Course =>
        typeof item === "object";
</script>

<article class="skill">
    <h3>{title}</h3>
    <ul>
        {#each list as item (item)}
            {#if isCourse(item)}
                <li class="course-item">
                    <strong>{item.name}</strong>
                    <span>{item.institution}</span>
                    <small>{item.date}</small>
                    {#if item.description}
                        <p>{item.description}</p>
                    {/if}
                </li>
            {:else}
                <li>{item}</li>
            {/if}
        {/each}
    </ul>
</article>

<style>
    .skill {
        border: 1px solid var(--border-color);
        border-radius: 1rem;
        background: var(--surface-color);
        min-width: 0;
        padding: 1.1rem 1.25rem;
    }

    h3 {
        color: var(--primary-color);
        font-size: 1rem;
        margin: 0 0 0.75rem;
    }

    ul {
        color: var(--text-muted);
        font-size: 0.94rem;
        line-height: 1.5;
        margin: 0;
        padding-left: 1.05rem;
    }

    li + li {
        margin-top: 0.28rem;
    }

    .course-item {
        display: grid;
        gap: 0.15rem;
    }

    .course-item strong {
        color: var(--text-color);
        display: block;
        font-size: 0.96rem;
        margin: 0;
    }

    .course-item span,
    .course-item small,
    .course-item p {
        color: var(--text-muted);
        font-size: 0.92rem;
        margin: 0;
    }

    .course-item p {
        line-height: 1.5;
        margin-top: 0.15rem;
    }
</style>
