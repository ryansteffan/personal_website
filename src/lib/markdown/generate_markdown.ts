import { Remarkable } from "remarkable";
import { linkify } from "remarkable/linkify";
import hljs from "highlight.js";
import type BlogPost from "~/components/types/BlogPost";

// CSS imports for markdown content.
import "./blog-post.css";
import "highlight.js/styles/monokai.css";

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

export default function GenerateMarkdown(
  post: BlogPost,
  remarkableOptions = defaultOptions,
): {
  __html: string;
} {
  const markdownParser = new Remarkable("full", remarkableOptions);
  markdownParser.use(linkify);

  const htmlContent = {
    __html: markdownParser.render(post.content),
  };

  return htmlContent as { __html: string };
}
