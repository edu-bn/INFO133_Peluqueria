import pg from 'pg'
const { Client } = pg

const sentencia = async()=>{
    const client = new Client({
        user: 'postgres',
        password: 'isaiasxd',
        host: 'localhost',
        port: 5432,
        database: 'TiendasComerciales',
    })
    await client.connect()
    
    const res = await client.query('select * from boleta')
    await client.end()
    result = rest,rows[0].mesagge;
};

sentencia().then((result)=>{
    console.log(result)
});