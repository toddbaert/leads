var leadSchema = {
    type: 'object',
    properties: {
        leadName: {
            type: 'string',
            required: true
        },
        salesRep: {
            type: 'string',
            required: true
        },
        salesRep: {
            type: 'string',
            required: true
        },
        value: {
            type: 'number',
            required: true
        },
        value: {
            type: 'number',
            required: true
        }
    }
}

module.exports = {
    leadSchema: leadSchema
};