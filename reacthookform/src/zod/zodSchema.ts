import * as z from 'zod';

// バリデーションスキーマの定義
export const contactSchema = z
  .object({
    name: z
      .string()
      .min(2, { message: 'お名前は2文字以上で入力してください' })
      .max(50, { message: 'お名前は50文字以内で入力してください' }),
    email: z
      .string()
      .email({ message: '有効なメールアドレスを入力してください' }),
    message: z
      .string()
      .min(10, { message: 'お問い合わせ内容は10文字以上で入力してください' })
      .max(1000, {
        message: 'お問い合わせ内容は1000文字以内で入力してください',
      }),
  })
  .required({
    name: true,
  });

// 型定義のエクスポート
export type ContactFormValues = z.infer<typeof contactSchema>;
export const SELECT_OPTIONS = [
  { label: '-', value: '' },
  { label: 'A', value: 'a' },
  { label: 'B', value: 'b' },
  { label: 'C', value: 'c' },
] as const;
export const SELECT_VALUES = ['a', 'b', 'c'] as const;

export const contactSampleSchema = z
  .object({
    name: z
      .string()
      .min(2, { message: 'お名前は2文字以上で入力してください' })
      .max(50, { message: 'お名前は50文字以内で入力してください' }),
    email: z
      .string()
      .email({ message: '有効なメールアドレスを入力してください' })
      .optional()
      .or(z.literal('')),
    message: z
      .string()
      .min(10, { message: 'お問い合わせ内容は10文字以上で入力してください' })
      .max(1000, {
        message: 'お問い合わせ内容は1000文字以内で入力してください',
      })
      .optional(),
    select: z.enum(SELECT_VALUES, {
      message: '選択してください',
    }),
    radio: z.enum(['first', 'second', 'third'], {
      message: 'ラジオボタンの選択肢を選んでください',
    }),
  })
  .required({
    name: true,
  })
  .superRefine((data, ctx) => {
    if (data.select !== 'b' && !data.message) {
      ctx.addIssue({
        path: ['message'],
        code: z.ZodIssueCode.custom,
      });
    }
  });

// 型定義のエクスポート
export type ContactSampleFormValues = z.infer<typeof contactSampleSchema>;
