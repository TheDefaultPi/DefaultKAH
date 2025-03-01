# Khan Academy Hacks (Answer Reveler)

This repository contains a JavaScript snippet designed to reveal answers on Khan Academy assessments. It works by intercepting API requests and extracting correct answers from the question data.

**Disclaimer:** Use this tool responsibly and ethically. Cheating undermines the learning process and can have negative consequences.

## How It Works

The script overrides the `window.fetch` function to intercept requests to the `/getAssessmentItem` endpoint. When a question is loaded, the script parses the JSON response, extracts the correct answers, and displays them in the browser's console. It also handles image rendering for graph-based questions.

**Key Features:**

* **Answer Extraction:** Extracts correct answers for various question types (multiple choice, free response, etc.).
* **Image Rendering:** Displays images embedded in questions.
* **Clean Console Output:** Presents answers in a formatted and readable manner.
* **One-Time Header:** Displays a header message in the console only once.

## Usage

1.  **Open Khan Academy:** Navigate to the assessment you want to use.
2.  **Open Developer Tools:** Press F12 (or right-click and select "Inspect").
3.  **Go to the Console Tab:** Select the "Console" tab in the developer tools.
4.  **Paste the Script:** Copy the JavaScript code from this repository and paste it into the console.
5.  **Press Enter:** Execute the script by pressing Enter.
6.  **Start the Quiz/Assessment:** Begin the assessment. You might need to answer a question and then restart the quiz for the script to fully inject and function properly.
7.  **View Answers:** The correct answers will be displayed in the console as you progress through the assessment.

**Important Notes:**

* This script relies on the structure of Khan Academy's API, which may change in the future.
* The effectiveness of the script may vary depending on the type of questions and assessments.
* This script is meant for educational purposes only. Please use responsibly.

## Code Explanation

The JavaScript code performs the following actions:

* Defines an `Answer` class to represent and display answers.
* Overrides the `window.fetch` function to intercept API requests.
* Parses the question data and extracts correct answers.
* Displays the answers in the console.

## Sources

* [https://www.youtube.com/watch?v=151NXMk0a2c](https://www.youtube.com/watch?v=151NXMk0a2c)
* [https://www.youtube.com/watch?v=2ZibeAyAy_o](https://www.youtube.com/watch?v=2ZibeAyAy_o)
* [https://www.w3schools.com/](https://www.w3schools.com/)
