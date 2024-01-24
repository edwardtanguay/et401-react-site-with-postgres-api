import express from 'express';
import cors from 'cors';
import  pkg from 'pg';

const { Pool} = pkg;

const dbConfig = {
	host: '127.0.0.1',
	database: 'southwind',
	user: 'webuser',
	password: 'thepass',
	port: 5432
};

const pool = new Pool(dbConfig);

interface IEmployee {
	first_name: string;
	last_name: string;
	age: number;
}

const app = express();
app.use(cors());
const port = 4882;

app.get('/employees', (_req, res) => {

	const queryText = 'SELECT * FROM employees';

	pool.query(queryText, (err: unknown, result:any) => {
		if (err) {
			pool.end(); 
			throw(err);
		} else {
			const employees: IEmployee[] = result.rows;
			res.json(employees);
			pool.end();
		}
	});

});

app.listen(port, () => {
	console.log(`server is running at http://localhost:${port}`);
});