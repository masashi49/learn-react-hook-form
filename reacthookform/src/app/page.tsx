'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { contactSchema, ContactFormValues } from '../zod/zodSchema';

export default function Home() {
  const [submitStatus, setSubmitStatus] = useState<
    'idle' | 'submitting' | 'success' | 'error'
  >('idle');

  // React Hook Formの初期化
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: '',
      email: '',
      message: '',
    },
  });

  // 送信処理
  const onSubmit = async (data: ContactFormValues) => {
    console.log('フォームデータ:', data);
    setSubmitStatus('submitting');

    try {
      // API呼び出し処理...
      setSubmitStatus('success');
      reset(); // フォームリセット
    } catch (error) {
      setSubmitStatus('error');
      console.error('送信エラー:', error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-white p-6 rounded shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-4">お問い合わせフォーム</h1>
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <div className="mb-4">
            <label className="block mb-1 font-semibold" htmlFor="name">
              お名前
            </label>
            <input
              id="name"
              type="text"
              {...register('name')}
              className={`w-full p-2 border rounded ${
                errors.name ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
            )}
          </div>
          <div className="mb-4">
            <label className="block mb-1 font-semibold" htmlFor="email">
              メールアドレス
            </label>
            <input
              id="email"
              type="email"
              {...register('email')}
              className={`w-full p-2 border rounded ${
                errors.email ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">
                {errors.email.message}
              </p>
            )}
          </div>
          <div className="mb-4">
            <label className="block mb-1 font-semibold" htmlFor="message">
              お問い合わせ内容
            </label>
            <textarea
              id="message"
              rows={5}
              {...register('message')}
              className={`w-full p-2 border rounded ${
                errors.message ? 'border-red-500' : 'border-gray-300'
              }`}
            ></textarea>
            {errors.message && (
              <p className="text-red-500 text-sm mt-1">
                {errors.message.message}
              </p>
            )}
          </div>
          <button
            type="submit"
            disabled={submitStatus === 'submitting'}
            className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 disabled:bg-gray-400"
          >
            {submitStatus === 'submitting' ? '送信中...' : '送信'}
          </button>
          {submitStatus === 'success' && (
            <p className="text-green-500 text-center mt-4">
              送信が成功しました！
            </p>
          )}
          {submitStatus === 'error' && (
            <p className="text-red-500 text-center mt-4">
              送信中にエラーが発生しました。もう一度お試しください。
            </p>
          )}
        </form>
      </div>
    </div>
  );
}
