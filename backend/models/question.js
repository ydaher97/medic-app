const db = require('../util/database');

module.exports = class Questions {
    constructor(quiz_id, question_text){

    this.quiz_id = quiz_id;
    this.question_text = question_text;

    }

    static fetchAll() {
        return db.execute(
            'SELECT * FROM question'
        );
    }

    static save(question) {
        return db.execute(
            'INSERT INTO question (quiz_id, question_text) VALUES (?,?)',
            [quiz_id, question_text]
        );
    }

    static delete(q_id) {
        return db.execute(
            'DELETE  FROM question WHERE id = ?', [q_id]
        );
    }

    static getQuestions() {
        return db.execute(
          `SELECT q.question_id, q.question_text, a.answer_id, a.answer_text, a.is_correct
          FROM question AS q
          LEFT JOIN answer AS a ON q.question_id = a.question_id`
        );
      }
};

