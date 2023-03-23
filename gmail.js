function organizeEmails() {
  // Define the rules for email organization
  const rules = [
    { keyword: 'promotion', label: 'Promotions' },
    { sender: 'example@example.com', label: 'Sender Label' },
  ];

  // Search for emails in the inbox
  const inbox = GmailApp.getInboxThreads();
  // Search for unread emails in the inbox
  // const inbox = GmailApp.search('is:unread in:inbox');

  // Iterate through each email
  for (const thread of inbox) {
    // Get the subject and sender of the email
    const subject = thread.getFirstMessageSubject().toLowerCase();
    const sender = thread.getMessages()[0].getFrom().toLowerCase();

    // Initialize a variable to track whether a rule has been applied
    let ruleApplied = false;

    // Apply rules based on keywords
    for (const rule of rules) {
      if (rule.keyword && subject.includes(rule.keyword) || rule.sender && sender.includes(rule.sender)) {
        // Create the label if it doesn't exist
        let label = GmailApp.getUserLabelByName(rule.label);
        if (!label) {
          label = GmailApp.createLabel(rule.label);
        }

        // Apply the label to the email thread
        thread.addLabel(label);

        // Set ruleApplied to true, since a rule has been applied
        ruleApplied = true;

        // Stop checking other rules for this email
        break;
      }
    }

    // (Optional) Archive the email thread if a rule has been applied
    if (ruleApplied) {
      // thread.moveToArchive();
    }
  }
}
