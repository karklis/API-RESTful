class Helper {
    sendReponse = function(res?, statusCode?, data?) {
        res.status(statusCode).json({ result: data });
    };
}

export default new Helper();