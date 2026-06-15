<script lang="ts">
import type { Content, TDocumentDefinitions } from "pdfmake/interfaces";
import type { Experience } from "../types/experience";
import type { Education } from "../types/education";
import type { School } from "../types/school";
import type { Course } from "../types/techSkills";
import type { Publication } from "../types/publication";
import type { Reference } from "../types/reference";
import languagesNo from "../dataFiles/language.json";
import competenciesNo from "../dataFiles/kompetanse.json";
import publicationsNo from "../dataFiles/publications.json";
import referencesNo from "../dataFiles/references.json";
import techStack from "../dataFiles/techstack.json";
    import schoolsNo from "../dataFiles/schools.json";
    import educationNo from "../dataFiles/education.json";
    import experienceNo from "../dataFiles/experience.json";
    import personalJson from "../dataFiles/contactInfo.json";
    import { t } from "../stores/i18n";

    $: tr = $t;
    let preparingPdf = false;

    const compact = (items: Array<Content | undefined>): Content[] =>
        items.filter((item): item is Content => item !== undefined);

    const formatPeriod = (from: string, to: string, current: boolean) =>
        current
            ? `${from} – ${to}`
            : !to || from === to
              ? from
              : `${from} – ${to}`;

    const formatCourse = (course: Course) =>
        `${course.name} — ${course.institution} (${course.date})${
            course.description ? `: ${course.description}` : ""
        }`;

    const formatPublication = (publication: Publication) =>
        `${String(publication.title)}. ${String(publication.authors)}. ${String(publication.journal)} ${String(publication.year)}${
            publication.volume ? `, ${String(publication.volume)}` : ""
        }${publication.issue ? `(${String(publication.issue)})` : ""}${
            publication.pages ? `, ${String(publication.pages)}` : ""
        }${publication.doi ? `; https://doi.org/${String(publication.doi)}` : ""}`;

    const formatReference = (reference: Reference) =>
        `${reference.name}, ${reference.title}, ${reference.institution}, ${reference.phone}`;

    const resolveVirtualFileSystem = (
        fonts: unknown,
    ): Record<string, string> => {
        const wrappedFonts = fonts as { vfs?: Record<string, string> };

        return wrappedFonts.vfs ?? (fonts as Record<string, string>);
    };

    const generatePDF = async () => {
        preparingPdf = true;
        try {
            const [{ default: pdfMake }, { default: pdfFonts }] =
                await Promise.all([
                    import("pdfmake/build/pdfmake.js"),
                    import("pdfmake/build/vfs_fonts.js"),
                ]);

            pdfMake.vfs = resolveVirtualFileSystem(pdfFonts);

            const educationEntries: Education[] = Object.values(educationNo);
            const experiences: Experience[] =
                experienceNo.erfaring as Experience[];
            const schools = schoolsNo;
            const languages = languagesNo;
            const competencies = competenciesNo;
            const publications = publicationsNo as Publication[];
            const references = referencesNo as Reference[];
            const courses = techStack.courses as Course[];

            const docDefinition: TDocumentDefinitions = {
                info: {
                    title: "CV – Hans Olav Hovtun Palm",
                    author: personalJson.name,
                    subject: "Curriculum Vitae",
                    keywords:
                        "Hans Olav Hovtun Palm, CV, organisk kjemi, FMA, FFI",
                    creator: "min-cv",
                    producer: "pdfmake",
                    creationDate: new Date(),
                    modDate: new Date(),
                },
                content: [
                    { text: personalJson.name, style: "header" },
                    {
                    text: `
${personalJson.email} | ${personalJson.phone}
LinkedIn: ${personalJson.linkedin}`,
                        style: "personalInfo",
                        margin: [0, 0, 0, 10],
                    },

                    { text: tr.pdfExperience, style: "sectionHeader" },

                    ...experiences.map(
                        (exp: Experience): Content => ({
                            stack: compact([
                                {
                                    text: `${exp.role} — ${exp.company}`,
                                    style: "subHeader",
                                },
                                {
                                    text: `${exp.department ? `${exp.department}, ` : ""}${formatPeriod(
                                        exp.from,
                                        exp.current ? tr.present : exp.to,
                                        exp.current,
                                    )}`,
                                    margin: [0, 0, 0, 4],
                                },

                                exp.accomplishments?.length
                                    ? {
                                          stack: [
                                              {
                                                  text: tr.accomplishments,
                                                  bold: true,
                                              },
                                              {
                                                  text: exp.accomplishments
                                                      .map(
                                                          (item) => `• ${item}`,
                                                      )
                                                      .join("\n"),
                                                  margin: [10, 0, 0, 4],
                                              },
                                          ],
                                      }
                                    : undefined,

                                exp.comments?.length
                                    ? {
                                          stack: [
                                              { text: tr.comments, bold: true },
                                              {
                                                  text: exp.comments
                                                      .map(
                                                          (comment) =>
                                                              `• ${comment}`,
                                                      )
                                                      .join("\n"),
                                                  margin: [10, 0, 0, 4],
                                              },
                                          ],
                                      }
                                    : undefined,

                                exp.remarks?.length
                                    ? {
                                          stack: [
                                              { text: tr.remarks, bold: true },
                                              {
                                                  text: exp.remarks.join(", "),
                                                  italics: true,
                                                  margin: [10, 0, 0, 6],
                                              },
                                          ],
                                      }
                                    : undefined,
                            ]),
                            margin: [0, 2, 0, 6],
                        }),
                    ),

                    { text: tr.pdfPublications, style: "sectionHeader" },

                    {
                        ul: publications.map(formatPublication),
                        margin: [0, 0, 0, 10],
                    },

                    { text: tr.pdfEducation, style: "sectionHeader" },

                    ...educationEntries.map(
                        (edu: Education): Content => ({
                            stack: compact([
                                {
                                    text: `${edu.name} (${edu.type})`,
                                    style: "subHeader",
                                },
                                {
                                    text: `${edu.school} (${edu.from} – ${edu.to})`,
                                    margin: [0, 0, 0, 3],
                                },
                                edu.subjects.length
                                    ? {
                                          text: `${tr.topics}: ${edu.subjects.join(", ")}`,
                                          margin: [0, 0, 0, 3],
                                      }
                                    : undefined,
                                edu.thesis
                                    ? {
                                          text: `${tr.pdfThesis}: ${edu.thesis.name} – ${edu.thesis.subTitle}`,
                                          italics: true,
                                      }
                                    : undefined,
                                edu.thesis?.topics?.length
                                    ? {
                                          text: `${tr.pdfTopic}: ${edu.thesis.topics.join(", ")}`,
                                          margin: [0, 0, 0, 6],
                                      }
                                    : undefined,
                            ]),
                            margin: [0, 3, 0, 6],
                        }),
                    ),

                    { text: tr.pdfSchool, style: "sectionHeader" },

                    {
                        stack: schools.schools.map(
                            (school: School): Content => ({
                                stack: compact([
                                    {
                                        text: `${school.name} (${school.type}) — ${school.from}–${school.to}`,
                                    },
                                    school.fordypning
                                        ? {
                                              text: `${tr.pdfFordypning}: ${school.fordypning}`,
                                              margin: [20, 2, 0, 4],
                                          }
                                        : undefined,
                                ]),
                                margin: [0, 0, 0, 6],
                            }),
                        ),
                        margin: [0, 0, 0, 10],
                    },

                    {
                        columns: [
                            {
                                width: "*",
                                stack: [
                                    {
                                        text: tr.pdfLang,
                                        style: "sectionHeader",
                                    },
                                    {
                                        ul: languages.map(
                                            (language) =>
                                                `${language.name}: ${language.level}`,
                                        ),
                                    },
                                ],
                            },
                            {
                                width: "*",
                                stack: [
                                    {
                                        text: tr.pdfOtherComp,
                                        style: "sectionHeader",
                                    },
                                    { ul: competencies },
                                ],
                            },
                        ],
                        columnGap: 20,
                        margin: [0, 0, 0, 10],
                    },

                    { text: tr.pdfSkills, style: "sectionHeader" },

                    {
                        columns: [
                            {
                                width: "*",
                                stack: [
                                    { text: tr.pdfProgramming, bold: true },
                                    { ul: techStack.programming },
                                ],
                            },
                            {
                                width: "*",
                                stack: [
                                    { text: "Kjemifaglig", bold: true },
                                    { ul: techStack.analysisMethods },
                                ],
                            },
                            {
                                width: "*",
                                stack: [
                                    { text: "ERP-Systemer", bold: true },
                                    { ul: techStack.systems },
                                ],
                            },
                            {
                                width: "*",
                                stack: [
                                    {
                                        text: "Annet",
                                        bold: true,
                                        margin: [0, 6, 0, 0],
                                    },
                                    { ul: techStack.other },
                                ],
                            },
                        ],
                        columnGap: 15,
                        margin: [0, 0, 0, 10],
                    },

                    {
                        stack: [
                            { text: tr.pdfCourses, style: "sectionHeader" },
                            { ul: courses.map(formatCourse) },
                        ],
                        margin: [0, 0, 0, 10],
                    },

                    { text: tr.pdfReferences, style: "sectionHeader" },

                    {
                        ul: references.map(formatReference),
                        margin: [0, 0, 0, 10],
                    },
                ],
                styles: {
                    header: {
                        fontSize: 22,
                        bold: true,
                        alignment: "center",
                        margin: [0, 0, 0, 8],
                    },
                    personalInfo: {
                        fontSize: 10,
                        alignment: "center",
                        color: "#555",
                    },
                    sectionHeader: {
                        fontSize: 15,
                        bold: true,
                        margin: [0, 10, 0, 5],
                    },
                    subHeader: {
                        fontSize: 12,
                        bold: true,
                    },
                },
                defaultStyle: {
                    fontSize: 10,
                    lineHeight: 1.3,
                },
            };

            pdfMake.createPdf(docDefinition).download("CV_HansPalm.pdf");
        } finally {
            preparingPdf = false;
        }
    };
</script>

<button
    type="button"
    on:click={generatePDF}
    class="pdf-btn"
    disabled={preparingPdf}
>
    {preparingPdf ? $t.pdfPreparing : $t.pdfButton}
</button>

<style>
    .pdf-btn {
        border: 1px solid var(--primary-color);
        border-radius: 0.65rem;
        background: var(--primary-color);
        color: #07140f;
        cursor: pointer;
        font-weight: bold;
        padding: 0.72rem 1.15rem;
        transition:
            background-color 0.2s ease,
            border-color 0.2s ease,
            color 0.2s ease;
    }

    .pdf-btn:hover,
    .pdf-btn:focus-visible {
        background-color: var(--primary-hover);
        border-color: var(--primary-hover);
        color: #07140f;
    }

    .pdf-btn:disabled {
        cursor: wait;
        opacity: 0.72;
    }
</style>
