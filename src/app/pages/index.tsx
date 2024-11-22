import { GetServerSideProps } from "next";
import { supabase } from "@/app/database/database";
import AnimalCard from "@/app/components/AnimalCard";
import { Animal } from "@/app/types";

type Props = {
  animals: Animal[];
};

const Home: React.FC<Props> = ({ animals }) => {
  const handleUpdateStatus = async (id: string, status: string) => {
	await fetch(`/api/animals/${id}`, {
	  method: "PUT",
	  body: JSON.stringify({ status }),
	});
  };

  return (
	<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
	  {animals.map((animal) => (
		<AnimalCard
		  key={animal.id}
		  animal={animal}
		  onUpdateStatus={handleUpdateStatus}
		/>
	  ))}
	</div>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  const { data } = await supabase.from("animals").select("*");
  return {
	props: {
	  animals: data,
	},
  };
};

export default Home;