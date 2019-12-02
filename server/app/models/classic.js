const {sequelize} = require('../../core/db')
const {Sequelize, Model} = require('sequelize')

// 定义公共字段
const classicFields = {
    image: Sequelize.STRING,
    content: Sequelize.STRING,
    pubdate: Sequelize.DATEONLY,
    fav_nums: Sequelize.INTEGER,
    title: Sequelize.STRING,
    type: Sequelize.TINYING
}

class Movie extends Model {
}

Movie.init(classicFields, {
    sequelize,
    tableName: 'movie'
})

class Sentence extends Model {
}

Sentence.init(classicFields, {
    sequelize,
    tableName: 'Sentence'
})

class Music extends Model {
}

Music.init({
    ...classicFields,
    url: Sequelize.STRING
}, {
    sequelize,
    tableName: 'movie'
})


module.exports = {
    Movie,
    Sentence,
    Music
}