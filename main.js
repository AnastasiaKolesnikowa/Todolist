//моковы данные - придуманные данные
const MOCK_TASKS = [
    { id: 1, title: "Изучить паттерн MVC", isDone: false },
    { id: 2, title: "Подготовить моковые данные", isDone: true },
];

// хранение данных, бизнес-логика
const model = {
    tasks: [], //список задач - массив
    addTask(title) {
        //добавляем задачу
        const newTask = { title: title, isDone: false, id: Math.random() };
        // const newTask = { title, isDone, id };
        // то же, что { title: title, isDone: isDone, id: id }
        this.tasks.push(newTask);

        view.renderTasks(this.tasks); //обновляем представление
        view.renderCount(this.tasks);
    },
    deleteTask(taskId) {
        //удаляем задачу
        this.tasks = this.tasks.filter((task) => task.id !== taskId);

        console.log(this.tasks);
        view.renderTasks(this.tasks);
        view.renderCount(this.tasks);
    },
    toggleTask(taskId) {
        //меняем статус задажи при нажатии
        // воспользуемся методом map
        this.tasks = this.tasks.map((task) => {
            if (task.id === taskId) {
                task.isDone = !task.isDone;
            }
            return task;
        });
        view.renderCount(this.tasks);

        view.renderTasks(model.tasks); // Обновляем представление
    },
    resetTask() {
        this.tasks = this.tasks.filter((task) => !task.isDone);
        view.renderTasks(model.tasks);
        view.renderCount(this.tasks);
    },
};

// отображение данных: рендер списка задач, размещение обработчиков событий
const view = {
    init() {
        this.renderTasks(model.tasks);
        const form = document.querySelector(".form");
        const input = document.querySelector(".input");

        // Добавляем обработчик события на форму
        form.addEventListener("submit", function (event) {
            event.preventDefault(); //предотвращаем стандартное поведение формы
            // const title = document.querySelector(".input").value;

            // const title = input.value;
            // controller.addTask(title); //вызываем метод addTask контролера
            controller.addTask(input.value); //вызываем метод addTask контролера

            input.value = ""; //очищает поле ввода
        });

        const list = document.querySelector(".list");
        list.addEventListener("click", function (event) {
            // проверяем, что кликнули на название задачи
            if (event.target.classList.contains("task-title")) {
                // id задачи хранится в id родительского элемента
                // +, используем унарный плюс для преобразования типа в number
                const taskId = +event.target.parentElement.id;
                controller.toggeleTask(taskId);
            }
            if (event.target.classList.contains("delete-button")) {
                const taskId = +event.target.parentElement.id;
                //вызываем метод контроллера для удаления задачи
                controller.deleteTask(taskId);
            }
        });
        const reset = document.querySelector(".reset");
        reset.addEventListener("click", function (event) {
            controller.resetTask();
        });
    },
    renderTasks(tasks) {
        //ловим события и отрисовываем, параметр tasks - это массив наших заадч
        const list = document.querySelector(".list"); //обращаемся к ul по классу, чтобы в последуешщем добавлять задачи
        let tasksHTML = ""; //создаем пустую строку, будем пушить задачу
        for (let i = 0; i < tasks.length; i++) {
            const task = tasks[i];
            tasksHTML =
                tasksHTML +
                `
        <li id="${task.id}" class="${task.isDone ? "done" : ""}">
        <b class="task-title">${task.title}</b>
        <button class="delete-button" type="button">Удалить 🗑</button>
        </li>
    `;
            //             `
            // <li>
            // <span>${task.title}</span>
            // <button>Удалить</button>
            // </li>
            // `;
        }
        list.innerHTML = tasksHTML; //добавление нашей li в list
    },
    renderCount(tasks) {
        let newTasks = tasks.filter((task) => !task.isDone);

        const count = document.querySelector(".count");
        count.textContent = newTasks.length;
    },
};

// обработка действий пользователя, обновление модели
const controller = {
    addTask(title) {
        if (title.trim() !== "") {
            //добавляем задачу
            model.addTask(title);
        }
    }, //добавляем задачу
    deleteTask(id) {
        model.deleteTask(id);
    }, //удаляем задачу
    toggeleTask(id) {
        model.toggleTask(id);
    }, //меняем статус задажи при нажатии
    resetTask() {
        model.resetTask();
    }, //очищаем список выполненных задач
};

function viewDefault() {
    view.init();
}
viewDefault();
