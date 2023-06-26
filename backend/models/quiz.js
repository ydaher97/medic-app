const db = require('../util/database');

module.exports = class  quezzes {
    constructor(title, describtion ,duration,is_completed,category){

    this.title = title;
    this.describtion = describtion;
    this.duration = duration;
    this.category = category;
    this.is_completed = is_completed;


    }

    static fetchAll() {
        return db.execute(
            'SELECT * FROM quiz'
        );
    }

    static fetchQ() {
        return db.execute(
            `SELECT q.question_id, q.question_text, z.quiz_id, z.name AS quiz_name, z.description AS quiz_description
            FROM questions AS q
            INNER JOIN quizzes AS z ON q.quiz_id = z.quiz_id
            WHERE z.quiz_id = ?`,
            [quizId]
        );
    }

    static save(post) {
        return db.execute(
            'INSERT INTO quiz (title, body, duration, category) VALUES (?,?,?,?)',
            [post.title, post.describtion, post.duration, post.category]
        );
    }

    static delete(id) {
        return db.execute(
            'DELETE  FROM quiz WHERE id = ?', [id]
        );
    }
};

