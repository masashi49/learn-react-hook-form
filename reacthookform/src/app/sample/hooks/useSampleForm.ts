import { useForm, useWatch, useFormState } from 'react-hook-form';
import {
  contactSampleSchema,
  ContactSampleFormValues,
} from '../../../zod/zodSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';

export function useSampleForm() {
  // React Hook Formの初期化
  const [submitError, setSubmitError] = useState<string | null>(null);

  const {
    handleSubmit,
    control,
    reset,
    resetField,
    // 初期値の型を指定
  } = useForm<ContactSampleFormValues>({
    // バリテーションスキーマの適用
    resolver: zodResolver(contactSampleSchema),
    shouldUnregister: true,
    defaultValues: {
      // 初期値を入力
      name: '',
      email: '',
      message: '',
      select: undefined,
      radio: 'second',
    },
  });
  const { errors, isSubmitting, isSubmitSuccessful } = useFormState({
    control,
  });

  const selected = useWatch({
    control,
    name: 'select',
  });

  // 送信処理
  const onSubmit = handleSubmit(async (data: ContactSampleFormValues) => {
    console.log('フォームデータ:', data);
    console.log('選択された値:', selected);

    try {
      // API呼び出し処理...
      console.log('送信成功');
      reset(); // フォームリセット
    } catch (error) {
      setSubmitError('error');
    }
  });

  return {
    onSubmit,
    isSubmitting,
    isSubmitSuccessful,
    submitError,
    resetField,
    control,
    errors,
    selected,
    reset,
  };
}
