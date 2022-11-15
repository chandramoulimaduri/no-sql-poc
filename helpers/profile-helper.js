
// Organize profile
const organizeProfile = (profiles, organize, value) =>{
organized_results = {}
for(let i = 0; i < profiles.length; i++) {
    const profile = profiles[i];
    if(!(profile[organize] in organized_results)){
    organized_results[profile[organize]] = {}
    }
    organized_results[profile[organize]][profile['user']] = profile[value];
}
return organized_results
}

const validate = (value, message) => {
    if (!value
        || (typeof value === 'object' && Object.keys(value).length === 0)
    ) {
        const error = new Error(message);
        error.status = 400;
        throw error;
    }
};

const validateRequestBodyExists = (body) => {
    validate(body, 'Request body required');
}

const validateIsObject = (group) => {
    if (typeof group === 'object' && Object.keys(group).length > 0) {
        return;
    }

    const error = new Error(
        `Inside attribute must be an object`
    );
    error.status = 400;
    throw error;
}

module.exports = {
    validateRequestBodyExists,
    organizeProfile,
    validateIsObject
};