import { LoginForm } from "@/components/auth/login-form";
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Login - UpendoWaYesu',
  description: 'Log in to your UpendoWaYesu account.',
};

export default function LoginPage() {
  return <LoginForm />;
}
