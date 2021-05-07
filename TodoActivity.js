class TodoActivity {
    id = null
    title = null;
    checked = false;
    status =  'ACTiVE';
    updatedDate = null;
    creationDate = null;

    constructor(id, title, checked, status, updatedDate, creationDate) {
        this.id = id
        this.title = title;
        this.checked = checked;
        this.status = status;
        this.updatedDate = updatedDate;
        this.creationDate = creationDate;
    }
}