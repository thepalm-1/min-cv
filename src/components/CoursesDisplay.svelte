<script lang="ts">
    import type { Course } from "../types/techSkills";
    import courses from "../dataFiles/techstack.json";
    import { t } from "../stores/i18n";

    const courseList = courses.courses as Course[];
</script>

<section class="courses" aria-labelledby="courses-heading">
    <h2 id="courses-heading">{$t.courses}</h2>
    <p class="intro">{$t.coursesIntro}</p>
    <div class="course-list">
        {#each courseList as course (course.name + course.institution + course.date)}
            <article>
                <h3>{course.name}</h3>
                <p class="meta">{course.institution}</p>
                <p class="meta">{course.date}</p>
                {#if course.description}
                    <p class="description">{course.description}</p>
                {/if}
            </article>
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

    .course-list {
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
    .description {
        color: var(--text-muted);
        font-size: 0.92rem;
        line-height: 1.55;
        margin: 0;
    }

    .description {
        margin-top: 0.55rem;
    }

    @media (max-width: 720px) {
        .course-list {
            grid-template-columns: 1fr;
        }
    }
</style>
