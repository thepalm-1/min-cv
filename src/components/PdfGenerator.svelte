<script lang="ts">
    import type { Content, TDocumentDefinitions } from "pdfmake/interfaces";
    import type { Experience } from "../types/experience";
    import type { Education } from "../types/education";
    import type { School } from "../types/school";
    import languagesNo from "../dataFiles/language.json";
    import competenciesNo from "../dataFiles/kompetanse.json";
    import techStack from "../dataFiles/techStack.json";
    import schoolsNo from "../dataFiles/schools.json";
    import educationNo from "../dataFiles/education.json";
    import experienceNo from "../dataFiles/experience.json";
    import personalJson from "../dataFiles/contactInfo.json";
    import { t } from "../stores/i18n";

    $: tr = $t;
    let preparingPdf = false;

    const compact = (items: Array<Content | undefined>): Content[] =>
        items.filter((item): item is Content => item !== undefined);

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

            const docDefinition: TDocumentDefinitions = {
                info: {
                    title: "CV – Hans Palm",
                    author: personalJson.name,
                    subject: "Curriculum Vitae",
                    keywords: "TBA",
                    creator: "min-cv",
                    producer: "pdfmake",
                    creationDate: new Date(),
                    modDate: new Date(),
                },
                content: [
                    { text: personalJson.name, style: "header" },
                    {
                        text: `${personalJson.email} | ${personalJson.phone}
GitHub: ${personalJson.github}
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
                                    text: `${exp.department ? `${exp.department}, ` : ""}${exp.from} – ${exp.current ? tr.present : exp.to}`,
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
                                    { text: "Frameworks", bold: true },
                                    { ul: techStack.framework },
                                ],
                            },
                            {
                                width: "*",
                                stack: [
                                    { text: "Database", bold: true },
                                    { ul: techStack.database },
                                    {
                                        text: "CI/CD",
                                        bold: true,
                                        margin: [0, 6, 0, 0],
                                    },
                                    { ul: techStack.cicd },
                                ],
                            },
                            {
                                width: "*",
                                stack: [
                                    { text: "IaC", bold: true },
                                    { ul: techStack.iac },
                                    {
                                        text: "Observability",
                                        bold: true,
                                        margin: [0, 6, 0, 0],
                                    },
                                    { ul: techStack.observability },
                                    {
                                        text: "Other",
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

                    { text: tr.pdfCloud, style: "sectionHeader" },

                    {
                        columns: techStack.clouds.map((cloud) => ({
                            stack: [
                                { text: cloud.name, bold: true },
                                { text: cloud.resources.join(", ") },
                            ],
                        })),
                        columnGap: 20,
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

            pdfMake.createPdf(docDefinition).download("CV_LarsPalm.pdf");
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
