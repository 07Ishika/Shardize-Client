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
  Badge,
  Alert,
} from '@mantine/core';
import AuthBrandPanel from '../components/ui/AuthBrandPanel';
import { authInputClassNames } from '../styles/mantineClassNames';
import { isValidEmail } from '../utils/validators';
import '../styles/theme.css';

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);


  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');

    if (!form.email || !form.password) {
      setError('Enter your email and password.');
      return;
    }

    if (!isValidEmail(form.email)) {
      setError('Enter a valid email address.');
      return;
    }

    setLoading(true);
    try {
      await login(form);
      navigate('/dashboard');
    } catch (err) {
      const message =
        err.response?.data?.detail ||
        'Could not log in. Check your email and password.';
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
            <Badge className="auth-form-badge">Secure access</Badge>
            <Title order={3} className="auth-title" mt="sm">
              Welcome back
            </Title>
            <Text className="auth-sub" mt="xs">
              Log in to access your encrypted files.
            </Text>

            {error && <Alert title="Error" color="red" mt="md">{error}</Alert>}

            <form onSubmit={handleSubmit}>
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
                placeholder="Your password"
                value={form.password}
                onChange={handleChange}
                mt="md"
                classNames={authInputClassNames}
                required
              />

              <Button
                type="submit"
                fullWidth
                mt="xl"
                radius="xl"
                loading={loading}
                className="auth-submit-button"
              >
                Log in
              </Button>
            </form>

            <Text className="auth-form-footnote" size="sm" ta="center" mt="md">
              Your data is encrypted before it ever leaves your device.
            </Text>
          </Card>

          <div className="auth-footer-link">
            Don't have an account? <Link to="/register">Create one</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
