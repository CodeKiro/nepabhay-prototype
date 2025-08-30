"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { TextStyle } from "@tiptap/extension-text-style";
import { Color } from "@tiptap/extension-color";
import { TextAlign } from "@tiptap/extension-text-align";
import { Image } from "@tiptap/extension-image";
import { Link } from "@tiptap/extension-link";
import { Table } from "@tiptap/extension-table";
import { TableRow } from "@tiptap/extension-table-row";
import { TableHeader } from "@tiptap/extension-table-header";
import { TableCell } from "@tiptap/extension-table-cell";
import { Heading } from "@tiptap/extension-heading";
import { Underline } from "@tiptap/extension-underline";
import { Superscript } from "@tiptap/extension-superscript";
import { Subscript } from "@tiptap/extension-subscript";
import { Highlight } from "@tiptap/extension-highlight";
import { CodeBlock } from "@tiptap/extension-code-block";
import { Typography } from "@tiptap/extension-typography";
import { FontFamily } from "@tiptap/extension-font-family";
import { useState } from "react";
import { FileText, Code2 } from "lucide-react";

// Import our custom components and utilities
import { FontSize, LineHeight, LetterSpacing } from "./tiptap/extensions";
import {
  htmlToMarkdown,
  markdownToHtml,
  normalizeMarkdown,
  normalizeHtml,
} from "./tiptap/conversions";
import { EditorToolbar } from "./tiptap/EditorToolbar";
import { TableModal } from "./tiptap/TableModal";
import { editorStyles } from "./tiptap/styles";

interface TiptapEditorProps {
  content: string;
  onChange: (content: string) => void;
  placeholder?: string;
}

export function TiptapEditor({
  content,
  onChange,
  placeholder,
}: TiptapEditorProps) {
  const [isMarkdownMode, setIsMarkdownMode] = useState(false);
  const [isHtmlMode, setIsHtmlMode] = useState(false);
  const [showTableModal, setShowTableModal] = useState(false);
  const [tableRows, setTableRows] = useState("3");
  const [tableCols, setTableCols] = useState("3");
  const [tableWithHeader, setTableWithHeader] = useState(true);

  const toggleMarkdownMode = () => {
    if (isHtmlMode) {
      // Switch from HTML mode to Markdown mode
      setIsHtmlMode(false);
      setIsMarkdownMode(true);
      const markdownContent = normalizeMarkdown(htmlToMarkdown(content));
      onChange(markdownContent);
    } else if (!isMarkdownMode) {
      // Switch from rich text to markdown mode
      const markdownContent = normalizeMarkdown(
        htmlToMarkdown(editor?.getHTML() || "")
      );
      setIsMarkdownMode(true);
      onChange(markdownContent);
    } else {
      // Switch back to rich text mode
      const htmlContent = normalizeHtml(markdownToHtml(content));
      setIsMarkdownMode(false);
      editor?.commands.setContent(htmlContent);
    }
  };

  const toggleHtmlMode = () => {
    if (isMarkdownMode) {
      // Switch from Markdown mode to HTML mode
      setIsMarkdownMode(false);
      setIsHtmlMode(true);
      const htmlContent = normalizeHtml(markdownToHtml(content));
      onChange(htmlContent);
    } else if (!isHtmlMode) {
      // Switch from rich text to HTML mode
      setIsHtmlMode(true);
      onChange(normalizeHtml(editor?.getHTML() || ""));
    } else {
      // Switch back to rich text mode
      setIsHtmlMode(false);
      editor?.commands.setContent(content);
    }
  };

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        bulletList: {
          keepMarks: true,
          keepAttributes: false,
        },
        orderedList: {
          keepMarks: true,
          keepAttributes: false,
        },
        blockquote: {
          HTMLAttributes: {
            class: "border-l-4 border-gray-300 pl-4 italic",
          },
        },
        heading: false, // We'll use the separate Heading extension
      }),
      Heading.configure({
        levels: [1, 2, 3, 4, 5, 6],
        HTMLAttributes: {
          class: "heading-styles",
        },
      }),
      TextStyle,
      FontSize,
      LineHeight,
      LetterSpacing,
      FontFamily.configure({
        types: ["textStyle"],
      }),
      Color.configure({
        types: ["textStyle"],
      }),
      Underline,
      Superscript,
      Subscript,
      Highlight.configure({
        multicolor: true,
      }),
      CodeBlock.configure({
        HTMLAttributes: {
          class: "bg-gray-100 rounded p-4 font-mono text-sm",
        },
      }),
      Typography,
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
      Image.configure({
        HTMLAttributes: {
          class: "rounded-lg max-w-full h-auto",
        },
      }),
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: "text-blue-600 hover:text-blue-800 underline",
        },
      }),
      Table.configure({
        resizable: true,
        HTMLAttributes: {
          class: "tiptap-table",
        },
      }),
      TableRow.configure({
        HTMLAttributes: {
          class: "tiptap-table-row",
        },
      }),
      TableHeader.configure({
        HTMLAttributes: {
          class: "tiptap-table-header",
        },
      }),
      TableCell.configure({
        HTMLAttributes: {
          class: "tiptap-table-cell",
        },
      }),
    ],
    content,
    immediatelyRender: false,
    onUpdate: ({ editor }) => {
      if (!isMarkdownMode && !isHtmlMode) {
        onChange(normalizeHtml(editor.getHTML()));
      }
    },
    editorProps: {
      attributes: {
        class:
          "prose prose-sm sm:prose lg:prose-lg xl:prose-2xl mx-auto focus:outline-none min-h-[200px] p-4 tiptap-editor",
        placeholder: placeholder || "Start writing your content...",
      },
    },
  });

  if (!editor) {
    return null;
  }

  const addImage = () => {
    const url = window.prompt("Enter image URL:");
    if (url) {
      editor.chain().focus().setImage({ src: url }).run();
    }
  };

  const addLink = () => {
    const url = window.prompt("Enter URL:");
    if (url) {
      editor
        .chain()
        .focus()
        .extendMarkRange("link")
        .setLink({ href: url })
        .run();
    }
  };

  const insertTable = () => {
    setShowTableModal(true);
  };

  const handleTableInsert = () => {
    const numRows = parseInt(tableRows, 10);
    const numCols = parseInt(tableCols, 10);

    if (numRows > 0 && numCols > 0 && numRows <= 20 && numCols <= 10) {
      editor
        .chain()
        .focus()
        .insertTable({
          rows: numRows,
          cols: numCols,
          withHeaderRow: tableWithHeader,
        })
        .run();
      setShowTableModal(false);
    }
  };

  const setColor = (color: string) => {
    const { from, to } = editor.state.selection;
    editor.chain().focus().setColor(color).setTextSelection({ from, to }).run();
  };

  const setFontSize = (fontSize: string) => {
    if (fontSize) {
      // Get current selection first
      const { from, to } = editor.state.selection;
      editor
        .chain()
        .focus()
        .setFontSize(fontSize)
        .setTextSelection({ from, to })
        .run();
    } else {
      const { from, to } = editor.state.selection;
      editor
        .chain()
        .focus()
        .unsetFontSize()
        .setTextSelection({ from, to })
        .run();
    }
  };

  const setFontFamily = (fontFamily: string) => {
    const { from, to } = editor.state.selection;
    if (fontFamily) {
      editor
        .chain()
        .focus()
        .setFontFamily(fontFamily)
        .setTextSelection({ from, to })
        .run();
    }
  };

  const setLineHeight = (lineHeight: string) => {
    if (lineHeight) {
      const { from, to } = editor.state.selection;
      // Apply line height directly to paragraph attributes
      editor
        .chain()
        .focus()
        .updateAttributes("paragraph", {
          lineHeight: lineHeight,
        })
        .setTextSelection({ from, to })
        .run();
    }
  };

  const setLetterSpacing = (letterSpacing: string) => {
    if (letterSpacing && letterSpacing !== "normal") {
      const { from, to } = editor.state.selection;
      // Apply letter spacing to text style
      editor
        .chain()
        .focus()
        .setMark("textStyle", {
          letterSpacing: letterSpacing,
        })
        .setTextSelection({ from, to })
        .run();
    } else {
      const { from, to } = editor.state.selection;
      // Remove letter spacing
      editor
        .chain()
        .focus()
        .unsetMark("textStyle")
        .setTextSelection({ from, to })
        .run();
    }
  };

  return (
    <>
      <div className="border border-gray-300 rounded-lg overflow-hidden focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-200">
        <style dangerouslySetInnerHTML={{ __html: editorStyles }} />

        {/* Toolbar */}
        <EditorToolbar
          editor={editor}
          isMarkdownMode={isMarkdownMode}
          isHtmlMode={isHtmlMode}
          toggleMarkdownMode={toggleMarkdownMode}
          toggleHtmlMode={toggleHtmlMode}
          addImage={addImage}
          addLink={addLink}
          insertTable={insertTable}
          setColor={setColor}
          setFontSize={setFontSize}
          setFontFamily={setFontFamily}
          setLineHeight={setLineHeight}
          setLetterSpacing={setLetterSpacing}
        />

        {/* Editor Content */}
        <div className="min-h-[300px] bg-white">
          {isMarkdownMode ? (
            <textarea
              value={content}
              onChange={(e) => onChange(e.target.value)}
              placeholder={placeholder || "Start writing in Markdown..."}
              className="w-full h-[300px] p-4 font-mono text-sm border-none outline-none resize-none"
            />
          ) : isHtmlMode ? (
            <textarea
              value={content}
              onChange={(e) => onChange(e.target.value)}
              placeholder={placeholder || "Start writing HTML..."}
              className="w-full h-[300px] p-4 font-mono text-sm border-none outline-none resize-none"
            />
          ) : (
            <EditorContent editor={editor} />
          )}
        </div>

        {/* Mode Information */}
        {isMarkdownMode && (
          <div className="border-t border-gray-300 bg-gray-50 p-2">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <FileText className="h-4 w-4" />
              <span>
                Markdown Mode: Use **bold**, *italic*, # Heading, - List,
                [link](url), ![image](url), etc.
              </span>
            </div>
          </div>
        )}

        {isHtmlMode && (
          <div className="border-t border-gray-300 bg-gray-50 p-2">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Code2 className="h-4 w-4" />
              <span>
                HTML Mode: Use &lt;strong&gt;, &lt;em&gt;,
                &lt;h1&gt;-&lt;h6&gt;, &lt;ul&gt;, &lt;ol&gt;, &lt;a&gt;,
                &lt;img&gt;, etc.
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Table Insert Modal */}
      <TableModal
        showTableModal={showTableModal}
        setShowTableModal={setShowTableModal}
        tableRows={tableRows}
        setTableRows={setTableRows}
        tableCols={tableCols}
        setTableCols={setTableCols}
        tableWithHeader={tableWithHeader}
        setTableWithHeader={setTableWithHeader}
        onInsert={handleTableInsert}
      />
    </>
  );
}
