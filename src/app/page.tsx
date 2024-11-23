import { GetServerSideProps } from "next";
import { supabase } from "@/app/database/database";
import AnimalCard from "@/app/components/AnimalCard";
import { Animal } from "@/app/types";

type Props = {
  animals: Animal[];
};

export default async function Home() {
	const { data: animals, error } = await supabase.from('animals').select('*');

	if (error) {
		return <div>Error loading animals</div>;
	}

	const updateStatus = async (id: string, status: string) => {
		const response = await fetch(`/api/animals/${id}`, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ status }),
		});

		if (!response.ok) {
			window.location.reload();
		} else {
			console.error('Failed to update status');
		}
	};

	console.log(animals);

	return (
		<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
			{animals.map((animal) => (
				<AnimalCard key={animal.id} animal={animal} onUpdateStatus={updateStatus} />
			))}
		</div>
	);
}