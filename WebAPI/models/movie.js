exports.movieStructure = { 
    type: 'object',
    required: ["title", "directors", "description", "details", "imdbid"],
    properties: {
        title: {
            type: "string"
        },
        directors: {
            type: "array",
            items: { type: "string" }
        },
        description: {
            type: "string"
        },
        details: {
            type: "object",
            required: ["country", "language",  "production"],
            properties:{
                country: {
                    type: "string",
                },
                language: {
                    type: "array",
                    items:{ type:"string"}
                },
                production: {
                    type: "array",
                    items: { type: "string" }
                }
            }
        },    
        imdbid: {
            type: "string",
        }
    }
}

