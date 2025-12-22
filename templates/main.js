fetch('http://127.0.0.1:5000/tasks')
    .then(response => response.json())
    .then(tasks => {
        const pendingList = document.getElementById('task-list');
        const completedList = document.getElementById('completed-task-list');

        tasks.forEach(task => {
        const item = document.createElement('li');
        item.textContent = task.name + ' - ' + task.due_date;

        const completeBtn = document.createElement('button');
        completeBtn.textContent = 'Concluir';
        completeBtn.addEventListener('click', () => {
            fetch('http://127.0.0.1:5000/complete_task', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(task)
            })
            .then(() => {
                completedList.appendChild(item);
            });
        });
        item.appendChild(completeBtn);

        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Deletar';
        deleteBtn.addEventListener('click', () => {
            fetch('http://127.0.0.1:5000/delete_task', {
                method: 'DELETE',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(task)
            })
            .then(() => {
                item.remove();
            });
        });
        item.appendChild(deleteBtn);

        if(task.completed){
            completedList.appendChild(item);
        } else {
            pendingList.appendChild(item);
        }
    });

    });
const modal = document.getElementById('task-modal');
const openBtn = document.getElementById('criar-tarefa-btn');
const closeBtn = document.getElementById('close-modal');

openBtn.addEventListener('click', () => {
    modal.style.display = 'flex';
});

closeBtn.addEventListener('click', () => {
    modal.style.display = 'none';
});

const form = document.getElementById('task-form');

form.addEventListener('submit', function(event) {
    event.preventDefault();

    const formData = new FormData(form);
    const data = {
        name: formData.get('name'),
        due_date: formData.get('due_date'),
        completed: false
    };

    fetch('http://127.0.0.1:5000/create_task', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(task => {
        const pendingList = document.getElementById('task-list');
        const item = document.createElement('li');
        item.textContent = task.name + ' - ' + task.due_date;
        pendingList.appendChild(item);

        modal.style.display = 'none';
        form.reset();
    });
});

