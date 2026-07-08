import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
  Card,
  Title,
  Text,
  Button,
  TextInput,
  PasswordInput,
  Select,
  Badge,
  Alert,
} from '@mantine/core';
import AuthBrandPanel from '../components/ui/AuthBrandPanel';
import { authInputClassNames } from '../styles/mantineClassNames';
import { isValidEmail, isStrongPassword } from '../utils/validators';
import '../styles/theme.css';

export default function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'consumer',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);


  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');

    if (!form.username || !form.email || !form.password) {
      setError('Fill in all fields.');
      return;
    }
    if (!isValidEmail(form.email)) {
      setError('Enter a valid email address.');
      return;
    }
    if (form.password !== form.confirmPassword) {
      setError('Passwords do not match.');
      return;
    }
    if (!isStrongPassword(form.password)) {
      setError('Password must be at least 8 characters.');
      return;
    }

    setLoading(true);
    try {
      await register(form);
      navigate('/login');
    } catch (err) {
      const message =
        err.response?.data?.detail ||
        'Could not create the account. Try a different username or email.';
      setError(message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="auth-shell">
      {/* Left: brand panel */}
      <AuthBrandPanel
        headline={<>Empowering secure,<br />decentralized storage</>}
        subtext="Shard, replicate, and protect your files with end-to-end client-side encryption across a private IPFS network."
      />

      {/* Right: form panel */}
      <div className="auth-form-panel">
        <div className="auth-form-wrap">
          <Card shadow="lg" radius="md" className="auth-form-card" p="lg">
            <Badge className="auth-form-badge">Join the Shardize network</Badge>
            <Title order={3} className="auth-title" mt="sm">Create account</Title>
            <Text className="auth-sub" mt="xs">Store files, encrypted, across a trustless network.</Text>

            {error && <Alert title="Error" color="red" mt="md">{error}</Alert>}

            <form onSubmit={handleSubmit}>
              <TextInput
                id="username"
                name="username"
                label="Username"
                placeholder="meet22"
                value={form.username}
                onChange={handleChange}
                mt="md"
                classNames={authInputClassNames}
                required
              />

              <TextInput
                id="email"
                name="email"
                label="Email"
                placeholder="name@company.com"
                value={form.email}
                onChange={handleChange}
                mt="md"
                classNames={authInputClassNames}
                required
              />

              <PasswordInput
                id="password"
                name="password"
                label="Password"
                placeholder="At least 8 characters"
                value={form.password}
                onChange={handleChange}
                mt="md"
                classNames={authInputClassNames}
                required
              />

              <PasswordInput
                id="confirmPassword"
                name="confirmPassword"
                label="Confirm password"
                placeholder="Re-enter your password"
                value={form.confirmPassword}
                onChange={handleChange}
                mt="md"
                classNames={authInputClassNames}
                required
              />

              <Select
                id="role"
                name="role"
                label="Account type"
                data={[
                  { value: 'consumer', label: 'Storage consumer (upload & store files)' },
                  { value: 'provider', label: 'Storage provider (host files, earn rewards)' },
                ]}
                value={form.role}
                onChange={(val) => setForm({ ...form, role: val })}
                mt="md"
                classNames={authInputClassNames}
              />

              <Button type="submit" fullWidth mt="xl" radius="xl" loading={loading} className="auth-submit-button">
                Register
              </Button>
            </form>

            <Text className="auth-form-footnote" size="sm" ta="center" mt="md">Your data stays encrypted and never leaves your control.</Text>
          </Card>

          <div className="auth-footer-link">
            Already have an account? <Link to="/login">Log in</Link>
          </div>
        </div>
      </div>
    </div>
  );
}