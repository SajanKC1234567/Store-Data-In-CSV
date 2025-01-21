Cypress.on("uncaught:exception", (err, runnable) => {
    return false;
});

Cypress.Commands.add('AddTitleRatingSummary', (ulClass) => {
    const allExtractedData = [];

    cy.get(`.${ulClass} li`).each(($li, i) => {
        const extractedData = {};

        const nthChildSelector = `.${ulClass} > :nth-child(${i + 1})`;
        cy.get(`${nthChildSelector} .ipc-title__text`).then(($title) => {
            extractedData.title = $title.length > 0 ? $title.text().trim() : 'title null';
        })
            .get(`${nthChildSelector} .ipc-rating-star--rating`).then(($rating) => {
                extractedData.rating = $rating.length > 0 ? $rating.text().trim() : 'rating null';
            })
            .get(`${nthChildSelector} .ipc-rating-star--voteCount`).then(($voteCount) => {
                extractedData.voteCount = $voteCount.length > 0 ? $voteCount.text().trim() : 'vote null';
            })
            .get(`${nthChildSelector} .ipc-html-content-inner-div`).then(($summary) => {
                extractedData.summary = $summary.length > 0 ? $summary.text().trim() : 'details null';
            })
            .then(() => {
                allExtractedData.push(extractedData);
            })
    }).then(() => {
        const jsonToCsv = (json) => {
            const headers = Object.keys(json[0]).join(',') + '\n';
            const rows = json.map(obj => Object.values(obj).join(',')).join('\n');
            return headers + rows;
        };
        if (allExtractedData.length > 0) {
            // const csv = jsonToCsv([extractedData]);
            const csv = jsonToCsv(allExtractedData);
            cy.writeFile('cypress/fixtures/data.csv', csv);
        }
    });
});
