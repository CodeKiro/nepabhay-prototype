// Comprehensive HTML to Markdown converter with all conversions
export const htmlToMarkdown = (html: string): string => {
  return (
    html
      // Headers (h1-h6)
      .replace(/<h1[^>]*>(.*?)<\/h1>/gi, "# $1\n\n")
      .replace(/<h2[^>]*>(.*?)<\/h2>/gi, "## $1\n\n")
      .replace(/<h3[^>]*>(.*?)<\/h3>/gi, "### $1\n\n")
      .replace(/<h4[^>]*>(.*?)<\/h4>/gi, "#### $1\n\n")
      .replace(/<h5[^>]*>(.*?)<\/h5>/gi, "##### $1\n\n")
      .replace(/<h6[^>]*>(.*?)<\/h6>/gi, "###### $1\n\n")

      // Text formatting
      .replace(/<strong[^>]*>(.*?)<\/strong>/gi, "**$1**")
      .replace(/<b[^>]*>(.*?)<\/b>/gi, "**$1**")
      .replace(/<em[^>]*>(.*?)<\/em>/gi, "*$1*")
      .replace(/<i[^>]*>(.*?)<\/i>/gi, "*$1*")
      .replace(/<u[^>]*>(.*?)<\/u>/gi, "<u>$1</u>") // HTML passthrough for underline
      .replace(/<del[^>]*>(.*?)<\/del>/gi, "~~$1~~")
      .replace(/<s[^>]*>(.*?)<\/s>/gi, "~~$1~~")
      .replace(/<strike[^>]*>(.*?)<\/strike>/gi, "~~$1~~")
      .replace(/<sup[^>]*>(.*?)<\/sup>/gi, "^$1^")
      .replace(/<sub[^>]*>(.*?)<\/sub>/gi, "~$1~")
      .replace(/<mark[^>]*>(.*?)<\/mark>/gi, "==$1==")
      .replace(/<kbd[^>]*>(.*?)<\/kbd>/gi, "`$1`") // Keyboard input as code
      .replace(/<samp[^>]*>(.*?)<\/samp>/gi, "`$1`") // Sample output as code
      .replace(/<var[^>]*>(.*?)<\/var>/gi, "*$1*") // Variables as italic
      .replace(/<small[^>]*>(.*?)<\/small>/gi, "<small>$1</small>") // HTML passthrough
      .replace(/<big[^>]*>(.*?)<\/big>/gi, "<big>$1</big>") // HTML passthrough
      .replace(/<tt[^>]*>(.*?)<\/tt>/gi, "`$1`") // Teletype as code
      .replace(/<q[^>]*>(.*?)<\/q>/gi, '"$1"') // Inline quotes
      .replace(/<cite[^>]*>(.*?)<\/cite>/gi, "*$1*") // Citations as italic
      .replace(/<dfn[^>]*>(.*?)<\/dfn>/gi, "*$1*") // Definitions as italic
      .replace(/<abbr[^>]*title="([^"]*)"[^>]*>(.*?)<\/abbr>/gi, "$2 ($1)") // Abbreviations with title
      .replace(/<abbr[^>]*>(.*?)<\/abbr>/gi, "$1") // Abbreviations without title
      .replace(
        /<acronym[^>]*title="([^"]*)"[^>]*>(.*?)<\/acronym>/gi,
        "$2 ($1)"
      ) // Acronyms with title
      .replace(/<acronym[^>]*>(.*?)<\/acronym>/gi, "$1") // Acronyms without title

      // Code (pre must come before code for proper nesting)
      .replace(
        /<pre[^>]*><code[^>]*class="language-([^"]*)"[^>]*>([\s\S]*?)<\/code><\/pre>/gi,
        "```$1\n$2\n```\n"
      )
      .replace(
        /<pre[^>]*><code[^>]*>([\s\S]*?)<\/code><\/pre>/gi,
        "```\n$1\n```\n"
      )
      .replace(/<pre[^>]*>([\s\S]*?)<\/pre>/gi, "```\n$1\n```\n")
      .replace(/<code[^>]*>(.*?)<\/code>/gi, "`$1`")

      // Blockquotes with proper line handling
      .replace(
        /<blockquote[^>]*>([\s\S]*?)<\/blockquote>/gi,
        (match, content) => {
          // Clean up the content first
          const cleanContent = content
            .replace(/<p[^>]*>/gi, "")
            .replace(/<\/p>/gi, "\n")
            .replace(/<br\s*\/?>/gi, "\n")
            .trim();

          return (
            cleanContent
              .split("\n")
              .filter((line: string) => line.trim()) // Remove empty lines
              .map((line: string) => `> ${line.trim()}`)
              .join("\n") + "\n\n"
          );
        }
      )

      // Links and images (images must come before links)
      .replace(
        /<img[^>]*src="([^"]*)"[^>]*alt="([^"]*)"[^>]*title="([^"]*)"[^>]*\/?>/gi,
        '![$2]($1 "$3")'
      )
      .replace(
        /<img[^>]*alt="([^"]*)"[^>]*src="([^"]*)"[^>]*title="([^"]*)"[^>]*\/?>/gi,
        '![$1]($2 "$3")'
      )
      .replace(
        /<img[^>]*src="([^"]*)"[^>]*alt="([^"]*)"[^>]*\/?>/gi,
        "![$2]($1)"
      )
      .replace(
        /<img[^>]*alt="([^"]*)"[^>]*src="([^"]*)"[^>]*\/?>/gi,
        "![$1]($2)"
      )
      .replace(/<img[^>]*src="([^"]*)"[^>]*\/?>/gi, "![]($1)")
      .replace(
        /<a[^>]*href="([^"]*)"[^>]*title="([^"]*)"[^>]*>(.*?)<\/a>/gi,
        '[$3]($1 "$2")'
      )
      .replace(/<a[^>]*href="([^"]*)"[^>]*>(.*?)<\/a>/gi, "[$2]($1)")

      // Lists with proper nesting support
      .replace(/<ul[^>]*>([\s\S]*?)<\/ul>/gi, (match, content) => {
        return (
          content.replace(
            /<li[^>]*>([\s\S]*?)<\/li>/gi,
            (liMatch: string, liContent: string) => {
              // Handle nested lists
              const cleanContent = liContent
                .replace(
                  /<ul[^>]*>([\s\S]*?)<\/ul>/gi,
                  (nestedMatch: string, nestedContent: string) => {
                    return (
                      "\n" +
                      nestedContent.replace(
                        /<li[^>]*>([\s\S]*?)<\/li>/gi,
                        "  - $1"
                      )
                    );
                  }
                )
                .replace(
                  /<ol[^>]*>([\s\S]*?)<\/ol>/gi,
                  (nestedMatch: string, nestedContent: string) => {
                    let counter = 1;
                    return (
                      "\n" +
                      nestedContent.replace(
                        /<li[^>]*>([\s\S]*?)<\/li>/gi,
                        () => `  ${counter++}. $1`
                      )
                    );
                  }
                )
                .trim();
              return `- ${cleanContent}\n`;
            }
          ) + "\n"
        );
      })
      .replace(/<ol[^>]*>([\s\S]*?)<\/ol>/gi, (match, content) => {
        let counter = 1;
        return (
          content.replace(
            /<li[^>]*>([\s\S]*?)<\/li>/gi,
            (liMatch: string, liContent: string) => {
              // Handle nested lists
              const cleanContent = liContent
                .replace(
                  /<ul[^>]*>([\s\S]*?)<\/ul>/gi,
                  (nestedMatch: string, nestedContent: string) => {
                    return (
                      "\n" +
                      nestedContent.replace(
                        /<li[^>]*>([\s\S]*?)<\/li>/gi,
                        "  - $1"
                      )
                    );
                  }
                )
                .replace(
                  /<ol[^>]*>([\s\S]*?)<\/ol>/gi,
                  (nestedMatch: string, nestedContent: string) => {
                    let nestedCounter = 1;
                    return (
                      "\n" +
                      nestedContent.replace(
                        /<li[^>]*>([\s\S]*?)<\/li>/gi,
                        () => `  ${nestedCounter++}. $1`
                      )
                    );
                  }
                )
                .trim();
              return `${counter++}. ${cleanContent}\n`;
            }
          ) + "\n"
        );
      })

      // Definition lists
      .replace(/<dl[^>]*>([\s\S]*?)<\/dl>/gi, (match, content) => {
        return content
          .replace(/<dt[^>]*>([\s\S]*?)<\/dt>/gi, "$1\n")
          .replace(/<dd[^>]*>([\s\S]*?)<\/dd>/gi, ": $1\n\n");
      })

      // Tables with improved handling
      .replace(/<table[^>]*>([\s\S]*?)<\/table>/gi, (match, content) => {
        let markdown = "";

        // Handle thead and tbody separately
        const theadMatch = content.match(/<thead[^>]*>([\s\S]*?)<\/thead>/i);
        const tbodyMatch = content.match(/<tbody[^>]*>([\s\S]*?)<\/tbody>/i);

        let allRows: Array<{ row: string; isHeader: boolean }> = [];

        if (theadMatch) {
          const headerRows =
            theadMatch[1].match(/<tr[^>]*>([\s\S]*?)<\/tr>/gi) || [];
          allRows = allRows.concat(
            headerRows.map((row: string) => ({ row, isHeader: true }))
          );
        }

        if (tbodyMatch) {
          const bodyRows =
            tbodyMatch[1].match(/<tr[^>]*>([\s\S]*?)<\/tr>/gi) || [];
          allRows = allRows.concat(
            bodyRows.map((row: string) => ({ row, isHeader: false }))
          );
        } else {
          // If no thead/tbody, treat all rows normally
          const rows = content.match(/<tr[^>]*>([\s\S]*?)<\/tr>/gi) || [];
          allRows = rows.map((row: string, index: number) => ({
            row,
            isHeader: index === 0,
          }));
        }

        let isFirstDataRow = true;
        allRows.forEach(
          ({ row, isHeader }: { row: string; isHeader: boolean }) => {
            const cells = row.match(/<t[hd][^>]*>([\s\S]*?)<\/t[hd]>/gi) || [];
            const cellContents = cells.map((cell: string) =>
              cell.replace(/<t[hd][^>]*>([\s\S]*?)<\/t[hd]>/gi, "$1").trim()
            );

            if (cellContents.length > 0) {
              markdown += "| " + cellContents.join(" | ") + " |\n";
              if (isHeader || isFirstDataRow) {
                markdown += "|" + " --- |".repeat(cellContents.length) + "\n";
                isFirstDataRow = false;
              }
            }
          }
        );

        return markdown + "\n";
      })

      // Details/Summary (HTML5)
      .replace(/<details[^>]*>([\s\S]*?)<\/details>/gi, (match, content) => {
        const summaryMatch = content.match(/<summary[^>]*>(.*?)<\/summary>/i);
        const summary = summaryMatch ? summaryMatch[1] : "Details";
        const details = content
          .replace(/<summary[^>]*>.*?<\/summary>/i, "")
          .trim();
        return `<details>\n<summary>${summary}</summary>\n\n${details}\n</details>\n\n`;
      })

      // Figure and figcaption
      .replace(/<figure[^>]*>([\s\S]*?)<\/figure>/gi, (match, content) => {
        const captionMatch = content.match(
          /<figcaption[^>]*>(.*?)<\/figcaption>/i
        );
        const caption = captionMatch ? captionMatch[1] : "";
        const figContent = content
          .replace(/<figcaption[^>]*>.*?<\/figcaption>/i, "")
          .trim();
        return caption
          ? `${figContent}\n*${caption}*\n\n`
          : `${figContent}\n\n`;
      })

      // Address
      .replace(/<address[^>]*>([\s\S]*?)<\/address>/gi, "*$1*\n\n")

      // Horizontal rules
      .replace(/<hr[^>]*\/?>/gi, "\n---\n\n")

      // Line breaks and paragraphs
      .replace(/<br\s*\/?>/gi, "  \n") // Two spaces for line break in markdown
      .replace(/<p[^>]*>([\s\S]*?)<\/p>/gi, "$1\n\n")
      .replace(/<div[^>]*>([\s\S]*?)<\/div>/gi, "$1\n")

      // Preserve some HTML elements that don't have markdown equivalents
      .replace(
        /<(span|section|article|header|footer|main|aside|nav)[^>]*>([\s\S]*?)<\/\1>/gi,
        "$2"
      )

      // Clean up remaining HTML tags (but preserve some useful ones)
      .replace(/<(?!\/?(u|small|big|sup|sub|details|summary))[^>]*>/g, "")

      // Clean up extra whitespace
      .replace(/\n\s*\n\s*\n/g, "\n\n")
      .replace(/^\s+|\s+$/g, "")
      .trim()
  );
};

// Comprehensive Markdown to HTML converter with all conversions
export const markdownToHtml = (markdown: string): string => {
  return (
    markdown
      // Escape HTML entities first (but preserve intentional HTML)
      .replace(/&(?!(?:amp|lt|gt|quot|#\d+|#x[a-fA-F0-9]+);)/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")

      // Restore intentional HTML elements
      .replace(/&lt;(\/?(?:u|small|big|details|summary)[^&]*?)&gt;/g, "<$1>")

      // Headers (must come before other processing, order matters for longest first)
      .replace(/^######\s(.+)$/gm, "<h6>$1</h6>")
      .replace(/^#####\s(.+)$/gm, "<h5>$1</h5>")
      .replace(/^####\s(.+)$/gm, "<h4>$1</h4>")
      .replace(/^###\s(.+)$/gm, "<h3>$1</h3>")
      .replace(/^##\s(.+)$/gm, "<h2>$1</h2>")
      .replace(/^#\s(.+)$/gm, "<h1>$1</h1>")

      // Code blocks (must come before inline code)
      .replace(/```(\w+)?\n([\s\S]*?)\n```/g, (match, lang, code) => {
        const langAttr = lang ? ` class="language-${lang}"` : "";
        return `<pre><code${langAttr}>${code}</code></pre>`;
      })
      .replace(/```\n([\s\S]*?)\n```/g, "<pre><code>$1</code></pre>")

      // Inline code
      .replace(/`([^`]+)`/g, "<code>$1</code>")

      // Text formatting (order matters - longest patterns first)
      .replace(/\*\*\*(.*?)\*\*\*/g, "<strong><em>$1</em></strong>")
      .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
      .replace(/\*(.*?)\*/g, "<em>$1</em>")
      .replace(/__(.*?)__/g, "<strong>$1</strong>") // Alternative bold syntax
      .replace(/_(.*?)_/g, "<em>$1</em>") // Alternative italic syntax
      .replace(/~~(.*?)~~]/g, "<del>$1</del>")
      .replace(/==(.*?)==]/g, "<mark>$1</mark>")
      .replace(/\^(.*?)\^/g, "<sup>$1</sup>")
      .replace(/~(.*?)~/g, "<sub>$1</sub>")

      // Links and images (images must come before links)
      .replace(
        /!\[([^\]]*)\]\(([^)]+)\s+"([^"]+)"\)/g,
        '<img src="$2" alt="$1" title="$3" />'
      )
      .replace(/!\[([^\]]*)\]\(([^)]+)\)/g, '<img src="$2" alt="$1" />')
      .replace(
        /\[([^\]]+)\]\(([^)]+)\s+"([^"]+)"\)/g,
        '<a href="$2" title="$3">$1</a>'
      )
      .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>')

      // Automatic links
      .replace(/(^|[^">\w])https?:\/\/[^\s<]+/g, '$1<a href="$&">$&</a>')
      .replace(
        /(^|[^">\w])[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g,
        '$1<a href="mailto:$&">$&</a>'
      )

      // Blockquotes
      .replace(/^>\s(.+)$/gm, "<blockquote>$1</blockquote>")
      .replace(/<\/blockquote>\s*<blockquote>/g, " ")

      // Horizontal rules
      .replace(/^---$/gm, "<hr />")
      .replace(/^\*\*\*$/gm, "<hr />")
      .replace(/^___$/gm, "<hr />")

      // Definition lists
      .replace(/^(.+)\n:\s(.+)$/gm, "<dl><dt>$1</dt><dd>$2</dd></dl>")
      .replace(/<\/dl>\s*<dl>/g, "")

      // Tables with improved parsing
      .replace(
        /^\|(.+)\|\n\|[-:\s\|]+\|\n((?:\|.+\|\n?)*)/gm,
        (match, header, rows) => {
          const headerCells = header
            .split("|")
            .filter((cell: string) => cell.trim())
            .map((cell: string) => `<th>${cell.trim()}</th>`)
            .join("");

          const bodyRows = rows
            .trim()
            .split("\n")
            .filter((row: string) => row.trim())
            .map((row: string) => {
              const cells = row
                .split("|")
                .filter((cell: string) => cell.trim())
                .map((cell: string) => `<td>${cell.trim()}</td>`)
                .join("");
              return `<tr>${cells}</tr>`;
            })
            .join("");

          return `<table><thead><tr>${headerCells}</tr></thead><tbody>${bodyRows}</tbody></table>`;
        }
      )

      // Lists (unordered) - improved nesting
      .replace(/^([ ]*)([-*+])\s(.+)$/gm, (match, indent, marker, content) => {
        const level = indent.length / 2;
        return `${"  ".repeat(level)}<li>${content}</li>`;
      })

      // Lists (ordered) - improved nesting
      .replace(/^([ ]*)\d+\.\s(.+)$/gm, (match, indent, content) => {
        const level = indent.length / 2;
        return `${"  ".repeat(level)}<li>${content}</li>`;
      })

      // Wrap consecutive list items in ul/ol tags
      .replace(/(<li>.*<\/li>)(\n<li>.*<\/li>)*/g, (match) => {
        // Determine if it's an ordered or unordered list based on the original markdown
        // This is a simplified approach - in practice, you'd want to track the original markers
        return `<ul>\n${match}\n</ul>`;
      })

      // Clean up nested lists
      .replace(/<\/ul>\s*<ul>/g, "")
      .replace(/<\/ol>\s*<ol>/g, "")

      // Line breaks (two spaces at end of line)
      .replace(/  \n/g, "<br />\n")

      // Paragraphs (must come near the end)
      .replace(/\n\n+/g, "</p>\n<p>")
      .replace(/^/, "<p>")
      .replace(/$/, "</p>")

      // Clean up malformed paragraphs around block elements
      .replace(
        /<p>(\s*<(?:h[1-6]|hr|table|ul|ol|blockquote|pre|div|details)[^>]*>)/g,
        "$1"
      )
      .replace(
        /(<\/(?:h[1-6]|hr|table|ul|ol|blockquote|pre|div|details)>\s*)<\/p>/g,
        "$1"
      )
      .replace(/<p>\s*<\/p>/g, "")
      .replace(/<p>(<(?:img|br)[^>]*\/?>)<\/p>/g, "$1")

      // Final cleanup
      .replace(/\n+/g, "\n")
      .trim()
  );
};

// Utility function to clean and normalize markdown
export const normalizeMarkdown = (markdown: string): string => {
  return markdown
    .replace(/\r\n/g, "\n") // Normalize line endings
    .replace(/\r/g, "\n")
    .replace(/\t/g, "    ") // Convert tabs to spaces
    .replace(/[ ]+$/gm, "") // Remove trailing spaces
    .replace(/\n{3,}/g, "\n\n") // Limit consecutive newlines
    .trim();
};

// Utility function to clean HTML
export const normalizeHtml = (html: string): string => {
  return html
    .replace(/\s+/g, " ") // Normalize whitespace
    .replace(/>\s+</g, "><") // Remove whitespace between tags
    .replace(/\s+>/g, ">") // Remove whitespace before closing bracket
    .replace(/<\s+/g, "<") // Remove whitespace after opening bracket
    .trim();
};
