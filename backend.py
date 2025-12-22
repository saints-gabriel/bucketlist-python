from flask import Flask, render_template, jsonify, request
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

tasks = [
]

@app.route('/')
def main():
    return render_template('home.html')

@app.route('/tasks')
def get_tasks():
    return jsonify(tasks)

@app.route('/create_task', methods=['POST'])
def create_task():
    data = request.get_json()
    tasks.append(data)
    return jsonify(data)

@app.route('/complete_task', methods=['POST'])
def complete_task():
    data = request.get_json()
    for t in tasks:
        if t['name'] == data['name'] and t['due_date'] == data['due_date']:
            t['completed'] = True
            break
    return jsonify({'success': True})

@app.route('/delete_task', methods=['DELETE'])
def delete_task():
    data = request.get_json()
    global tasks
    tasks = [t for t in tasks if not (t['name'] == data['name'] and t['due_date'] == data['due_date'])]
    return jsonify({'success': True})



if __name__ == '__main__':
    app.run(debug=True, port=5000)