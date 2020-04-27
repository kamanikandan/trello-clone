const getTasks = () => {
  return JSON.parse(localStorage.getItem('tasks'));
};

const setTasks = (tasks) => {
  localStorage.setItem('tasks', JSON.stringify(tasks));
};
let task_Id = 0;
let tasks = getTasks() || [];

// Attach event listners
function attachEventListeners() {
  const cards = document.querySelectorAll('.card');
  const addTaskContainer = document.querySelector('.add-task');
  const taskBoardContainer = document.querySelector('.board-container');
  const cardContainerAll = document.querySelectorAll('.card-container');
  const btnSubmit = document.querySelector('#addForm');
  const addBtn = document.querySelector('#btnAdd');

  cards.forEach((card) => {
    card.addEventListener('dragstart', () => card.classList.add('dragging'));
    card.addEventListener('dragend', () => card.classList.remove('dragging'));
  });
  cardContainerAll.forEach((container) => {
    container.addEventListener('dragover', (e) => {
      const dragElement = document.querySelector('.dragging');
      const beforeEl = document.querySelector('.dragover');
      e.preventDefault();
      container.appendChild(dragElement);
    });
  });

  addBtn.addEventListener('click', () => {
    taskBoardContainer.classList.add('hide');
    addTaskContainer.classList.remove('hide');
  });

  btnSubmit.addEventListener('submit', (e) => {
    e.preventDefault();
    createTask();
    btnSubmit.reset();
  });
}

const createTask = () => {
  const addTaskContainer = document.querySelector('.add-task');
  const taskBoardContainer = document.querySelector('.board-container');
  const taskName = document.querySelector('#task_title');
  const taskAssigned = document.querySelector('#task_assigned');
  const taskStatus = document.querySelector('#task_status');
  const taskPriority = document.querySelector('#task_priority');
  const taskBrowser = document.querySelector('#task_browser');

  const task = {
    id: ++task_Id,
    title: taskName.value,
    status: taskStatus.value,
    assignedTo: {
      userId: taskAssigned.value,
      username: 'Adam Hornibrook',
      img: 'img/1.jpg',
    },
    priority: taskPriority.value,
    browsers: taskBrowser.value,
  };

  tasks.push(task);
  setTasks(tasks);
  renderTaskCard(tasks);
  attachEventListeners();
  taskBoardContainer.classList.remove('hide');
  addTaskContainer.classList.add('hide');
};

const renderCard = (task) => {
  return `
        <div class="card" data-taskId="${task.id}" draggable="true">
            <h3 class="card-title">
            ${task.title}
            </h3>
            <img src="./img/1.jpg" alt="User image" />
            <h4>#${task.id}</h4>
            <div class="card-tags">
            <span class="tag ${task.priority}-priority">Low</span>
            <span class="tag browsers">${task.browsers}</span>
            </div>
        </div>
    `;
};

const renderTaskCard = (tasks) => {
  const formattedTasks = {
    backlog: [],
    progress: [],
    review: [],
    done: [],
  };
  tasks.forEach((task) => {
    switch (task.status) {
      case 'backlog':
        formattedTasks.backlog.push(task);
        break;
      case 'progress':
        formattedTasks.progress.push(task);
        break;
      case 'review':
        formattedTasks.review.push(task);
        break;
      case 'done':
        formattedTasks.done.push(task);
        break;
      default:
        break;
    }
  });
  for (const key in formattedTasks) {
    const renderedTasks = formattedTasks[key]
      .map((task) => renderCard(task))
      .join('');
    const cardContainer = document.querySelector(`#${key}`);
    cardContainer.innerHTML = renderedTasks;
  }
};

setTasks(tasks);
renderTaskCard(tasks);
attachEventListeners();
