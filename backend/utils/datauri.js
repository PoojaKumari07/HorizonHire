// import DataUriParser from "datauri/parser.js"

// import path from "path";

// const getDataUri = (file) => {
//     const parser = new DataUriParser();
//     const extName = path.extname(file.originalname).toString();
//     return parser.format(extName, file.buffer);
// }

// export default getDataUri;

import DataUriParser from "datauri/parser.js"

import path from "path";

const getDataUri = (file) => {
    // Add null/undefined check
    if (!file) {
        throw new Error('File is required but not provided');
    }
    
    // Additional checks for required properties
    if (!file.originalname) {
        throw new Error('File originalname is missing');
    }
    
    if (!file.buffer) {
        throw new Error('File buffer is missing');
    }
    
    const parser = new DataUriParser();
    const extName = path.extname(file.originalname).toString();
    return parser.format(extName, file.buffer);
}

export default getDataUri;