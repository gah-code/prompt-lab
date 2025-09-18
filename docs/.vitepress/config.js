// docs/.vitepress/config.js
export default {
  title: 'Prompt Lab',
  description: 'Notes, lectures & experiments in prompt engineering',
  lastUpdated: true,
  themeConfig: {
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Foundations', link: '/foundations/' },
      { text: 'Patterns', link: '/patterns/' },
      { text: 'Evaluation', link: '/evaluation/' },
    ],
    sidebar: {
      '/foundations/': [
        {
          text: 'Foundations',
          items: [
            {
              text: 'Anatomy of a Prompt',
              link: '/foundations/#anatomy-of-a-prompt',
            },
            {
              text: 'Context & Constraints',
              link: '/foundations/#context-constraints',
            },
            { text: 'Safety & Clarity', link: '/foundations/#safety-clarity' },
          ],
        },
      ],
      '/patterns/': [
        {
          text: 'Patterns',
          items: [
            { text: 'Zero/Few-Shot', link: '/patterns/#zero-few-shot' },
            { text: 'Roles & Style', link: '/patterns/#roles-style' },
            {
              text: 'Decomposition & Tools',
              link: '/patterns/#decomposition-tools',
            },
          ],
        },
      ],
      '/evaluation/': [
        {
          text: 'Evaluation',
          items: [
            { text: 'Metrics & Rubrics', link: '/evaluation/#metrics-rubrics' },
            {
              text: 'Experiment Log Template',
              link: '/evaluation/#experiment-log-template',
            },
            { text: 'Iteration Loop', link: '/evaluation/#iteration-loop' },
          ],
        },
      ],
    },
    editLink: false,
    search: { provider: 'local' },
  },
};
