import React from 'react';
import { Animal } from '@/app/types';

type Props = {
	animal: Animal;
	onUpdateStatus: (id: string, status: string) => void;
};

const AnimalCard: React.FC<Props> = ({ animal, onUpdateStatus }) => {
	const handleUpdateStatus = async (status: string) => {
		await onUpdateStatus(animal.id, status);
	};

	return (
		<div className="border border-gray-200 rounded-lg p-4">
			<h2 className="text-xl font-semibold">{animal.name}</h2>
			<p className="text-gray-500">{animal.species}</p>
			<p className="text-gray-500">{animal.status}</p>
			<div className="flex space-x-2">
				<button
					className="bg-green-500 text-white px-4 py-2 rounded-lg"
					onClick={() => handleUpdateStatus('Adopted')}
				>
					Adopted
				</button>
				<button
					className="bg-red-500 text-white px-4 py-2 rounded-lg"
					onClick={() => handleUpdateStatus('Available')}
				>
					Available
				</button>
			</div>
		</div>
	);
};

export default AnimalCard;