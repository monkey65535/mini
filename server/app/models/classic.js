const {sequelize} = require('../../core/db')
const {Sequelize, Model} = require('sequelize')

// 定义公共字段
const classicFields = {
    image: {
        type: Sequelize.STRING,
        comment: "背景图片"
    },
    content: {
        type: Sequelize.STRING,
        comment: "内容"
    },
    pubdate: {
        type: Sequelize.DATEONLY,
        comment: "日期"
    },
    fav_nums: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
        comment: "点赞数"
    },
    title: {
        type: Sequelize.STRING,
        comment: "标题"
    },
    type: {
        type: Sequelize.TINYINT,
        comment: "类型"
    },
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
    tableName: 'sentence'
})

class Music extends Model {
}

// Node不支持对象的展开运算符
Music.init(Object.assign({url: Sequelize.STRING}, classicFields), {
    sequelize,
    tableName: 'movie'
})


module.exports = {
    Movie,
    Sentence,
    Music
}