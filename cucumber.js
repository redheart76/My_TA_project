const common = `
  --require-module ts-node/register
  --require src/**/*.ts
  --require src/featureSteps_definitions/**/*.ts
  --format json:reports/report.json 
  --format message:reports/report.ndjson
  --format html:reports/report.html
  --format summary 
  --format progress-bar 
  --format @cucumber/pretty-formatter
  --format ./formatters/json-summary-formatter.cjs:reports/summary-report.json
  --format-options ${JSON.stringify({ snippetInterface: 'async-await' })}
  --format 'rerun:./reports/@rerun.txt'
  `;

/**
 * Profiles that you can use to switch between environments
 * https://github.com/cucumber/cucumber-js/blob/main/docs/profiles.md
 */
module.exports = {
  default: `${common} --world-parameters '{"environment": "dev"}'`,
  dev: `${common} --world-parameters '{"environment": "dev"}'`,
  test: `${common} --world-parameters '{"environment": "test"}'`,
};
