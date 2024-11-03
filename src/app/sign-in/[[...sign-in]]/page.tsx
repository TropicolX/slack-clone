import { SignIn } from '@clerk/nextjs';

export default function Page() {
  return (
    <div className="w-svw h-svh bg-purple flex items-center justify-center">
      <SignIn />
    </div>
  );
}
