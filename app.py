from flask import Flask, render_template, request, jsonify
import calculator

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/evaluate', methods=['POST'])
def evaluate():
    json_data = request.get_json()
    input = json_data['input']
    result = jsonify(str(calculator.evaluate(input)))
    return result, 200

if __name__ == '__main__':
    app.run(debug=True)