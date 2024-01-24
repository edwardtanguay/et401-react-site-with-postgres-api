import { useEffect, useState } from "react";
import axios from "axios";

const backendUrl = "http://localhost:4882";

interface IEmployee {
	first_name: string;
	last_name: string;
	age: number;
}

export const PageWelcome = () => {
	const [appMessage, setAppMessage] = useState("");
	const [employees, setEmployees] = useState<IEmployee[]>([]);

	useEffect(() => {
		try {
			(async () => {
				const response = await axios.get(`${backendUrl}/employees`);
				setEmployees(response.data);
			})();
		} catch (e: any) {
			console.log(`ERROR: ${e.message}`);
			setAppMessage(
				`Sorry, we can't retrieve your data at this time. Try again later.`
			);
		}
	})

	return (
		<>
			<h2 className="text-red-600">{appMessage}</h2>
			{appMessage === "" && (
				<>
				<h2>There are {employees.length} employees:</h2>
				<ul className="list-disc ml-6 mt-3">
					{employees.map((employee, index) => {
						return (
							<li key={index}>{employee.first_name} {employee.last_name} is {employee.age} years old.</li>
						)
					})}
				</ul>
				</>
			)}
		</>
	);
};
