<script lang="ts">
    import { t } from "../stores/i18n";
</script>

<span class="theme-label">{$t.themeDark}</span>

<style>
    .theme-label {
        border: 1px solid var(--border-color);
        border-radius: 999px;
        background: var(--surface-color);
        color: var(--text-muted);
        font-size: 0.9rem;
        padding: 0.55rem 0.9rem;
    }
</style>
