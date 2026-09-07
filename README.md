# PolicyPal Final Project

PolicyPal is an AI-powered HR policy Q&A assistant developed for the COIT13232 Business Analysis Project.

The system allows employees to ask HR policy questions and receive grounded answers based on the approved employee handbook.

PolicyPal also displays the relevant handbook section and escalates questions to People & Culture when a question requires personal employee information, legal advice, medical advice, or another matter that should not be answered automatically.

## Features

- AI-powered HR policy question answering
- Grounded answers based on the employee handbook
- Handbook section citations
- Automatic escalation for out-of-scope questions
- Protection against answering personal employee data questions
- Claude API integration
- Responsive chat interface
- Suggested HR policy questions
- Error handling when the AI service is unavailable

## Technology Stack

- Next.js
- React
- TypeScript
- Tailwind CSS
- Anthropic Claude API
- Next.js API Routes

## How to Run the Project

1. Clone the repository:

```bash
git clone https://github.com/Jd3nz/PolicyPal_Final_Project.git

2. Open the project folder:

```bash
cd PolicyPal_Final_Project

3. Install the required dependencies:

```bash
npm install

4. Create a .env.local file in the project root and add your Anthropic API key:

ANTHROPIC_API_KEY=your_api_key_here

5. Start the development server:

```bash
npm run dev

6. Open the application in your browser:

http://localhost:3000

