const { generateTemplateFiles } = require('generate-template-files');

generateTemplateFiles([
  // Example of generating multiple files
  {
    option: 'Create Components',
    defaultCase: '(kebabCase)',
    entry: {
      folderPath: './tools/templates/components/',
    },
    stringReplacers: ['__component_name__'],
    output: {
      path: './ui/components/__component_name__(kebabCase)',
      pathAndFileNameDefaultCase: '(kebabCase)',
    },
    onComplete: (results) => {
      console.log(`results`, results);
    },
  },
  // Example of generating a single file
  {
    option: 'Create Page',
    defaultCase: '(kebabCase)',
    entry: {
      folderPath: './tools/templates/pages/',
    },
    stringReplacers: ['__page_name__'],
    output: {
      path: './ui/pages/',
      pathAndFileNameDefaultCase: '(kebabCase)',
    },
  },
]);
