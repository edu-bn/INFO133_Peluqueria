import pg from 'pg'
const { Client } = pg

const sentencia = async()=>{
    const client = new Client({
        user: 'postgres',
        password: '1234',
        host: 'localhost',
        port: 5432,
        database: 'a',
    })
    await client.connect()
    
    const res = await client.query('select * from venta')
    await client.end()
    return res.rows
};

sentencia().then((result)=>{
    console.log(result)
});