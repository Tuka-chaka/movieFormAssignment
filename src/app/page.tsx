import MovieForm from "@/components/movieForm/MovieForm";
import StepPlaceholder from "@/components/stepPlaceholder/StepPlaceholder";


type PageProps = {
  searchParams?: { [key: string]: string | string[] | undefined }
}

export default async function Home({searchParams}: PageProps) {

  const currSearchParams = await searchParams;

  const step = parseInt(currSearchParams!['step'] as string ?? '1')

  if (step === 1)
  return (
      <MovieForm/>
  );

  else return <StepPlaceholder/>
}
