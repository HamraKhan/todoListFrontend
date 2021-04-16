class TodoActivity {
    title = null;
    checked = false;
    status =  'ACTiVE';
    todoDate = null;

    constructor(title, checked, status, todoDate) {
        this.title = title;
        this.checked = checked;
        this.status = status;
        this.todoDate = todoDate;
    }
}