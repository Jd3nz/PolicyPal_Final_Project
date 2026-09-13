# PolicyPal

PolicyPal is an AI-powered HR policy Q&A assistant developed for the COIT13232 Business Analysis Project. It answers workplace policy questions using the built-in NovaTech employee handbook or a company policy uploaded by the user.

## Main Features

- Responsive chat with suggested questions and Claude-generated answers.
- Retrieval from the active policy, with section or uploaded-excerpt citations.
- Custom PDF and DOCX policy uploads with text extraction and validation.
- Active policy indicator in chat and **Use Default Policy** reset.
- Escalation of sensitive, personal-data, legal, medical, and unsupported questions to People & Culture or a manager.
- `/about` page explaining the project, workflow, technology, and limitations.

## Technology Stack

Next.js App Router and API routes, React, TypeScript, Tailwind CSS, Anthropic Claude API, `pdf-parse` for PDF text extraction, and `mammoth` for DOCX text extraction.

## Run Locally

Install Node.js and npm, then:

1. Clone the repository and enter the project directory:

   ```bash
   git clone https://github.com/Jd3nz/PolicyPal_Final_Project.git
   cd PolicyPal_Final_Project
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create `.env.local` in the project root:

   ```ini
   ANTHROPIC_API_KEY=your_api_key_here
   ```

   Replace the placeholder with your Anthropic API key. **Never commit the real API key or `.env.local` to GitHub.** Environment files are excluded by `.gitignore`.

4. Start the development server:

   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000).

## Upload and Reset Policies

Open **Upload Policy** (`/upload`), select a **PDF** or **DOCX** file up to 5 MB, and click **Use this policy**. PolicyPal extracts and chunks the text, then makes the uploaded document the active knowledge source for that browser tab. Chat shows **Active Policy: <filename>** and answers using relevant excerpts from that document.

Scanned image-only PDFs are not supported yet because OCR is not implemented. Upload documents with readable, selectable text.

When a custom policy is active, click **Use Default Policy** in chat or on the upload page. This clears the browser selection and temporary server copy, restores the built-in `data/handbook.ts`, updates the active policy indicator, and shows **Default policy restored**.

## Privacy and Security

- The API key stays on the server. Questions and relevant policy excerpts are sent to Anthropic Claude to generate answers.
- Uploaded documents are processed in memory without a database or permanent file storage. Extracted text expires after eight hours and is cleared on server restart; expired entries are removed when the store is accessed.
- PolicyPal does not access employee records. Questions requiring personal leave balances, salary, tax, grievance outcomes, or performance records should be referred to People & Culture or a manager.
- Only upload documents you are authorised to share. This prototype has no account authentication and is intended for local development.

## Contributors

COIT13232 Business Analysis Project Team

- Brijesh
- Sovanvichea Rachna
- S M Sabbir Rashid Sajib
- Nikitha Perera

## Academic Disclaimer

PolicyPal is an academic prototype for the COIT13232 Business Analysis Project. It explores access to workplace policy information with privacy and escalation controls. AI answers may be inaccurate; verify important information with the cited policy and People & Culture. It does not provide legal or medical advice or replace professional HR guidance.
