import { useForm, useWatch } from 'react-hook-form';
import {
  contactSampleSchema,
  ContactSampleFormValues,
} from '../../../zod/zodSchema';
import { zodResolver } from '@hookform/resolvers/zod';

export function useSampleForm() {
  // React Hook Formの初期化
  const {
    handleSubmit,
    control,
    formState: { errors },
    reset,
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

  return {
    handleSubmit,
    control,
    errors,
    selected,
    reset,
  };
}
