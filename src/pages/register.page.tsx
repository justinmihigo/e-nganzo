import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiUser, FiMail, FiLock, FiMapPin, FiAlertCircle, FiCheckCircle } from 'react-icons/fi';
import { FcGoogle } from 'react-icons/fc';
import { AiFillApple } from 'react-icons/ai';
// import { useAuth } from '../hooks/useAuth';

// Define types for form data
interface RegisterFormData {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
    country: string;
    role: 'artist' | 'customer';
    bio?: string;
    portfolioLink?: string;
    skills?: string[];
    agreeTerms: boolean;
}

// Available skills for artists
const availableSkills = [
    'Painting', 'Sculpture', 'Digital Art', 'Photography',
    'Traditional Crafts', 'Jewelry', 'Pottery', 'Textiles',
    'Wood Carving', 'Mixed Media', 'NFT Creation'
];

// Countries list
const countries = [
    'Rwanda', 'Kenya', 'Uganda', 'Tanzania', 'Ethiopia',
    'Nigeria', 'Ghana', 'South Africa', 'Egypt', 'Morocco',
    // Add more countries as needed
    'Other'
];

const RegisterPage: React.FC = () => {
    const [formData, setFormData] = useState<RegisterFormData>({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        country: '',
        role: 'customer',
        bio: '',
        portfolioLink: '',
        skills: [],
        agreeTerms: false
    });

    const [errors, setErrors] = useState<Record<string, string>>({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [registrationSuccess, setRegistrationSuccess] = useState(false);
    const register = ({ }: Record<string, any>) => { }
    const registerWithGoogle = () => { }
    const registerWithApple = () => { }
    const navigate = useNavigate();

    const validateForm = () => {
        const newErrors: Record<string, string> = {};

        // Validate name
        if (!formData.name.trim()) {
            newErrors.name = 'Name is required';
        }

        // Validate email
        if (!formData.email.trim()) {
            newErrors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Email is invalid';
        }

        // Validate password
        if (!formData.password) {
            newErrors.password = 'Password is required';
        } else if (formData.password.length < 8) {
            newErrors.password = 'Password must be at least 8 characters';
        }

        // Validate password confirmation
        if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = 'Passwords do not match';
        }

        // Validate country
        if (!formData.country) {
            newErrors.country = 'Country is required';
        }

        // Validate artist specific fields
        if (formData.role === 'artist') {
            if (!formData.bio || formData.bio.trim().length < 10) {
                newErrors.bio = 'Please provide a bio (minimum 10 characters)';
            }

            if (formData.skills && formData.skills.length === 0) {
                newErrors.skills = 'Please select at least one skill';
            }
        }

        // Validate terms agreement
        if (!formData.agreeTerms) {
            newErrors.agreeTerms = 'You must agree to the terms and conditions';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, checked } = e.target;
        setFormData({ ...formData, [name]: checked });
    };

    const handleSkillChange = (skill: string) => {
        const updatedSkills = formData.skills?.includes(skill)
            ? formData.skills.filter(s => s !== skill)
            : [...(formData.skills || []), skill];

        setFormData({ ...formData, skills: updatedSkills });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        setIsSubmitting(true);

        try {
            await register({
                name: formData.name,
                email: formData.email,
                password: formData.password,
                country: formData.country,
                role: formData.role,
                bio: formData.bio,
                portfolioLink: formData.portfolioLink,
                skills: formData.skills
            });

            setRegistrationSuccess(true);

            // Redirect after successful registration after a short delay
            setTimeout(() => {
                navigate('/login', { state: { message: 'Registration successful! Please login.' } });
            }, 2000);
        } catch (error) {
            setErrors({ submit: 'Registration failed. Please try again.' });
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleGoogleRegister = async () => {
        try {
            await registerWithGoogle();
            navigate('/');
        } catch (error) {
            setErrors({ submit: 'Google registration failed. Please try again.' });
        }
    };

    const handleAppleRegister = async () => {
        try {
            await registerWithApple();
            navigate('/');
        } catch (error) {
            setErrors({ submit: 'Apple registration failed. Please try again.' });
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-xl mx-auto bg-white rounded-xl shadow-md overflow-hidden">
                <div className="p-8">
                    <div className="text-center mb-8">
                        <Link to="/">
                            <img className="h-12 w-auto mx-auto" src="/logo.svg" alt="e-nganzo" />
                        </Link>
                        <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
                            Create your account
                        </h2>
                        <p className="mt-2 text-sm text-gray-600">
                            Join our community to discover and collect African art
                        </p>
                    </div>

                    {registrationSuccess && (
                        <div className="mb-6 bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg flex items-center">
                            <FiCheckCircle className="mr-2 flex-shrink-0" />
                            <span>Registration successful! Redirecting to login...</span>
                        </div>
                    )}

                    {errors.submit && (
                        <div className="mb-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg flex items-center">
                            <FiAlertCircle className="mr-2 flex-shrink-0" />
                            <span>{errors.submit}</span>
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Role Selection */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Register as
                            </label>
                            <div className="flex space-x-4">
                                <label className="flex items-center">
                                    <input
                                        type="radio"
                                        name="role"
                                        value="customer"
                                        checked={formData.role === 'customer'}
                                        onChange={handleChange}
                                        className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300"
                                    />
                                    <span className="ml-2 text-gray-700">Customer</span>
                                </label>
                                <label className="flex items-center">
                                    <input
                                        type="radio"
                                        name="role"
                                        value="artist"
                                        checked={formData.role === 'artist'}
                                        onChange={handleChange}
                                        className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300"
                                    />
                                    <span className="ml-2 text-gray-700">Artist</span>
                                </label>
                            </div>
                        </div>

                        {/* Basic Information */}
                        <div className="space-y-4">
                            <div>
                                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                                    Full Name
                                </label>
                                <div className="mt-1 relative rounded-md shadow-sm">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <FiUser className="h-5 w-5 text-gray-400" />
                                    </div>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        className={`block w-full pl-10 pr-3 py-2 border ${errors.name ? 'border-red-300' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm`}
                                        placeholder="John Doe"
                                    />
                                </div>
                                {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
                            </div>

                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                    Email Address
                                </label>
                                <div className="mt-1 relative rounded-md shadow-sm">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <FiMail className="h-5 w-5 text-gray-400" />
                                    </div>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        className={`block w-full pl-10 pr-3 py-2 border ${errors.email ? 'border-red-300' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm`}
                                        placeholder="your@email.com"
                                    />
                                </div>
                                {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
                            </div>

                            <div>
                                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                                    Password
                                </label>
                                <div className="mt-1 relative rounded-md shadow-sm">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <FiLock className="h-5 w-5 text-gray-400" />
                                    </div>
                                    <input
                                        type="password"
                                        id="password"
                                        name="password"
                                        value={formData.password}
                                        onChange={handleChange}
                                        className={`block w-full pl-10 pr-3 py-2 border ${errors.password ? 'border-red-300' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm`}
                                        placeholder="Minimum 8 characters"
                                    />
                                </div>
                                {errors.password && <p className="mt-1 text-sm text-red-600">{errors.password}</p>}
                            </div>

                            <div>
                                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                                    Confirm Password
                                </label>
                                <div className="mt-1 relative rounded-md shadow-sm">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <FiLock className="h-5 w-5 text-gray-400" />
                                    </div>
                                    <input
                                        type="password"
                                        id="confirmPassword"
                                        name="confirmPassword"
                                        value={formData.confirmPassword}
                                        onChange={handleChange}
                                        className={`block w-full pl-10 pr-3 py-2 border ${errors.confirmPassword ? 'border-red-300' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm`}
                                        placeholder="Re-enter your password"
                                    />
                                </div>
                                {errors.confirmPassword && <p className="mt-1 text-sm text-red-600">{errors.confirmPassword}</p>}
                            </div>

                            <div>
                                <label htmlFor="country" className="block text-sm font-medium text-gray-700">
                                    Country
                                </label>
                                <div className="mt-1 relative rounded-md shadow-sm">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <FiMapPin className="h-5 w-5 text-gray-400" />
                                    </div>
                                    <select
                                        id="country"
                                        name="country"
                                        value={formData.country}
                                        onChange={handleChange}
                                        className={`block w-full pl-10 pr-3 py-2 border ${errors.country ? 'border-red-300' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm`}
                                    >
                                        <option value="">Select your country</option>
                                        {countries.map((country) => (
                                            <option key={country} value={country}>
                                                {country}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                {errors.country && <p className="mt-1 text-sm text-red-600">{errors.country}</p>}
                            </div>
                        </div>

                        {/* Artist-specific fields */}
                        {formData.role === 'artist' && (
                            <div className="space-y-4 p-4 bg-purple-50 rounded-md">
                                <h3 className="text-lg font-medium text-purple-700">Artist Information</h3>

                                <div>
                                    <label htmlFor="bio" className="block text-sm font-medium text-gray-700">
                                        Bio / Artist Statement
                                    </label>
                                    <textarea
                                        id="bio"
                                        name="bio"
                                        rows={4}
                                        value={formData.bio}
                                        onChange={handleChange}
                                        className={`mt-1 block w-full border ${errors.bio ? 'border-red-300' : 'border-gray-300'} rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500 sm:text-sm`}
                                        placeholder="Tell us about yourself and your artistic journey..."
                                    ></textarea>
                                    {errors.bio && <p className="mt-1 text-sm text-red-600">{errors.bio}</p>}
                                </div>

                                <div>
                                    <label htmlFor="portfolioLink" className="block text-sm font-medium text-gray-700">
                                        Portfolio Link (Optional)
                                    </label>
                                    <input
                                        type="url"
                                        id="portfolioLink"
                                        name="portfolioLink"
                                        value={formData.portfolioLink}
                                        onChange={handleChange}
                                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
                                        placeholder="https://yourportfolio.com"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Skills & Specialties
                                    </label>
                                    <div className="grid grid-cols-2 gap-2">
                                        {availableSkills.map((skill) => (
                                            <label key={skill} className="flex items-center">
                                                <input
                                                    type="checkbox"
                                                    checked={formData.skills?.includes(skill) || false}
                                                    onChange={() => handleSkillChange(skill)}
                                                    className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
                                                />
                                                <span className="ml-2 text-sm text-gray-700">{skill}</span>
                                            </label>
                                        ))}
                                    </div>
                                    {errors.skills && <p className="mt-1 text-sm text-red-600">{errors.skills}</p>}
                                </div>
                            </div>
                        )}

                        {/* Terms and conditions */}
                        <div>
                            <label className="flex items-start">
                                <input
                                    type="checkbox"
                                    name="agreeTerms"
                                    checked={formData.agreeTerms}
                                    onChange={handleCheckboxChange}
                                    className="h-4 w-4 mt-1 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
                                />
                                <span className="ml-2 text-sm text-gray-700">
                                    I agree to the{' '}
                                    <Link to="/terms-of-service" className="text-purple-600 hover:text-purple-500">
                                        Terms of Service
                                    </Link>{' '}
                                    and{' '}
                                    <Link to="/privacy-policy" className="text-purple-600 hover:text-purple-500">
                                        Privacy Policy
                                    </Link>
                                </span>
                            </label>
                            {errors.agreeTerms && <p className="mt-1 text-sm text-red-600">{errors.agreeTerms}</p>}
                        </div>

                        {/* Submit button */}
                        <div>
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {isSubmitting ? 'Creating account...' : 'Create Account'}
                            </button>
                        </div>
                    </form>

                    <div className="mt-6">
                        <div className="relative">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-gray-300"></div>
                            </div>
                            <div className="relative flex justify-center text-sm">
                                <span className="px-2 bg-white text-gray-500">Or sign up with</span>
                            </div>
                        </div>

                        <div className="mt-6 grid grid-cols-2 gap-3">
                            <button
                                onClick={handleGoogleRegister}
                                className="w-full flex justify-center items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                            >
                                <FcGoogle className="h-5 w-5 mr-2" />
                                Google
                            </button>
                            <button
                                onClick={handleAppleRegister}
                                className="w-full flex justify-center items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                            >
                                <AiFillApple className="h-5 w-5 mr-2" />
                                Apple
                            </button>
                        </div>
                    </div>

                    <div className="mt-6 text-center">
                        <p className="text-sm text-gray-600">
                            Already have an account?{' '}
                            <Link to="/login" className="font-medium text-purple-600 hover:text-purple-500">
                                Login
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RegisterPage;