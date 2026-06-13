<script lang="ts">
  let dialog: HTMLDialogElement;
  let trigger: HTMLButtonElement;

  const openModal = () => {
    dialog.showModal();
  };

  const closeModal = () => {
    dialog.close();
  };

  const handleBackdropClick = (event: MouseEvent) => {
    if (event.target === dialog) {
      closeModal();
    }
  };

  const handleKeydown = (event: KeyboardEvent) => {
    if (event.key === "Escape") {
      event.preventDefault();
      closeModal();
    }
  };

  const restoreFocus = () => {
    trigger.focus();
  };
</script>

<button
  bind:this={trigger}
  class="privacy-link"
  type="button"
  on:click={openModal}
>
  Personvern
</button>

<dialog
  bind:this={dialog}
  class="privacy-modal"
  aria-labelledby="privacy-title"
  on:click={handleBackdropClick}
  on:keydown={handleKeydown}
  on:close={restoreFocus}
>
  <article class="privacy-page">
    <header>
      <div>
        <p class="eyebrow">Palmtech</p>
        <h2 id="privacy-title">Personvern for CV-siden</h2>
        <p class="updated">Sist oppdatert: 25. mai 2026</p>
      </div>
      <button
        class="close"
        type="button"
        aria-label="Lukk personvern"
        on:click={closeModal}
      >
        &times;
      </button>
    </header>

    <section>
      <h3>Kort forklart</h3>
      <p>
        Denne CV-siden viser offentlig yrkesinformasjon om Hans Olav Hovtun
        Palm. Du fyller ikke inn eller laster opp personopplysninger på siden,
        og Palmtech mottar ikke opplysninger om deg gjennom
        CV-funksjonaliteten.
      </p>
    </section>

    <section>
      <h3>Hvem er ansvarlig?</h3>
      <p>
        Palmtech er ansvarlig for nettstedet. Spørsmål om personvern kan meldes
        via kontaktinformasjonen i CV-en.
      </p>
    </section>

    <section>
      <h3>Opplysninger som vises i tjenesten</h3>
      <p>
        Nettstedet publiserer CV-opplysninger om sidens eier, blant annet navn,
        kontaktinformasjon, utdanning, arbeidserfaring og teknisk kompetanse.
      </p>
      <p>
        Formålet er å presentere en profesjonell CV og gjøre en PDF-versjon
        tilgjengelig for nedlasting.
      </p>
    </section>

    <section>
      <h3>Hvordan opplysninger behandles</h3>
      <ul>
        <li>CV-innholdet er en del av det offentlig publiserte nettstedet.</li>
        <li>
          Når du velger å laste ned PDF, genereres filen lokalt i nettleseren
          fra det samme publiserte CV-innholdet.
        </li>
        <li>
          Lenker til eksterne tjenester tar deg videre til egne
          personvernregler.
        </li>
      </ul>
    </section>

    <section>
      <h3>Lagring, cookies og statistikk</h3>
      <p>
        Nettstedet bruker ikke cookies eller analyseverktøy. Siden vises alltid
        på norsk og i mørk modus, uten at slike valg lagres i nettleserens
        lokale lagring.
      </p>
    </section>

    <section>
      <h3>Dine valg og rettigheter</h3>
      <p>Nettstedet ber deg ikke om å oppgi personopplysninger.</p>
      <p>
        Dersom du mener at behandling av personopplysninger ikke er i tråd med
        personvernreglene, kan du kontakte Palmtech eller klage til
        <a href="https://www.datatilsynet.no/">Datatilsynet</a>.
      </p>
    </section>
  </article>
</dialog>

<style>
  .privacy-link {
    border: 0;
    background: transparent;
    color: var(--primary-color);
    cursor: pointer;
    font-size: 0.9rem;
    padding: 0.55rem 0.25rem;
    text-decoration: underline;
    text-underline-offset: 0.2em;
  }

  .privacy-link:hover,
  .privacy-link:focus-visible {
    color: var(--primary-hover);
  }

  .privacy-modal {
    width: min(52rem, calc(100% - 2rem));
    max-height: min(88vh, 58rem);
    margin: auto;
    padding: 0;
    border: 1px solid var(--border-color);
    border-radius: 1.25rem;
    background: var(--surface-color);
    color: var(--text-color);
    box-shadow: 0 1.25rem 3.5rem rgba(0, 0, 0, 0.25);
  }

  .privacy-modal::backdrop {
    background: rgba(10, 19, 30, 0.6);
  }

  .privacy-page {
    overflow-y: auto;
    max-height: min(88vh, 58rem);
    padding: clamp(1.15rem, 4vw, 2.25rem);
  }

  header {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: 1rem;
    padding-bottom: clamp(1rem, 3vw, 1.4rem);
    margin-bottom: clamp(1.2rem, 4vw, 1.7rem);
    border-bottom: 1px solid var(--border-color);
  }

  .eyebrow {
    color: var(--primary-color);
    font-size: 0.8rem;
    font-weight: bold;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    margin: 0 0 0.5rem;
  }

  h2 {
    color: var(--text-color);
    font-size: clamp(1.45rem, 5vw, 2rem);
    line-height: 1.2;
    margin: 0 0 0.55rem;
  }

  .updated {
    color: var(--text-muted);
    margin: 0;
    font-size: 0.92rem;
  }

  .close {
    flex: 0 0 auto;
    border: 1px solid var(--border-color);
    border-radius: 999px;
    background: var(--surface-muted);
    color: var(--text-muted);
    cursor: pointer;
    font-size: 1.35rem;
    line-height: 1;
    padding: 0.35rem 0.58rem;
  }

  .close:hover,
  .close:focus-visible {
    border-color: var(--primary-color);
    color: var(--primary-color);
  }

  section + section {
    margin-top: clamp(1.2rem, 3vw, 1.55rem);
  }

  h3 {
    color: var(--text-color);
    font-size: clamp(1.05rem, 3vw, 1.2rem);
    margin: 0 0 0.55rem;
  }

  p,
  li {
    color: var(--text-muted);
    font-size: 0.98rem;
    line-height: 1.65;
  }

  p {
    margin: 0.5rem 0 0;
  }

  ul {
    display: flex;
    flex-direction: column;
    gap: 0.45rem;
    padding-left: 1.25rem;
    margin: 0.6rem 0 0;
  }

  a {
    color: var(--primary-color);
    text-underline-offset: 0.2em;
  }

  a:hover {
    color: var(--primary-hover);
  }

  a:focus-visible,
  .privacy-link:focus-visible,
  .close:focus-visible {
    outline: 2px solid var(--primary-color);
    outline-offset: 3px;
  }

  code {
    font-size: 0.94em;
  }
</style>
