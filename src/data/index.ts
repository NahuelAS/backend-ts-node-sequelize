import { exit } from 'node:process';
import db from '../config/db';

const clearDB = async () => {
    try {
        await db.sync({force: true});
        console.log('data eliminated successfully');
        exit(0); //0 significa que termino correctamente
    } catch (err) {
        console.log(err);
        exit(1); //1 significa que termino con errores
    }
}

if (process.argv[2] === '--clear') {
    clearDB();
}

// console.log(process.argv);


//process.argv[2] = es un comando que se ejecuta desde CLI de node.js
//[2] = es la posicion ej.: en npm run dev --clear (--clear es la posicion 2)

/* 
![
!    'C:\\Users\\nahue\\Desktop\\Api_Ts_Srv\\node_modules\\ts-node\\dist\\bin.js',
!    'C:\\Users\\nahue\\Desktop\\Api_Ts_Srv\\src\\data'
!]
esto se ejecuta en el process.argv siendo la primer linea la posicion 0
la segunda la posicion 1 
y la tercera la posicion dos que en este casi seria (--clear).

en package.json quedaria un comando asi:
?  "db": "ts-node ./src/data --clear"
            0          1          2
*/

//Otro Cambio
//* "pretest": "ts-node ./src/data --clear" 
//Ahora con "pretest" lo que hace es ejecutarse antes de ejecutar "test"
//se ejecuta automaticamente cuando se ejecuta (npm test) si necesidad de tener que llamarlo.

//!Otro Dato
// para ejecutar algo despues de npm test se usa:
//? "posttest"