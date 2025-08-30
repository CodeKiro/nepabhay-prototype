import { Extension } from "@tiptap/core";

// Custom Font Size Extension
export const FontSize = Extension.create({
  name: "fontSize",

  addOptions() {
    return {
      types: ["textStyle"],
    };
  },

  addGlobalAttributes() {
    return [
      {
        types: this.options.types,
        attributes: {
          fontSize: {
            default: null,
            parseHTML: (element: HTMLElement) => {
              const fontSize = element.style.fontSize;
              return fontSize ? fontSize.replace(/['"]+/g, "") : null;
            },
            renderHTML: (attributes: Record<string, unknown>) => {
              if (!attributes.fontSize) {
                return {};
              }
              return {
                style: `font-size: ${attributes.fontSize}`,
              };
            },
          },
        },
      },
    ];
  },

  addCommands() {
    return {
      setFontSize:
        (fontSize: string) =>
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        ({ chain }: any) => {
          return chain().setMark("textStyle", { fontSize }).run();
        },
      unsetFontSize:
        () =>
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        ({ chain }: any) => {
          return chain()
            .setMark("textStyle", { fontSize: null })
            .removeEmptyTextStyle()
            .run();
        },
    };
  },
});

// Custom Line Height Extension
export const LineHeight = Extension.create({
  name: "lineHeight",

  addOptions() {
    return {
      types: ["paragraph", "heading"],
    };
  },

  addGlobalAttributes() {
    return [
      {
        types: this.options.types,
        attributes: {
          lineHeight: {
            default: null,
            parseHTML: (element: HTMLElement) => {
              const lineHeight = element.style.lineHeight;
              return lineHeight || null;
            },
            renderHTML: (attributes: Record<string, unknown>) => {
              if (!attributes.lineHeight) {
                return {};
              }
              return {
                style: `line-height: ${attributes.lineHeight}`,
              };
            },
          },
        },
      },
    ];
  },

  addCommands() {
    return {
      setLineHeight:
        (lineHeight: string) =>
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        ({ chain }: any) => {
          return chain().updateAttributes("paragraph", { lineHeight }).run();
        },
      unsetLineHeight:
        () =>
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        ({ chain }: any) => {
          return chain()
            .updateAttributes("paragraph", { lineHeight: null })
            .run();
        },
    };
  },
});

// Custom Letter Spacing Extension
export const LetterSpacing = Extension.create({
  name: "letterSpacing",

  addOptions() {
    return {
      types: ["textStyle"],
    };
  },

  addGlobalAttributes() {
    return [
      {
        types: this.options.types,
        attributes: {
          letterSpacing: {
            default: null,
            parseHTML: (element: HTMLElement) => {
              const letterSpacing = element.style.letterSpacing;
              return letterSpacing || null;
            },
            renderHTML: (attributes: Record<string, unknown>) => {
              if (!attributes.letterSpacing) {
                return {};
              }
              return {
                style: `letter-spacing: ${attributes.letterSpacing}`,
              };
            },
          },
        },
      },
    ];
  },

  addCommands() {
    return {
      setLetterSpacing:
        (letterSpacing: string) =>
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        ({ chain }: any) => {
          return chain().setMark("textStyle", { letterSpacing }).run();
        },
      unsetLetterSpacing:
        () =>
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        ({ chain }: any) => {
          return chain()
            .setMark("textStyle", { letterSpacing: null })
            .removeEmptyTextStyle()
            .run();
        },
    } as Record<string, unknown>; // Type assertion to bypass TypeScript issues
  },
});
