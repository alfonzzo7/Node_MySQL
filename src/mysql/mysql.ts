import mysql = require('mysql');

export default class MySQL {
    
    private static _instance: MySQL;

    cnn: mysql.Connection;
    conected: boolean = false;

    constructor() {
        console.log('Clase MySQL inicializada');

        this.cnn = mysql.createConnection({
            host     : 'localhost',
            user     : 'node_user',
            password : '1234',
            database : 'node_db'
        });

        this.conectar();
    }

    public static get instance() {
        return this._instance || (this._instance = new this());
    }

    public static query(query: string, callback: Function) {
        this.instance.cnn.query(query, (error, results: Object[], fields) => {
            if (error) {
                console.log('Error en query', error);
                return callback(error);
            }

            if (results.length === 0){
                callback('No se encontraron registros');
            } else {
                callback(null, results);
            }
          });
    }

    private conectar() {
        this.cnn.connect((err: mysql.MysqlError) => {
            if (err) {
                console.log(err.message);
                return;
            }

            this.conected = true;
            console.log('BBDD online');
        });
    }



}