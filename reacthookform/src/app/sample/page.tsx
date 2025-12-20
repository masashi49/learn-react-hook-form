'use client';

// tailwindcssを使用したスタイリングでreactdomponentを囲む
// 名前、メール、メッセージ、select、ラジオ、の各フィールドを持つお問い合わせフォームを作成
import { useState } from 'react';
import { useController, useForm, useWatch } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Controller } from 'react-hook-form';

import {
  contactSampleSchema,
  ContactSampleFormValues,
  SELECT_OPTIONS,
} from '../../zod/zodSchema';
import {
  Box,
  Button,
  FormControlLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  Typography,
} from '@mui/material';
import { RHFTextField } from './components/rhfTextField';

export default function Home() {
  const [submitStatus, setSubmitStatus] = useState<
    'idle' | 'submitting' | 'success' | 'error'
  >('idle');

  // React Hook Formの初期化
  const {
    handleSubmit,
    reset,
    control,
    formState: { errors },
    // 初期値の型を指定
  } = useForm<ContactSampleFormValues>({
    // バリテーションスキーマの適用
    resolver: zodResolver(contactSampleSchema),
    defaultValues: {
      // 初期値を入力
      name: '',
      email: '',
      message: '',
      select: undefined,
      radio: 'second',
    },
  });
  const selected = useWatch({
    control,
    name: 'select',
  });

  // 送信処理
  const onSubmit = async (data: ContactSampleFormValues) => {
    console.log('フォームデータ:', data);
    console.log('選択された値:', selected);
    setSubmitStatus('submitting');

    try {
      // API呼び出し処理...
      setSubmitStatus('success');
      reset(); // フォームリセット
    } catch (error) {
      setSubmitStatus('error');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-white p-6 rounded shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-4">お問い合わせフォーム</h1>
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <Box className="mb-4">
            <RHFTextField name="name" control={control} label="名前2" />
          </Box>

          <Box className="mb-4">
            <RHFTextField
              name="email"
              control={control}
              label="メールアドレス2"
            />
          </Box>

          <Box className="mb-4">
            <Typography variant="subtitle1">セレクトボックス</Typography>
            <Controller
              name="select"
              control={control}
              render={({ field, fieldState }) => (
                <>
                  <Select
                    {...field}
                    value={field.value ?? ''}
                    onChange={(e) => field.onChange(e.target.value)}
                    className={`w-full p-2 border rounded ${
                      errors.select ? 'border-red-500' : 'border-gray-300'
                    }`}
                  >
                    <MenuItem value="" disabled>
                      選択してください
                    </MenuItem>
                    {SELECT_OPTIONS.slice(1).map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </Select>
                  <p className="text-red-500">{fieldState.error?.message}</p>
                </>
              )}
            />
          </Box>
          {selected === 'a' && (
            <div className="mb-4 p-2 bg-yellow-100 border border-yellow-300 rounded">
              <Typography variant="body2" className="text-yellow-800">
                「A」が選択されました！
              </Typography>
            </div>
          )}
          <div className="mb-4">
            <Typography variant="subtitle1">radio</Typography>
            <Controller
              name="radio"
              control={control}
              render={({ field }) => (
                <RadioGroup
                  {...field}
                  aria-labelledby="demo-radio-buttons-group-label"
                  className={`w-full p-2 border rounded ${
                    errors.radio ? 'border-red-500' : 'border-gray-300'
                  }`}
                >
                  <FormControlLabel
                    value="first"
                    control={<Radio />}
                    label="first"
                  />
                  <FormControlLabel
                    value="second"
                    control={<Radio />}
                    label="second"
                  />
                  <FormControlLabel
                    value="third"
                    control={<Radio />}
                    label="third"
                  />
                </RadioGroup>
              )}
            />
          </div>
          <div className="mb-4">
            <RHFTextField
              name="message"
              control={control}
              multiline
              rows={5}
              label="お問い合わせ内容"
            />
          </div>
          <Button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition"
            disabled={submitStatus === 'submitting'}
          >
            {submitStatus === 'submitting' ? '送信中...' : '送信'}
          </Button>
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
