"use strict";

const Entity = require('./entity');

class Note extends Entity {
    constructor(repository, row) {
        super(repository, row);

        if (this.isJson()) {
            this.jsonContent = JSON.parse(this.content);
        }
    }

    isJson() {
        return this.type === "code" && this.mime === "application/json";
    }

    async getAttributes() {
        return this.repository.getEntities("SELECT * FROM attributes WHERE noteId = ?", [this.noteId]);
    }

    async getAttribute(name) {
        return this.repository.getEntity("SELECT * FROM attributes WHERE noteId = ? AND name = ?", [this.noteId, name]);
    }

    async getRevisions() {
        return this.repository.getEntities("SELECT * FROM note_revisions WHERE noteId = ?", [this.noteId]);
    }

    async getTrees() {
        return this.repository.getEntities("SELECT * FROM note_tree WHERE isDeleted = 0 AND noteId = ?", [this.noteId]);
    }
}

module.exports = Note;