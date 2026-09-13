# Temporary policy uploads

Run `npm run dev`, open `/upload`, select a PDF or DOCX (maximum 5 MB), and click **Use this policy**. Extraction and activation happen together on that button. A failed upload leaves the previous selection intact. Return to chat to see **Active Policy: <filename>**. **Use Default Policy** beside the active policy on chat or `/upload` deletes its temporary server text, clears the browser selection, and immediately updates the label to Default Employee Handbook (NovaTech). It appears only for an active upload, confirms "Default policy restored", and retains the selection for retry if deletion fails. Chat disables reset while answering and pauses submission while reset is in progress.

The original file is read in memory and discarded after extraction. `pdf-parse` extracts PDF text and `mammoth` extracts DOCX raw text. Scanned PDFs require OCR elsewhere; damaged, encrypted, empty, wrong-format, and oversized documents are rejected. Extracted text is limited to 500,000 characters. Text is split into 350-word excerpts with 50-word overlap, cited as U1, U2, etc.; these are generated excerpt references, not original document section numbers.

Only the random policy ID is saved in this browser tab's sessionStorage. Server memory holds the name and excerpts for up to eight hours (expired entries are pruned on store access). A development-server restart clears the memory store. The map allows at most 20 temporary uploads. Closing a tab clears its selection; unreachable uploads expire. There is no database, file persistence, or account system. This is a single-process development prototype; it is not shared storage for serverless or multi-instance deployments.

Chat sends the selected ID with the question. The server resolves that ID and retrieves only from that document. No ID uses the existing NovaTech handbook. An expired ID is rejected rather than silently answering from another source; the frontend clears the stale selection and explains that the next question will use the default. The Claude SDK, model, and five response fields stay in place. Personal/legal/medical escalation checks still run before Claude. Uploaded-policy escalation does not invent NovaTech contacts or section 12 citations. Relevant uploaded excerpts are sent to Claude when a question needs an answer.

## Verification

- `node --test tests/policy.test.mjs`: 14 tests covering real generated PDF/DOCX extraction, validation, chunk overlap, source isolation, expiry, escalation, prompt safeguards, response shape, citation validation, upload handling, successful reset back to built-in annual leave content, and failed-reset retry behavior. Claude is mocked and no paid requests occur. The test loader uses Node's `registerHooks` (Node 22.15+ or 24+).
- `npm run lint`
- `npm run build`
- Start the built app with `npm run start -- --hostname 127.0.0.1 --port 3100`, then run `node tests/policy-smoke.mjs`. This checks the real pages and HTTP routes, temporary upload lookup across routes, escalation, removal, and default fallback. It makes no Claude requests. Set `POLICY_TEST_URL` to use a different server URL.

For a manual end-to-end check:

1. With your existing `ANTHROPIC_API_KEY` configured, start the app and verify the default active-policy name in chat.
2. Create a PDF or DOCX containing a distinctive policy, for example "Employees receive 37 annual leave days per year." Upload and activate it, then return to chat and ask about annual leave. Verify the answer uses that document and cites an uploaded excerpt.
3. Ask about your salary, personal leave balance, legal advice, or medical advice. Verify escalation. Ask an unrelated question and verify it is referred to People & Culture.
4. Try a text file, a renamed invalid PDF/DOCX, an empty document, and a file larger than 5 MB. Verify errors and that the previous policy stays active.
5. Select **Use Default Policy** and verify the default name and handbook answers return.
6. Upload again, restart the server, and refresh chat. Verify the expiry message and default fallback on the next question. Upload again to reactivate the document.

Parser documentation: https://github.com/mehmet-kozan/pdf-parse and https://github.com/mwilliamson/mammoth.js.