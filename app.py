from flask import Flask, render_template, request, jsonify, url_for
import calculator

app = Flask(__name__)

@app.route('/')
def index():
    root = url_for('index', _external=True)
    return render_template('index.html', root=root)

@app.route('/evaluate', methods=['POST'])
def evaluate():
    json_data = request.get_json()
    input = json_data['input']
    result = jsonify(str(calculator.print_latex(calculator.doit(input))))
    return result, 200

@app.route('/plot', methods=['POST'])
def plot():
    json_data = request.get_json()
    input = json_data['input']
    plot = jsonify(calculator.plot(input))
    return plot, 200

if __name__ == '__main__':
    app.run(debug=True)