(function () {
    'use strict';
    window.loaded = false;

    class Answer {
        constructor(body, type) {
            this.body = body;
            this.type = type;
        }

        log() {
            const answer = this.body
                .map(ans => {
                    if (typeof ans === "string") {
                        if (ans.includes("web+graphie")) {
                            this.printImage(ans);
                            return "";
                        }
                        return ans.replaceAll("$", "");
                    }
                    return ans;
                })
                .filter(Boolean); // Remove empty strings

            const text = answer.join("\n").trim();
            if (text) {
                console.log(`%c${text}`, "color: white; -webkit-text-stroke: .5px black; font-size:24px; font-weight:bold;");
            }
        }

        printImage(ans) {
            const url = ans.replace("![](web+graphie", "https").replace(")", ".svg");
            const image = new Image();
            image.onload = () => {
                const style = `font-size: 1px; line-height: ${image.height % 2}px; padding: ${image.height * 0.5}px ${image.width * 0.5}px; background-size: ${image.width}px ${image.height}px; background: url(${url});`;
                console.log('%c ', style);
            };
            image.src = url;
        }
    }

    function extractAnswers(question, filterFn) {
        return Object.values(question.widgets)
            .flatMap(widget => {
                if (widget.options?.choices) {
                    return widget.options.choices.filter(filterFn).map(choice => choice.content);
                } else if (widget.options?.answers) {
                    return widget.options.answers.filter(filterFn).map(answer => answer.value);
                } else if (widget.options?.answerForms) {
                    return widget.options.answerForms.filter(filterFn).map(answer => answer.value);
                } else if (widget.options?.inexact === false) {
                    return widget.options.value;
                }
                return [];
            })
            .filter(Boolean);
    }

    const originalFetch = window.fetch;
    window.fetch = function () {
        return originalFetch.apply(this, arguments).then(async (res) => {
            if (res.url.includes("/getAssessmentItem")) {
                try {
                    const json = await res.clone().json();
                    const question = JSON.parse(json.data.assessmentItem.item.itemData).question;

                    if (question) {
                        Object.keys(question.widgets).forEach(widgetName => {
                            const widgetType = widgetName.split(" ")[0];
                            let answer;

                            switch (widgetType) {
                                case "numeric-input":
                                case "input-number":
                                    answer = new Answer(extractAnswers(question, a => a.status === "correct"), "free_response");
                                    break;
                                case "radio":
                                case "dropdown":
                                    answer = new Answer(extractAnswers(question, c => c.correct), widgetType);
                                    break;
                                case "expression":
                                    answer = new Answer(extractAnswers(question, a => Object.values(a).includes("correct")), "expression");
                                    break;
                                default:
                                    return;
                            }
                            answer.log();
                        });
                    }
                } catch (error) {
                    console.error("Error processing assessment item:", error);
                }
            }

            if (!window.loaded) {
                console.clear();
                console.log("%c DefaultKAH ", "color: black; -webkit-text-stroke: .5px black; font-size:40px; font-weight:bolder; padding: .2rem;");
                console.log("%cCreated by TheDefaultPi", "color: white; -webkit-text-stroke: .5px black; font-size:15px; font-weight:bold;");
                window.loaded = true;
            }

            return res;
        });
    };
})();
