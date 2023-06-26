const db = require('../util/database');

module.exports = class User_Quiz {
    constructor(user_id, quiz_id ,score,date_completed){

    this.user_id = user_id;
    this.quiz_id = quiz_id;
    this.score = score;
    }

    static allScore() {
        return db.execute(
            'SELECT * FROM userquiz WHERE user_id = ?'
        );
    }

    static saveScore(user) {
        return db.execute(
            'INSERT INTO userquiz (user_id, quiz_id, score) VALUES (?,?,?)',
            [user.user_id, user.quiz_id, user.score]
        );
    }
};

