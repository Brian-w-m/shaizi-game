import DiceRoller from "@/components/DiceRoller";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-10">
      <DiceRoller />
    </main>
  );
}