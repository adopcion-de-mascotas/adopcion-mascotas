const endpointResponse = ({
    res,
    code = 200,
    status = true,
    message,
    body = {},
    options = {}
}) => {
    return res.status(code).json({
        status,
        code,
        message,
        data: body,
        options
    })
}

module.exports = {
    endpointResponse,
}
