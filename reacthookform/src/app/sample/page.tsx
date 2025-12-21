'use client';

// tailwindcssを使用したスタイリングでreactdomponentを囲む
// 名前、メール、メッセージ、select、ラジオ、の各フィールドを持つお問い合わせフォームを作成

import { Controller } from 'react-hook-form';
import { SELECT_OPTIONS } from '../../zod/zodSchema';
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
import { useSampleForm } from './hooks/useSampleForm';

export default function Home() {
  const {
    control,
    errors,
    selected,
    onSubmit,
    submitError,
    isSubmitting,
    isSubmitSuccessful,
  } = useSampleForm();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-white p-6 rounded shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-4">お問い合わせフォーム</h1>
        <form onSubmit={onSubmit} noValidate>
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
            disabled={isSubmitting}
          >
            {isSubmitting ? '送信中...' : '送信'}
          </Button>
          {isSubmitSuccessful && !submitError && (
            <p className="text-green-500 text-center mt-4">
              送信が成功しました！
            </p>
          )}
          {submitError === 'error' && (
            <p className="text-red-500 text-center mt-4">
              送信中にエラーが発生しました。もう一度お試しください。
            </p>
          )}
        </form>
      </div>
    </div>
  );
}
