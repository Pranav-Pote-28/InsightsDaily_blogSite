import mysql from "mysql"

export const db=mysql.createPool(
    {
        host:"localhost",
        user:"root",
        password:"1234",
        database:"blog",
        port:3306
}

)