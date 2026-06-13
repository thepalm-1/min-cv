<script lang="ts">
    import ContactCard from "../components/ContactCard.svelte";
    import ContentSwitch from "../components/ContentSwitch.svelte";
    import education from "../dataFiles/education.json";
    import contact from "../dataFiles/contactInfo.json";
    import language from "../dataFiles/language.json";
    import techStack from "../dataFiles/techStack.json";
    import { t } from "../stores/i18n";
    import { base } from "$app/paths";

    const aiMetadata = {
        "@context": "https://schema.org",
        "@type": "Person",
        name: contact.name,
        jobTitle: "Overingeniør",
        knowsLanguage: language.map((item) => ({
            "@type": "Language",
            name: item.name,
            alternateName: item.level
        })),
        knowsAbout: [
            ...techStack.programming,
            ...techStack.framework,
            ...techStack.database,
            ...techStack.iac,
            ...techStack.cicd,
            ...techStack.observability,
            ...techStack.other
        ],
        educationalCredentialAwarded: [
            education.dnb.name,
            education.master.name,
            education.bachelor.name,
            education.pt.name
        ],
        sameAs: [contact.github, contact.linkedin],
        email: `mailto:${contact.email}`,
        telephone: contact.phone
    };
</script>

<svelte:head>
    <title>Hans Olav Hovtun Palm | Overingeniør</title>
    <meta name="description" content={$t.profileDescription} />
    <meta
        name="ai:summary"
        content="Lars Christian Hovtun Palm er en software engineer og overingeniør med erfaring fra AWS, DevOps, skyinfrastruktur, backendutvikling og løsningsarkitektur."
    />
    <meta
        name="ai:skills"
        content="Kotlin, Python, Java, TypeScript, JavaScript, SQL, Bash, AWS, Azure, Terraform, Terragrunt, CloudFormation, Docker, Kafka, OpenTelemetry."
    />
    <meta
        name="ai:education"
        content="Universitetet i Oslo: årsstudium i IT-arkitektur, master i informatikk og bachelor i informatikk. Akademiet For Personlig Trening: personlig trener."
    />
    <meta
        name="ai:languages"
        content="Norsk morsmål, engelsk god muntlig og skriftlig, tysk videregående skole-nivå."
    />
    <meta
        name="ai:experience"
        content="DNB software engineer fra august 2025, tidligere IT architect graduate i DNB, gruppeunderviser og orakel ved UiO, internship hos Famme."
    />
    <script type="application/ld+json">
        {JSON.stringify(aiMetadata)}
    </script>
</svelte:head>

<main class="profile">
    <section class="document-header" aria-label={$t.profileSection}>
        <div class="header-copy">
            <p class="eyebrow">Overingeniør</p>
            <h1>{contact.name}</h1>
            <p class="summary">{$t.profileDescription}</p>

            <div class="header-strip" aria-label="Sammendrag og kompetanse">
                <div class="sidebar-card">
                    <h2 class="panel-title">Kortprofil</h2>
                    <ul class="key-points">
                        <li>{$t.cloudHighlight}</li>
                        <li>{$t.languageHighlight}</li>
                        <li>{$t.architectureHighlight}</li>
                    </ul>
                </div>

                <div class="sidebar-card">
                    <h2 class="panel-title">Kontakt</h2>
                    <ContactCard
                        name={contact.name}
                        email={contact.email}
                        github={contact.github}
                        phone={contact.phone}
                        linkedin={contact.linkedin}
                    />
                </div>

                <div class="sidebar-card">
                    <h2 class="panel-title">Faglig fokus</h2>
                    <dl class="facts">
                        <div>
                            <dt>Rolle</dt>
                            <dd>Software Engineer · DNB</dd>
                        </div>
                        <div>
                            <dt>Arbeidsfelt</dt>
                            <dd>Sky, DevOps og arkitektur</dd>
                        </div>
                        <div>
                            <dt>Base</dt>
                            <dd>Oslo</dd>
                        </div>
                    </dl>
                </div>
            </div>
        </div>

        <div class="header-meta">
            <div class="portrait-wrap">
                <img
                    class="portrait"
                    src="{base}/profilebilde.png"
                    alt="Lars Christian Hovtun Palm"
                />
            </div>
        </div>
    </section>

    <section class="cv-grid">
        <section class="details" aria-label={$t.cvSection}>
            <ContentSwitch />
        </section>
    </section>
</main>

<style>
    .profile {
        width: min(1180px, calc(100% - 2rem));
        margin: 0 auto;
        padding: 2rem 0 4rem;
    }

    .document-header {
        display: grid;
        grid-template-columns: minmax(0, 1.2fr) minmax(320px, 0.75fr);
        gap: 1rem;
        align-items: start;
        padding-bottom: 1.5rem;
        margin: 0 0 1.5rem;
        border-bottom: 1px solid var(--border-color);
    }

    .header-copy {
        padding-right: 0.5rem;
    }

    .eyebrow {
        color: var(--primary-color);
        font-size: 0.82rem;
        font-weight: bold;
        letter-spacing: 0.18em;
        margin: 0 0 0.55rem;
        text-transform: uppercase;
    }

    h1 {
        font-size: clamp(2.35rem, 4.8vw, 3.5rem);
        line-height: 1.12;
        letter-spacing: -0.045em;
        margin: 0 0 0.85rem;
    }

    .summary {
        color: var(--text-muted);
        font-size: clamp(1.02rem, 1.9vw, 1.12rem);
        line-height: 1.62;
        margin: 0 0 1rem;
        max-width: 66ch;
    }

    .header-strip {
        display: grid;
        grid-template-columns: repeat(3, minmax(0, 1fr));
        gap: 0.9rem;
    }

    .header-meta {
        display: grid;
        gap: 0.9rem;
    }

    .portrait-wrap {
        padding: 0.75rem;
    }

    .portrait {
        width: 100%;
        aspect-ratio: 4 / 5;
        object-fit: cover;
        object-position: center;
        border-radius: 0.95rem;
        box-shadow: 0 10px 24px rgba(21, 45, 71, 0.14);
    }

    .sidebar-card {
        padding: 0.2rem 0.05rem 0.1rem;
    }

    .panel-title {
        color: var(--primary-color);
        font-size: 0.76rem;
        font-weight: bold;
        letter-spacing: 0.14em;
        margin: 0 0 0.8rem;
        text-transform: uppercase;
    }

    h2.panel-title {
        font: inherit;
        color: var(--primary-color);
        font-size: 0.76rem;
        font-weight: bold;
        letter-spacing: 0.14em;
        margin: 0 0 0.8rem;
        text-transform: uppercase;
    }

    .cv-grid {
        display: grid;
        grid-template-columns: minmax(0, 1fr);
        gap: 0;
    }

    .key-points {
        display: flex;
        flex-direction: column;
        gap: 0.55rem;
        list-style: none;
        margin: 0;
        padding: 0;
    }

    .key-points li {
        background: var(--tag-color);
        border: 1px solid
            color-mix(in srgb, var(--border-color) 65%, transparent);
        border-radius: 0.9rem;
        color: var(--primary-color);
        font-size: 0.92rem;
        font-weight: 700;
        padding: 0.68rem 0.8rem;
    }

    .facts {
        display: grid;
        gap: 0.8rem;
        margin: 0;
    }

    .facts dt {
        color: var(--text-muted);
        font-size: 0.74rem;
        font-weight: bold;
        letter-spacing: 0.12em;
        margin-bottom: 0.25rem;
        text-transform: uppercase;
    }

    .facts dd {
        color: var(--text-color);
        line-height: 1.45;
        margin: 0;
    }

    .details {
        min-width: 0;
        border-left: 1px solid var(--border-color);
        padding-left: 1rem;
    }

    @media (max-width: 720px) {
        .profile {
            padding-top: 1rem;
        }

        .document-header {
            grid-template-columns: 1fr;
        }

        .header-strip {
            grid-template-columns: 1fr;
        }

        .details {
            border-left: 0;
            padding-left: 0;
            border-top: 1px solid var(--border-color);
            padding-top: 1.5rem;
        }
    }
</style>
