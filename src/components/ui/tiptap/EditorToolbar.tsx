import { Editor } from "@tiptap/react";
import { Button } from "../Button";
import {
  Bold,
  Italic,
  Strikethrough,
  Underline as UnderlineIcon,
  List,
  ListOrdered,
  Quote,
  Undo,
  Redo,
  ImageIcon,
  Link as LinkIcon,
  Table as TableIcon,
  Heading1,
  Heading2,
  Heading3,
  Code,
  Palette,
  Highlighter,
  Type,
  FileText,
  Code2,
} from "lucide-react";

interface EditorToolbarProps {
  editor: Editor;
  isMarkdownMode: boolean;
  isHtmlMode: boolean;
  toggleMarkdownMode: () => void;
  toggleHtmlMode: () => void;
  addImage: () => void;
  addLink: () => void;
  insertTable: () => void;
  setColor: (color: string) => void;
  setFontSize: (fontSize: string) => void;
  setFontFamily: (fontFamily: string) => void;
  setLineHeight: (lineHeight: string) => void;
  setLetterSpacing: (letterSpacing: string) => void;
}

export function EditorToolbar({
  editor,
  isMarkdownMode,
  isHtmlMode,
  toggleMarkdownMode,
  toggleHtmlMode,
  addImage,
  addLink,
  insertTable,
  setColor,
  setFontSize,
  setFontFamily,
  setLineHeight,
  setLetterSpacing,
}: EditorToolbarProps) {
  return (
    <div className="bg-gray-50 border-b border-gray-300 p-1 sm:p-2 flex flex-wrap gap-0.5 sm:gap-1 overflow-x-auto">
      {/* Mode Toggle Buttons */}
      <Button
        type="button"
        variant={isMarkdownMode ? "default" : "outline"}
        size="sm"
        onClick={toggleMarkdownMode}
        title="Toggle Markdown Mode"
        className="h-7 w-7 sm:h-8 sm:w-8 p-1"
      >
        <FileText className="h-3 w-3 sm:h-4 sm:w-4" />
      </Button>
      <Button
        type="button"
        variant={isHtmlMode ? "default" : "outline"}
        size="sm"
        onClick={toggleHtmlMode}
        title="Toggle HTML Mode"
        className="h-7 w-7 sm:h-8 sm:w-8 p-1"
      >
        <Code2 className="h-3 w-3 sm:h-4 sm:w-4" />
      </Button>

      <div className="h-4 sm:h-6 w-px bg-gray-300 mx-0.5 sm:mx-1" />

      {!isMarkdownMode && !isHtmlMode && (
        <>
          {/* Headings */}
          <div className="flex gap-0.5 sm:gap-1">
            <Button
              type="button"
              variant={
                editor.isActive("heading", { level: 1 }) ? "default" : "outline"
              }
              size="sm"
              onClick={() => {
                if (editor.isActive("heading", { level: 1 })) {
                  editor.chain().focus().setParagraph().run();
                } else {
                  editor.chain().focus().setHeading({ level: 1 }).run();
                }
              }}
              className="h-7 w-7 sm:h-8 sm:w-8 p-1"
            >
              <Heading1 className="h-3 w-3 sm:h-4 sm:w-4" />
            </Button>
            <Button
              type="button"
              variant={
                editor.isActive("heading", { level: 2 }) ? "default" : "outline"
              }
              size="sm"
              onClick={() => {
                if (editor.isActive("heading", { level: 2 })) {
                  editor.chain().focus().setParagraph().run();
                } else {
                  editor.chain().focus().setHeading({ level: 2 }).run();
                }
              }}
              className="h-7 w-7 sm:h-8 sm:w-8 p-1"
            >
              <Heading2 className="h-3 w-3 sm:h-4 sm:w-4" />
            </Button>
            <Button
              type="button"
              variant={
                editor.isActive("heading", { level: 3 }) ? "default" : "outline"
              }
              size="sm"
              onClick={() => {
                if (editor.isActive("heading", { level: 3 })) {
                  editor.chain().focus().setParagraph().run();
                } else {
                  editor.chain().focus().setHeading({ level: 3 }).run();
                }
              }}
              className="h-7 w-7 sm:h-8 sm:w-8 p-1"
            >
              <Heading3 className="h-3 w-3 sm:h-4 sm:w-4" />
            </Button>
          </div>

          <div className="h-4 sm:h-6 w-px bg-gray-300 mx-0.5 sm:mx-1" />

          {/* Font Size */}
          <div className="flex gap-0.5 sm:gap-1">
            <select
              onChange={(e) => {
                setFontSize(e.target.value);
                e.target.value = ""; // Reset select after use
              }}
              className="px-1 sm:px-2 py-1 text-xs border border-gray-300 rounded h-7 sm:h-8"
              defaultValue=""
            >
              <option value="">Font Size</option>
              <option value="12px">12px</option>
              <option value="14px">14px</option>
              <option value="16px">16px</option>
              <option value="18px">18px</option>
              <option value="20px">20px</option>
              <option value="24px">24px</option>
              <option value="28px">28px</option>
              <option value="32px">32px</option>
              <option value="36px">36px</option>
              <option value="48px">48px</option>
            </select>
            <input
              type="number"
              placeholder="Custom"
              min="8"
              max="72"
              className="w-16 px-2 py-1 text-xs border border-gray-300 rounded"
              onBlur={(e) => {
                const value = e.target.value;
                if (value) {
                  setFontSize(`${value}px`);
                  e.target.value = ""; // Clear input after applying
                }
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  const value = (e.target as HTMLInputElement).value;
                  if (value) {
                    setFontSize(`${value}px`);
                    (e.target as HTMLInputElement).value = "";
                  }
                }
              }}
            />
          </div>

          <div className="h-6 w-px bg-gray-300 mx-1" />

          {/* Line Height */}
          <select
            onChange={(e) => {
              setLineHeight(e.target.value);
              e.target.value = ""; // Reset select after use
            }}
            className="px-2 py-1 text-xs border border-gray-300 rounded"
            defaultValue=""
          >
            <option value="">Line Height</option>
            <option value="1">1</option>
            <option value="1.2">1.2</option>
            <option value="1.4">1.4</option>
            <option value="1.6">1.6</option>
            <option value="1.8">1.8</option>
            <option value="2">2</option>
            <option value="2.5">2.5</option>
            <option value="3">3</option>
          </select>

          <div className="h-6 w-px bg-gray-300 mx-1" />

          {/* Letter Spacing */}
          <select
            onChange={(e) => {
              setLetterSpacing(e.target.value);
              e.target.value = ""; // Reset select after use
            }}
            className="px-2 py-1 text-xs border border-gray-300 rounded"
            defaultValue=""
          >
            <option value="">Letter Spacing</option>
            <option value="normal">Normal</option>
            <option value="0.5px">0.5px</option>
            <option value="1px">1px</option>
            <option value="1.5px">1.5px</option>
            <option value="2px">2px</option>
            <option value="3px">3px</option>
            <option value="4px">4px</option>
            <option value="5px">5px</option>
          </select>

          <div className="h-6 w-px bg-gray-300 mx-1" />

          {/* Font Family */}
          <select
            onChange={(e) => {
              setFontFamily(e.target.value);
              e.target.value = ""; // Reset select after use
            }}
            className="px-2 py-1 text-xs border border-gray-300 rounded"
            defaultValue=""
          >
            <option value="">Font Family</option>
            <option value="Inter">Inter</option>
            <option value="Georgia">Georgia</option>
            <option value="Times New Roman">Times New Roman</option>
            <option value="Arial">Arial</option>
            <option value="Helvetica">Helvetica</option>
            <option value="monospace">Monospace</option>
          </select>

          <div className="h-6 w-px bg-gray-300 mx-1" />

          {/* Text Formatting */}
          <Button
            type="button"
            variant={editor.isActive("bold") ? "default" : "outline"}
            size="sm"
            onClick={() => {
              if (editor.isActive("bold")) {
                editor.chain().focus().unsetBold().run();
              } else {
                editor.chain().focus().setBold().run();
              }
            }}
          >
            <Bold className="h-4 w-4" />
          </Button>
          <Button
            type="button"
            variant={editor.isActive("italic") ? "default" : "outline"}
            size="sm"
            onClick={() => {
              if (editor.isActive("italic")) {
                editor.chain().focus().unsetItalic().run();
              } else {
                editor.chain().focus().setItalic().run();
              }
            }}
          >
            <Italic className="h-4 w-4" />
          </Button>
          <Button
            type="button"
            variant={editor.isActive("underline") ? "default" : "outline"}
            size="sm"
            onClick={() => {
              if (editor.isActive("underline")) {
                editor.chain().focus().unsetUnderline().run();
              } else {
                editor.chain().focus().setUnderline().run();
              }
            }}
          >
            <UnderlineIcon className="h-4 w-4" />
          </Button>
          <Button
            type="button"
            variant={editor.isActive("strike") ? "default" : "outline"}
            size="sm"
            onClick={() => {
              if (editor.isActive("strike")) {
                editor.chain().focus().unsetStrike().run();
              } else {
                editor.chain().focus().setStrike().run();
              }
            }}
          >
            <Strikethrough className="h-4 w-4" />
          </Button>

          <div className="h-6 w-px bg-gray-300 mx-1" />

          {/* Colors */}
          <div className="flex gap-1">
            <div className="relative">
              <Button type="button" variant="outline" size="sm">
                <Palette className="h-4 w-4" />
              </Button>
              <input
                type="color"
                onChange={(e) => setColor(e.target.value)}
                className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer"
                title="Choose text color"
              />
            </div>
            <select
              onChange={(e) => {
                setColor(e.target.value);
                e.target.value = ""; // Reset select after use
              }}
              className="px-2 py-1 text-xs border border-gray-300 rounded"
              defaultValue=""
            >
              <option value="">Quick Colors</option>
              <option value="#000000">Black</option>
              <option value="#ff0000">Red</option>
              <option value="#00ff00">Green</option>
              <option value="#0000ff">Blue</option>
              <option value="#ffff00">Yellow</option>
              <option value="#ff00ff">Magenta</option>
              <option value="#00ffff">Cyan</option>
              <option value="#800080">Purple</option>
              <option value="#ffa500">Orange</option>
              <option value="#8b4513">Brown</option>
              <option value="#808080">Gray</option>
            </select>
            <Button
              type="button"
              variant={editor.isActive("highlight") ? "default" : "outline"}
              size="sm"
              onClick={() => {
                if (editor.isActive("highlight")) {
                  editor.chain().focus().unsetHighlight().run();
                } else {
                  editor.chain().focus().setHighlight().run();
                }
              }}
            >
              <Highlighter className="h-4 w-4" />
            </Button>
          </div>

          <div className="h-6 w-px bg-gray-300 mx-1" />

          {/* Code */}
          <Button
            type="button"
            variant={editor.isActive("code") ? "default" : "outline"}
            size="sm"
            onClick={() => {
              if (editor.isActive("code")) {
                editor.chain().focus().unsetCode().run();
              } else {
                editor.chain().focus().setCode().run();
              }
            }}
          >
            <Code className="h-4 w-4" />
          </Button>
          <Button
            type="button"
            variant={editor.isActive("codeBlock") ? "default" : "outline"}
            size="sm"
            onClick={() => {
              if (editor.isActive("codeBlock")) {
                editor.chain().focus().setParagraph().run();
              } else {
                editor.chain().focus().setCodeBlock().run();
              }
            }}
          >
            <Type className="h-4 w-4" />
          </Button>

          <div className="h-6 w-px bg-gray-300 mx-1" />

          {/* Lists */}
          <Button
            type="button"
            variant={editor.isActive("bulletList") ? "default" : "outline"}
            size="sm"
            onClick={() => {
              if (editor.isActive("bulletList")) {
                editor.chain().focus().liftListItem("listItem").run();
              } else {
                editor.chain().focus().toggleBulletList().run();
              }
            }}
          >
            <List className="h-4 w-4" />
          </Button>
          <Button
            type="button"
            variant={editor.isActive("orderedList") ? "default" : "outline"}
            size="sm"
            onClick={() => {
              if (editor.isActive("orderedList")) {
                editor.chain().focus().liftListItem("listItem").run();
              } else {
                editor.chain().focus().toggleOrderedList().run();
              }
            }}
          >
            <ListOrdered className="h-4 w-4" />
          </Button>
          <Button
            type="button"
            variant={editor.isActive("blockquote") ? "default" : "outline"}
            size="sm"
            onClick={() => {
              if (editor.isActive("blockquote")) {
                editor.chain().focus().lift("blockquote").run();
              } else {
                editor.chain().focus().setBlockquote().run();
              }
            }}
          >
            <Quote className="h-4 w-4" />
          </Button>

          <div className="h-6 w-px bg-gray-300 mx-1" />

          {/* Media & Links */}
          <Button type="button" variant="outline" size="sm" onClick={addImage}>
            <ImageIcon className="h-4 w-4" />
          </Button>
          <Button type="button" variant="outline" size="sm" onClick={addLink}>
            <LinkIcon className="h-4 w-4" />
          </Button>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={insertTable}
            title="Insert Table"
          >
            <TableIcon className="h-4 w-4" />
          </Button>

          {/* Table Controls - Only show when inside a table */}
          {editor.isActive("table") && (
            <>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => editor.chain().focus().addRowBefore().run()}
                title="Add Row Before"
              >
                <span className="text-xs">+R↑</span>
              </Button>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => editor.chain().focus().addRowAfter().run()}
                title="Add Row After"
              >
                <span className="text-xs">+R↓</span>
              </Button>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => editor.chain().focus().addColumnBefore().run()}
                title="Add Column Before"
              >
                <span className="text-xs">+C←</span>
              </Button>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => editor.chain().focus().addColumnAfter().run()}
                title="Add Column After"
              >
                <span className="text-xs">+C→</span>
              </Button>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => editor.chain().focus().deleteRow().run()}
                title="Delete Row"
              >
                <span className="text-xs">-R</span>
              </Button>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => editor.chain().focus().deleteColumn().run()}
                title="Delete Column"
              >
                <span className="text-xs">-C</span>
              </Button>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => editor.chain().focus().deleteTable().run()}
                title="Delete Table"
              >
                <span className="text-xs">Del</span>
              </Button>
            </>
          )}

          <div className="h-6 w-px bg-gray-300 mx-1" />

          {/* Undo/Redo */}
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => editor.chain().focus().undo().run()}
            disabled={!editor.can().undo()}
          >
            <Undo className="h-4 w-4" />
          </Button>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => editor.chain().focus().redo().run()}
            disabled={!editor.can().redo()}
          >
            <Redo className="h-4 w-4" />
          </Button>
        </>
      )}
    </div>
  );
}
