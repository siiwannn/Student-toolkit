import InputError from '@/Components/InputError';
import Button from '@/Components/Button';
import Input from '@/Components/Input';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, useForm, Link } from '@inertiajs/react';

export default function ForgotPassword({ status }) {
    const { data, setData, post, processing, errors } = useForm({
        email: '',
    });

    const submit = (e) => {
        e.preventDefault();

        post(route('password.email'));
    };

    return (
        <GuestLayout>
            <Head title="Forgot Password" />

            <div className="text-center mb-8">
                <h1 className="text-2xl font-semibold text-gray-900">Forgot Password</h1>
                <p className="text-sm text-gray-600 mt-2">
                    Forgot your password? No problem. Just let us know your email address and we will email you a password reset link that will allow you to choose a new one.
                </p>
            </div>

            {status && (
                <div className="mb-6 text-sm font-medium text-green-600 text-center">
                    {status}
                </div>
            )}

            <form onSubmit={submit}>
                <Input
                    id="email"
                    type="email"
                    name="email"
                    value={data.email}
                    className="mt-1 block w-full"
                    isFocused={true}
                    onChange={(e) => setData('email', e.target.value)}
                    placeholder="Enter your email"
                />

                <InputError message={errors.email} className="mt-2" />

                <div className="mt-6">
                    <Button className="w-full" disabled={processing}>
                        Email Password Reset Link
                    </Button>
                </div>

                <div className="mt-6 text-center text-sm text-gray-600">
                    Remember your password?{' '}
                    <Link href={route('login')} className="text-[#7132F5] hover:text-[#5a27c4] font-medium focus:outline-none focus:ring-2 focus:ring-[#7132F5] focus:ring-offset-2 rounded-md">
                        Log in
                    </Link>
                </div>
            </form>
        </GuestLayout>
    );
}
