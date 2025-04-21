import { Remarkable } from "remarkable";
import { linkify } from "remarkable/linkify";
import hljs from "highlight.js";
import type BlogPost from "~/components/types/BlogPost";

// CSS imports for markdown content.
import "./blog-post.css";
import "highlight.js/styles/monokai.css";
import Renderer from "remarkable/lib/renderer";

const defaultOptions = {
  html: true,
  xhtmlOut: true,
  breaks: true,
  typographer: true,
  highlight: function (str: string, lang: string) {
    if (lang && hljs.getLanguage(lang)) {
      try {
        return hljs.highlight(str, { language: lang }).value;
      } catch (err) {
        console.log("Error highlighting code: ", err);
      }
    }

    return "";
  },
};

function GenerateMarkdown(
  content: string,
  remarkableOptions = defaultOptions,
): {
  __html: string;
} {
  const markdownParser = new Remarkable("full", remarkableOptions);
  markdownParser.use(linkify);

  const htmlContent = {
    __html: markdownParser.render(content),
  };

  return htmlContent as { __html: string };
}

export interface MarkdownProps {
  content: string;
  className?: string;
}

export default function MarkdownComponent({
  content,
  className,
}: MarkdownProps): React.ReactElement {
  return (
    <>
      <div className={className}>
        <div
          className="markdown mb-4 mt-4"
          dangerouslySetInnerHTML={GenerateMarkdown(content)}
        />
      </div>
    </>
  );
}
