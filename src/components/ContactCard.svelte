<script lang="ts">
    import { t } from "../stores/i18n";

    export let name: string;
    export let email: string;
    export let github: string;
    export let phone: string;
    export let linkedin: string = "";
</script>

<address class="contact" aria-label="{$t.contactFor} {name}">
    <a href={`mailto:${email}`}>{email}</a>
    <a href={`tel:${phone.replace(/\s/g, "")}`}>{phone}</a>
    <a
        href={`https://${github.replace(/^https?:\/\//, "")}`}
        target="_blank"
        rel="noopener noreferrer">GitHub</a
    >
    {#if linkedin}
        <a
            href={`https://${linkedin.replace(/^https?:\/\//, "")}`}
            target="_blank"
            rel="noopener noreferrer">LinkedIn</a
        >
    {/if}
</address>

<style>
    .contact {
        display: flex;
        flex-direction: column;
        gap: 0.45rem;
        width: 100%;
        color: var(--text-muted);
        font-style: normal;
        font-size: 0.97rem;
    }

    a {
        color: var(--text-muted);
        text-decoration: none;
    }

    a:hover,
    a:focus-visible {
        color: var(--primary-color);
        text-decoration: underline;
    }
</style>
