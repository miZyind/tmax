import 'highlight.js/styles/github-dark-dimmed.css';

import hljs from 'highlight.js';
import MarkdownIt from 'markdown-it';

const highlight: MarkdownIt.Options['highlight'] = (code, language) =>
  language && hljs.getLanguage(language)
    ? hljs.highlight(code, { language }).value
    : '';
const options = { html: true, linkify: true, typographer: true, highlight };
const GithubIssuePlugin: MarkdownIt.PluginSimple = (m) => {
  const INVALID_INDEX = -1;
  const TEXT_INDEX_OFFSET = 1;

  m.core.ruler.after('linkify', 'github_issue', (state) => {
    state.tokens.forEach((token) => {
      if (token.type === 'inline' && token.children) {
        const linkIndex = token.children.findIndex(
          ({ type }) => type === 'link_open',
        );

        if (linkIndex !== INVALID_INDEX) {
          const textToken = token.children[linkIndex + TEXT_INDEX_OFFSET];

          textToken.content = textToken.content.replace(
            /^https?:\/\/github.com\/.+\/.+\/.+\//u,
            '#',
          );
        }
      }
    });
  });
};
const decoder = new MarkdownIt(options).use(GithubIssuePlugin);

export const decode = (input: string) => ({ __html: decoder.render(input) });
