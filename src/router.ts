import { Router } from "express";
import { createProduct, deleteProduct, getProduct, getProductById, updateAvailability, updateProduct } from "./handlers/product";
import { body, param } from "express-validator";
import { handleInputErrors } from "./middlewares";

const router = Router();

/** 
* @swagger 
* components: 
*       schemas:
*             Product: 
*                   type: object
*                   properties:
*                       id:                
*                           type: integer
*                           description: The Product ID
*                           example: 1    
*                       name: 
*                           type: integer
*                           description: The Product Name                        
*                           example: Monitor Led 42" 
* 
*                       price: 
*                           type: integer
*                           description: The Product Price                        
*                           example: 300
*                       availability: 
*                           type: boolean
*                           description: The Product Availability                        
*                           example: true
*/

/**
 *  @swagger
 * /api/products:
 *      get:
 *          summary: Get a list of products
 *          tags:
 *              - Products
 *          description: Return a list of products
 *          responses: 
 *                200:
 *                    description: Succesful response
 *                    content:
 *                        application/json:
 *                             schema:
 *                                  type: array
 *                                  items: 
 *                                      $ref: '#/components/schemas/Product'
 */


router.get('/', getProduct);

/**
 * @swagger
 * /api/products/{id}:
 *      get: 
 *          summary: Get a product by ID
 *          tags: 
 *              - Products 
 *          description: Return a product based on its unique ID
 *          parameters:
 *            - in: path
 *              name: id
 *              description: The ID of the product to retrieve
 *              required: true
 *              schema: 
 *                      type: integer
 *          responses: 
 *              200: 
 *                  description: Successful Response
 *                  content: 
 *                      application/json:
 *                          schema: 
 *                              $ref: '#/components/schemas/Product'     
 *              404: 
 *                  description: Not Found
 *              400:
 *                  description: Bad Request - Invalid ID    
 */

router.get('/:id', param('id').isInt().withMessage('ID not valid'), handleInputErrors, getProductById);

/**
 * @swagger
 * /api/products:
 *  post:
 *      summary: Creates a new Product
 *      tags: 
 *          - Products
 *      description: Returns a new record in the database
 *      requestBody:
 *          required: true  
 *          content: 
 *              application/json:
 *                 schema: 
 *                      type: object
 *                      properties: 
 *                          name:  
 *                              type: string
 *                              example: "Monitor Led 50 Pulgadas 4k"
 *                          price:  
 *                              type: number
 *                              example: 399
 *      responses:           
 *           201: 
 *              description: Product created successfully 
 *           400: 
 *              description: Bad Request - Invalid input data 
 */

router.post('/', 
    //validacion
    body('name').notEmpty().withMessage('Product name not empty'),
    body('price')
            .isNumeric().withMessage('the value must be a number')
            .notEmpty().withMessage('Price name not empty')
            .custom(value => value > 0).withMessage('Price not valid'), 
            handleInputErrors,
            createProduct 
        );

/**
 * @swagger
 * /api/products/{id}:
 *  put: 
 *      summary: Updates a product with user input
 *      tags:
 *          - Products
 *      description: Returns the updated product  
 *      parameters:
 *        - in: path 
 *          name: id 
 *          description: The ID of the product to retrive
 *          required: true
 *          schema: 
 *              type: integer
 *      requestBody:    
 *          required: true
 *          content:
 *              application/json:
 *                  schema:  
 *                       type: object
 *                       properties: 
 *                            name:
 *                                type: string
 *                                example: "Monitor Led 50 Pulgadas 4k"
 *                            price: 
 *                                 type: number 
 *                                 example: 399 
 *                            availability:  
 *                                 type: boolean
 *                                 example: true
 *      responses:      
 *          200:
 *              description: Successful Response
 *              content: 
 *                  application/json:
 *                      schema: 
 *                           $ref: '#/components/schemas/Product'
 *          400:
 *              description: Bad Request - Invalid ID or Invalid input data           
 *          404: 
 *              description: Product Not Found
 */

router.put('/:id', param('id').isInt().withMessage('ID not valid'),
    body('name').notEmpty().withMessage('Product name not empty'),
    body('price')
        .isNumeric().withMessage('the value must be a number')
        .notEmpty().withMessage('Price name not empty')
        .custom(value => value > 0).withMessage('Price not valid'), 
    body('availability').isBoolean().withMessage('Valor para disponibilidad no valido'),
        handleInputErrors,
        updateProduct 
);

/**
 * @swagger
 * /api/products/{id}:
 *  patch:
 *      summary: Update Product availability
 *      tags:
 *          - Products
 *      description: Returns the availability
 *      parameters:
 *        - in: path
 *          name: id
 *          description: The ID of the product to retrieve
 *          required: true
 *          schema:
 *              type: integer
 *      responses:     
 *           200:
 *               description: Successful Response
 *               content: 
 *                   application/json:
 *                       schema: 
 *                            $ref: '#/components/schemas/Product'
 *           400:
 *               description: Bad Request - Invalid ID       
 *           404: 
 *               description: Product Not Found
 */

router.patch('/:id', param('id').isInt().withMessage('ID not valid'), handleInputErrors, updateAvailability);

/**
 * @swagger
 * /api/products/{id}:
 *  delete:
 *      summary: Deletes a product by a given ID
 *      tags:
 *          - Products
 *      description: Returns a confirmation message
 *      parameters:
 *        - in: path
 *          name: id
 *          description: The ID of the product to delete
 *          required: true
 *          schema:
 *              type: integer
 *      responses:     
 *           200:
 *               description: Successful Response
 *               content: 
 *                   application/json:
 *                       schema: 
 *                            type: string
 *                            value: 'Producto Eliminado' 
 *           400:
 *               description: Bad Request - Invalid ID       
 *           404: 
 *               description: Product Not Found
 */

router.delete('/:id', param('id').isInt().withMessage('ID not valid'), handleInputErrors, deleteProduct);

export default router;