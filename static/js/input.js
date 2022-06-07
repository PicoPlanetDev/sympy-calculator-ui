var mathFieldSpan = document.getElementById('math-field');
var latexFieldSpan = document.getElementById('latex-field');
var MQ = MathQuill.getInterface(2);
var mathField = MQ.MathField(mathFieldSpan, {
    spaceBehavesLikeTab: true,
    handlers: {
        edit: function () {
            mathField.focus()
            latexFieldSpan.innerText = mathField.latex()
        }
    }
});

function command(str) {
    mathField.cmd(str)
    mathField.focus()
}

function typeText(str) {
    mathField.write(str)
    mathField.focus()
}

function key(str) {
    mathField.keystroke(str)
    mathField.focus()
}

function clear() {
    mathField.latex('')
    mathField.focus()
}

function submit() {
    var latex = mathField.latex()
    console.log(latex)
    $.ajax({
        type: "POST",
        url: "/evaluate",
        data: JSON.stringify({ "input": latex }),
        contentType: "application/json",
        dataType: "json",
        success: function (result) {
            add_history(latex, result)
            clear()
        }
    });
}

function add_history(input, result) {
    // Create an new history entry
    var history_entry = document.createElement('div')
    history_entry.className = 'history-entry row'
    // Add a horizontal rule for the entry
    var history_entry_hr = document.createElement('hr')
    history_entry_hr.style.margin = '0px'

    var history_input_container = document.createElement('div')
    var history_input = document.createElement('span')
    history_input_container.className = 'history-input-container col'
    history_input.className = 'history-input'
    MQ.StaticMath(history_input).latex(input)
    history_input_container.appendChild(history_input)

    var history_result_container = document.createElement('div')
    var history_result = document.createElement('span')
    history_result_container.className = 'history-result-container col'
    history_result.className = 'history-result'
    MQ.StaticMath(history_result).latex(result)
    history_result_container.appendChild(history_result)


    // Get the entire history div and append the new entry
    var history = document.getElementById('history')
    history.appendChild(history_entry)

    history_entry.appendChild(history_input_container) // Add the input
    history_entry.appendChild(history_result_container) // Add the result
    history_entry.appendChild(history_entry_hr) // Add the horizontal rule
}

$(document).ready(function () {
    $('#math-field').on('keydown', function (e) {
        if (e.keyCode == 13) {
            e.preventDefault()
            submit()
        }
    })
});