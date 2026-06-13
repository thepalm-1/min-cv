<script lang="ts">
    import type { Cloud } from "../types/cloud";

    export let title: string;
    export let list: string[] | Cloud[] = [];

    const isCloud = (item: string | Cloud): item is Cloud =>
        typeof item === "object" && "resources" in item;
</script>

<article class="skill">
    <h3>{title}</h3>
    <ul>
        {#each list as item (typeof item === "string" ? item : item.name)}
            {#if isCloud(item)}
                <li>
                    <strong>{item.name}:</strong> {item.resources.join(", ")}
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
</style>
