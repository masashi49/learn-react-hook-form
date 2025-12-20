import { TextField } from '@mui/material';
import { Control, FieldValues, Path, useController } from 'react-hook-form';

type RHFTextFieldProps<T extends FieldValues> = {
  name: Path<T>;
  control: Control<T>;
  label: string;
  multiline?: boolean;
  rows?: number;
};

export function RHFTextField<T extends FieldValues>({
  name,
  control,
  label,
  multiline,
  rows,
}: RHFTextFieldProps<T>) {
  const { field, fieldState } = useController({
    name,
    control,
  });

  return (
    <>
      <TextField
        {...field}
        label={label}
        multiline={multiline}
        rows={rows}
        fullWidth
        margin="normal"
        error={!!fieldState.error}
      />
      <p className="text-red-500">{fieldState.error?.message}</p>
    </>
  );
}
