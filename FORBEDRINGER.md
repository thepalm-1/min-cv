# Forbedringer for CV-nettside og PDF

Dokumentet er basert på vurdering av den publiserte nettsiden pa
`https://cv.palmtech.no/` den 25. mai 2026. Hovedmalet er en profesjonell
CV-nettside for desktop, med en mobilvisning som fungerer uten avkuttet eller
utilgjengelig innhold.

## Prioritering

| Prioritet | Omrade | Tiltak | Hvorfor |
| --- | --- | --- | --- |
| Kritisk | Tillit | Fjern `notesForAI` og all agentrettet instruksjon fra strukturert data i siden. Behold eventuelt ordinart `Person`-schema. | Skjult pavirkningsforsok kan diskvalifisere kandidaten ved manuell eller automatisk gjennomgang. |
| Kritisk | Mobil | Rett horisontal overflow i toppseksjonen, profilbildet og fanene. Test ved minst 360 px og 390 px bredde. | Den publiserte mobilvisningen kutter bilde og innhold. |
| Hoy | Forsteinntrykk | Lag en hero-seksjon med navn, `Software Engineer`, navarende arbeidsgiver, kort faglig profil og synlig PDF-knapp. | Rekrutterer ma forsta rolle og relevans umiddelbart pa desktop. |
| Hoy | Informasjonshierarki | Vis `Erfaring` som standardseksjon, med DNB-rollene forst. Flytt utdanning etter erfaring og ferdigheter. | Yrkeserfaring er sterkeste signal for aktuelle utviklerroller. |
| Hoy | Kontakt | Vis e-post og LinkedIn direkte i toppen uten at kontaktkortet ma apnes. | Reduserer friksjon nar en rekrutterer vil kontakte eller verifisere kandidaten. |
| Hoy | Innhold | Prioriter hoyere utdanning i nettsidevisningen. PDF-innhold og PDF-layout beholdes utover korrektur og sprakvalg. | Nettsiden kan presentere mest relevant innhold forst uten a endre PDF-dokumentets struktur. |
| Hoy | Sprakkvalitet | Korrekturles alle tekster og teknologinavn. | Skrivefeil svekker profesjonalitet og detaljtillit. |
| Middels | UI-design | Bytt sterke rod/bla knapper og tunge gra accordions med roligere farger, mer luft og tydelige seksjonskort. | Det gir et mer profesjonelt desktop-uttrykk. |
| Middels | Tilgjengelighet | Bruk ekte `button`-elementer for ekspanderbart innhold og legg til `aria-expanded`/`aria-controls`. | Dagens klikkbare `div`-elementer fungerer ikke godt med tastatur eller hjelpemidler. |
| Middels | Sprakvalg | Enten oversett alt innhold til engelsk ved valg av engelsk, eller fjern sprakvelgeren inntil dataene er tospraklige. | Et delvis oversatt CV gir et uferdig inntrykk. |
| Middels | PDF | Behold eksisterende PDF-layout, og begrens endringer til korrektur, sprakvalg og teknisk stabilitet. | PDF-en skal ikke omdesignes som del av UI-arbeidet. |
| Lav | SEO/metadata | Legg til dokumenttittel, metabeskrivelse og ryddig faglig strukturert data. | Gir bedre deling, soketreff og profesjonell presentasjon. |

## Foreslatt desktop-oppsett

Desktop er primarflaten. En anbefalt rekkefolge er:

1. Toppfelt med navn, rolle, kort profiltekst, kontaktlenker og `Last ned PDF`.
2. Profilbilde pa hoyre side av toppfeltet, med balansert storrelse.
3. Arbeidserfaring som forste hovedseksjon, apen og lesbar uten ekstra klikk.
4. Teknisk kjernekompetanse, gruppert i et begrenset antall relevante kategorier.
5. Hoyere utdanning og masteroppgave.
6. Sprak og eventuell tilleggsinformasjon nederst.

### Visuell retning

- Bruk en maksimal innholdsbredde pa omtrent `1040-1120px`.
- Bruk en noytral bakgrunn, hvite/rolige kort og en dempet aksentfarge.
- Unnga at hver informasjonsbit er skjult i accordions pa desktop.
- Bruk korte avsnitt og punkter som er enkle a skanne.

## Mobilkrav

Mobil er sekundart, men skal vaere fullt brukbart:

- Ingen horisontal scrolling ved `360px` eller bredere skjerm.
- Hero-seksjonen skal stables i en kolonne; profilbildet skal skalere innenfor viewport.
- Kontaktlenker og PDF-knapp skal kunne trykkes uten zoom.
- Navigasjon/faner skal brytes over flere linjer eller erstattes med vertikal navigasjon.
- Alle kort skal bruke `width: 100%` med innvendig luft, ikke faste bredder som overstiger skjermen.

## Innhold som bor korrekturleses

Eksempler observert i publisert innhold:

| Naverende tekst/navn | Foreslatt retting |
| --- | --- |
| `Fullørte` | `Fullførte` |
| `Opptimaliserte` | `Optimaliserte` |
| `resurser` / `resursbanken` | `ressurser` / `Ressursbanken` |
| `Instititut` | `Institutt` |
| `ausust` | `august` |
| `Emerging techonologies` | `Emerging Technologies` |
| `digital innvoasjon` | `digital innovasjon` |
| `antatomi` / `stryketrening` | `anatomi` / `styrketrening` |
| `progammering` | `programmering` |
| `vidergående` | `videregående` |
| `Avedling` | `Avdeling` |
| `Skyplatformer` | `Skyplattformer` |
| `SglServer` | `SQL Server` |
| `Paramter Store` | `Parameter Store` |
| `Promethious` | `Prometheus` |
| `Cloud formation` | `CloudFormation` |
| `CI-verktoy` | `Automatiserte bygge- og distribusjonsverktoy` |

## PDF-avgrensning

PDF-layouten beholdes. Utbedringer i PDF-en begrenses til:

1. Rette skrivefeil og teknologinavn i eksisterende innhold.
2. La norsk-/engelskvalget bytte tekst uten a endre dokumentets struktur.
3. Sikre at PDF-generatoren bestar TypeScript-/byggekontroll.

## Akseptansekriterier ved senere utbedring

- Ingen skjult AI-/agentinstruksjon finnes i kildekode eller bygget `docs`-innhold.
- Desktop startsiden viser rolle, profil, kontakt, PDF og erfaring uten at brukeren ma apne skolefanen.
- Ved `390px` bredde er intet synlig innhold avkuttet.
- `npm run check` og `npm run build` fullforer uten feil; nye kildefiler bestar lintkontroll.
- Publisert `cv.palmtech.no` inneholder den forbedrede utgaven etter deploy.
