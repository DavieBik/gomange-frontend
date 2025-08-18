import React, { useState } from 'react';

export interface AuthFormProps {
  title: string;
  buttonText: string;
  onSubmit: (email: string, password: string) => void;
  error?: string;
  success?: string; // <-- agrega esta línea
}

export default function AuthForm({ title, buttonText, onSubmit, error, success }: AuthFormProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSubmit(email, password);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full flex flex-col gap-4"
    >
      <h2 className="text-2xl font-bold text-primary-700 text-center">{title}</h2>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={e => setEmail(e.target.value)}
        className="border border-primary-300 focus:border-primary-500 p-3 rounded-lg outline-none"
        required
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={e => setPassword(e.target.value)}
        className="border border-primary-300 focus:border-primary-500 p-3 rounded-lg outline-none"
        required
      />
      <button
        type="submit"
        className="btn-primary"
      >
        {buttonText}
      </button>
      {error && <div className="text-red-600 mt-4">{error}</div>}
      {success && <div className="text-green-600 mt-4">{success}</div>}
    </form>
  );
}