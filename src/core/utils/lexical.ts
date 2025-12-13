/**
 * Helper to create Lexical richText content from plain text
 */
export function createRichText(text: string) {
  return {
    root: {
      type: "root",
      format: "" as const,
      indent: 0,
      version: 1,
      children: [
        {
          type: "paragraph",
          format: "" as const,
          indent: 0,
          version: 1,
          children: [
            {
              type: "text",
              format: 0,
              detail: 0,
              mode: "normal" as const,
              style: "",
              text,
              version: 1,
            },
          ],
          direction: "ltr" as const,
        },
      ],
      direction: "ltr" as const,
    },
  };
}

/**
 * Helper to create Lexical richText with multiple paragraphs
 */
export function createRichTextParagraphs(paragraphs: string[]) {
  return {
    root: {
      type: "root",
      format: "" as const,
      indent: 0,
      version: 1,
      children: paragraphs.map((text) => ({
        type: "paragraph",
        format: "" as const,
        indent: 0,
        version: 1,
        children: [
          {
            type: "text",
            format: 0,
            detail: 0,
            mode: "normal" as const,
            style: "",
            text,
            version: 1,
          },
        ],
        direction: "ltr" as const,
      })),
      direction: "ltr" as const,
    },
  };
}
