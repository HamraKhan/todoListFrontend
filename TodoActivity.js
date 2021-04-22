class TodoActivity {
    id = null
    title = null;
    checked = false;
    status =  'ACTiVE';
    todoDate = null;

    constructor(id, title, checked, status, todoDate) {
        this.id = id
        this.title = title;
        this.checked = checked;
        this.status = status;
        this.todoDate = todoDate;
    }
}