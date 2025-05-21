'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import logo from '../../public/logo.png';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const router = useRouter();

  const handleLogin = () => {
    if (email === process.env.NEXT_PUBLIC_ADMIN_EMAIL && senha === process.env.NEXT_PUBLIC_ADMIN_PASSWORD) {
      localStorage.setItem('auth', 'true');
      router.push('/home');
    } else {
      alert('Credenciais inválidas');
    }
  };

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-[#0a1d3a] text-white">
      <Image src={logo} alt="Logo" width={150} height={50} className="mb-6" />
      <h1 className="text-2xl font-bold mb-4 text-white">Login</h1>
      <input
        type="email"
        placeholder="Email"
        className="mb-2 p-2 rounded border border-white text-white placeholder-white bg-transparent"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Senha"
        className="mb-4 p-2 rounded border border-white text-white placeholder-white bg-transparent"
        value={senha}
        onChange={(e) => setSenha(e.target.value)}
      />
      <button
        onClick={handleLogin}
        className="bg-blue-500 px-4 py-2 rounded hover:bg-blue-600"
      >
        Entrar
      </button>

      <footer className="text-center text-sm text-gray-400 mt-12 border-t border-gray-600 pt-4">
        <p>Developed by José Henrique</p>
        <p className='text-red-500'>Esse projeto não é um projeto oficial do Serpro</p>
      </footer>
    </main>
  );
}