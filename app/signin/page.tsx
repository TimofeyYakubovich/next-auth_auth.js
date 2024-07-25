import { GoogleButton } from "@/components/GoogleButton";
import { SignInForm } from "@/components/SignInForm";
import { Suspense } from "react";

// кастомная страница входа
export default async function Signin() {
    return (
        <div className="stack">
          <h1>SignIn</h1>
          <Suspense fallback={<div>Loading...</div>}>
            <GoogleButton />
          </Suspense>
          <div>or</div>
          <SignInForm />
        </div>
    );
}