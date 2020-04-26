// Attach event listners
function attachEventListeners() {
  const cards = document.querySelectorAll('.card');
  const cardContainerAll = document.querySelectorAll('.card-container');
  cards.forEach((card) => {
    card.addEventListener('dragstart', () => card.classList.add('dragging'));
    card.addEventListener('dragend', () => card.classList.remove('dragging'));
  });
  cardContainerAll.forEach((container) => {
    container.addEventListener('dragover', (e) => {
      const dragElement = document.querySelector('.dragging');
      e.preventDefault();
      container.appendChild(dragElement);
    });
  });
}

const getTasks = () => {
  return JSON.parse(localStorage.getItem('tasks'));
};

const setTasks = (tasks) => {
  localStorage.setItem('tasks', JSON.stringify(tasks));
};

const renderCard = (task) => {
  return `
        <div class="card" data-taskId="${task.id}" draggable="true">
            <h3 class="card-title">
            ${task.title}
            </h3>
            <img src="./img/1.jpg" alt="User image" />
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

  attachEventListeners();
};

(async function () {
  let tasks = getTasks() || [];

  let response = await fetch('./data/db.json');
  tasks = await response.json();
  setTasks(tasks);
  renderTaskCard(tasks);
})();
