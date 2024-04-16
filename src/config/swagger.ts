import swaggerJSDoc from "swagger-jsdoc";
import { SwaggerUiOptions } from "swagger-ui-express";

const options: swaggerJSDoc.Options = {
    swaggerDefinition: {
        openapi: '3.0.2',
        tags: [
            {
                name: 'Products',
                description: 'Operations about products'
            }
        ],
        info: {
            title: 'API for Products',
            version: '1.0.0',
            description: 'API for Products'
        }
    },
    apis: ['./src/router.ts']
}

const swaggerSpec = swaggerJSDoc(options);

const swaggerUiOptions: SwaggerUiOptions = {
    customCss: `
        .topbar-wrapper .link {
            height: 120px;
            width: auto;
        }
    `,
    customSiteTitle: 'API for Products'
}

export default swaggerSpec;
export {
    swaggerUiOptions
}