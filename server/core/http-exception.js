// 封装错误处理的基类
class HttpException extends Error {
    constructor(msg = '服务器异常', errorCode = 10000, code = 400) {
        super();
        this.errorCode = errorCode
        this.code = code
        this.msg = msg
    }
}

class ParameterException extends HttpException {
    constructor(msg = '参数错误', errorCode = 10000) {
        super();
        this.code = 400;
        this.msg = msg
        this.errorCode = errorCode
    }
}

class Success extends HttpException {
    constructor(msg = 'ok', errorCode = 0) {
        super();
        this.code = 201;
        this.msg = msg;
        this.errorCode = errorCode;
    }
}

class NotFound extends HttpException {
    constructor(msg = '资源未找到', errorCode = 10000) {
        super();
        this.code = 404;
        this.msg = msg;
        this.errorCode = errorCode;
    }
}

class AuthFailed extends HttpException {
    constructor(msg = '授权失败', errorCode = 10004) {
        super();
        this.code = 401;
        this.msg = msg;
        this.errorCode = errorCode;
    }
}

class Forbbiden extends HttpException {
    constructor(msg = '禁止访问', errorCode = 10006) {
        super();
        this.code = 403;
        this.msg = msg;
        this.errorCode = errorCode;
    }
}

class LikeError extends HttpException {
    constructor(msg = '您已经点过赞了', errorCode = 10000) {
        super();
        this.code = 400;
        this.msg = msg;
        this.errorCode = errorCode;
    }
}

class DisLikeError extends HttpException {
    constructor(msg = '您尚未点过赞', errorCode = 10000) {
        super();
        this.code = 400;
        this.msg = msg;
        this.errorCode = errorCode;
    }
}


module.exports = {
    HttpException,
    ParameterException,
    Success,
    NotFound,
    AuthFailed,
    Forbbiden,
    LikeError,
    DisLikeError
};