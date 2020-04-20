/* eslint-env browser */

/**
 * Add detected object info as a row in the table.
 * @param {Object} table
 * @param {string} cellType
 * @param {[]} values
 */
function addRow(table, cellType, values) {
  const row = document.createElement('tr');
  for (let i = 0; i < values.length; i++) {
    const val = values[i];
    const cell = document.createElement(cellType);
    const text = document.createTextNode(val);
    cell.appendChild(text);
    row.appendChild(cell);
  }
  table.appendChild(row);
}

/**
 * Create and populate a table to show the result details.
 * @param {[]} detectedObjects
 * @param {Object} parent
 */
function detectedObjectsTable(detectedObjects, parent) {
  if (detectedObjects.length > 0) {
    const table = document.createElement('table');

    addRow(table, 'th', ['Class', 'Confidence Score']);

    for (let i = 0; i < detectedObjects.length; i++) {
      const obj = detectedObjects[i];
      const label = obj['class'];
      const conf = obj['score'].toFixed(3);

      addRow(table, 'td', [label, conf]);
    }
    parent.appendChild(table);
  }
}

window.addEventListener('load', function() {
  const article = document.querySelector('article');

  /**
   * Populate the article with formatted results.
   * @param {Object} jsonResult
   */
  function populateArticle(jsonResult) {
    // Remove previous results
    article.innerHTML = '';

    if (jsonResult.hasOwnProperty('data')) {

        let classified = jsonResult.data.classes;

        score = 0 ;
        for (let i = 0; i < classified.length; i++) {
          const obj = classified[i];
          score = score + obj['score']*(1000000);
        }

        const myCount = document.createElement('h3');
        myCount.textContent = "Estimated Cost : Rs. " + score;
        article.appendChild(myCount);
        detectedObjectsTable(classified, article);
    } else {
      const myDiv = document.createElement('div');
      myDiv.className = 'error';
      myDiv.id = 'error-div';
      const myTitle = document.createElement('h3');
      myTitle.textContent = 'ERROR';
      myDiv.appendChild(myTitle);
      // Dump keys/values to show error info
      for (const key in jsonResult) {
        if (jsonResult.hasOwnProperty(key)) {
          const myP = document.createElement('p');
          myP.textContent = key + ':  ' + jsonResult[key];
          myDiv.appendChild(myP);
        }
      }
      article.appendChild(myDiv);
    }
  }

  // When upload results are loaded (hidden), use them build the results.
  const raw = top.frames['mytarget'];
  const myTarget = document.getElementById('mytarget');
  if (myTarget) { // optional for tests
    myTarget.addEventListener('load', function() {
      let rawContent = raw.document.body.innerText;
      console.log(rawContent);
      let rawJson = JSON.parse(rawContent);
      console.log(rawJson);
      populateArticle(rawJson);
    });
  }

  // image preview
  document.getElementById("foo").addEventListener("change", imagePreview);
  function imagePreview() {
    let input = document.querySelector('input[type=file]');
    if (input.files && input.files[0]) {
      let fileReader = new FileReader();
      fileReader.onload = function () {
        const imagePreview = document.getElementById('imagePreview');
        imagePreview.src = fileReader.result;
        imagePreview.style = "display: block;";
      };

      fileReader.readAsDataURL(input.files[0]);
    }
  }
});
