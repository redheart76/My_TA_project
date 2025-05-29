const cucumber = require('@cucumber/cucumber');
const issueHelpers = require('@cucumber/cucumber/lib/formatter/helpers/issue_helpers');
const valueChecker = require('@cucumber/cucumber/lib/value_checker');

// A modified version of https://github.com/cucumber/cucumber-js/blob/main/src/formatter/summary_formatter.ts
class JsonSummaryFormatter extends cucumber.Formatter {
  constructor(options) {
    super(options);

    options.eventBroadcaster.on('envelope', (envelope) => {
      if (valueChecker.doesHaveValue(envelope.testRunFinished)) {
        this.logSummary();
      }
    });
  }

  logSummary() {
    const failures = [];
    const warnings = [];
    const passes = [];
    const testCaseAttempts = this.eventDataCollector.getTestCaseAttempts();

    const attachments = Object.values(testCaseAttempts[0].stepAttachments).flat();
    const environmentAttachment = attachments
      .filter((attachment) => attachment.mediaType === 'application/json')
      .map((attachment) => JSON.parse(attachment.body))
      .find((body) => body.environment);
    const environment = environmentAttachment?.environment ?? 'dev';

    testCaseAttempts.forEach((testCaseAttempt) => {
      if (issueHelpers.isFailure(testCaseAttempt.worstTestStepResult)) {
        failures.push(testCaseAttempt);
      } else if (issueHelpers.isWarning(testCaseAttempt.worstTestStepResult)) {
        warnings.push(testCaseAttempt);
      } else {
        passes.push(testCaseAttempt);
      }
    });

    const summary = {
      environment: environment,
      failures: failures.length,
      warnings: warnings.length,
      passes: passes.length,
    };

    this.log(JSON.stringify(summary));
  }
}

exports.default = JsonSummaryFormatter;
