
const getErrorInfo = (error) => {
    let errorStatus;
    let errorMsg = '';

    if (error.code && error.code === 'ECONNABORTED') {
        errorStatus = 500;
        errorMsg = `Connection timed out: ${error.message}`;
    } else if (error.code && !error.statusCode && Number.isInteger(error.code)) {
        errorStatus =  error.code;
        errorMsg = error.message;
    } else if (error.statusCode && error.message) {
        errorStatus = error.statusCode;
        errorMsg = error.message;
    } else if (error.status && error.message) {
        errorStatus = error.status;
        errorMsg = error.message;
    } else if (error.response) {
        // server received request and responded with error (4xx, 5xx)
        errorStatus = error.response.status;
        const errorResponse = error.response.data;

        // some components wrap their errors differently
        if (typeof errorResponse === 'object') {
            if (errorResponse.error && errorResponse.error.message) {
                errorMsg = errorResponse.error.message;
            } else {
                errorMsg = errorResponse.message || errorResponse.detail || `${error}`;
            }
        } else if (typeof errorResponse === 'string') {
            errorMsg = errorResponse;
        }
    } else if (error.request && error.request.res) {
        // server never received request
        errorStatus = error.request.res.statusCode;
        errorMsg = error.request.res.statusMessage;
    } else {
        errorStatus = 500;
        errorMsg = `${error}` || 'Server processing error';
    }

    return { errorStatus, errorMsg };
};

const logErrorByHttpStatus = (status, message, logger) => {
    if (status < 500) {
        logger.warn(message);
    } else {
        logger.error(status);
    }
}

module.exports = {
    getErrorInfo,
    logErrorByHttpStatus,
}
