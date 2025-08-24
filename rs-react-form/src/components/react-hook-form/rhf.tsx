import fileToBase64 from '@/forms/img';
import { formSchema, type FormValues, type SchemaValues } from '@/forms/schema';
import { useAppDispatch } from '@/hooks/useFormDispatch';
import { addForm } from '@/store/form-slice';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';

export function RhfForm({ onSuccess }: { onSuccess: () => void }) {
  const dispatch = useAppDispatch();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isValid },
  } = useForm<FormValues>({
    resolver: yupResolver<FormValues, any, TFieldValues>(formSchema),
    mode: 'onChange',
    defaultValues: {
      name: '',
      age: 0,
      email: '',
      password: '',
      confirmPassword: '',
      gender: 'other',
      acceptTnC: false,
      country: '',
      picture: undefined,
    } satisfies FormValues,
  });

  const onFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (!f) return;
    try {
      const b64 = await fileToBase64(f);
      setValue('picture', b64, { shouldValidate: true });
    } catch (err) {
      if (err instanceof Error) alert(err.message);
    }
  };

  const onValid = (values: FormValues) => {
    dispatch(addForm({ source: 'RHF', data: values }));
    onSuccess();
  };

  return (
    <>
      <h4>React Hook Form</h4>
      <form onSubmit={handleSubmit(onValid)} noValidate>
        <div className="field">
          <label htmlFor="name">Name</label>
          <input id="name" {...register('name')} data-autofocus />
          <div className="err">{errors.name?.message}</div>
        </div>

        <div className="field">
          <label htmlFor="age">Age</label>
          <input id="age" type="number" {...register('age')} />
          <div className="err">{errors.age?.message}</div>
        </div>

        <div className="field">
          <label htmlFor="email">Email</label>
          <input id="email" type="email" {...register('email')} />
          <div className="err">{errors.email?.message}</div>
        </div>

        <div className="field">
          <label htmlFor="password">Password</label>
          <input id="password" type="password" {...register('password')} />
          <div className="err">{errors.password?.message}</div>
        </div>

        <div className="field">
          <label htmlFor="confirmPassword">Confirm password</label>
          <input
            id="confirmPassword"
            type="password"
            {...register('confirmPassword')}
          />
          <div className="err">{errors.confirmPassword?.message}</div>
        </div>

        <fieldset className="field">
          <legend>Gender</legend>
          <label>
            <input type="radio" value="male" {...register('gender')} /> Male
          </label>
          <label>
            <input type="radio" value="female" {...register('gender')} /> Female
          </label>
          <label>
            <input type="radio" value="other" {...register('gender')} /> Other
          </label>
          <div className="err">{errors.gender?.message}</div>
        </fieldset>

        <div className="field">
          <label htmlFor="country">Country</label>
          <input
            id="country"
            {...register('country')}
            placeholder="Type country..."
          />
          <div className="err">{errors.country?.message}</div>
        </div>

        <div className="field">
          <label>
            <input type="checkbox" {...register('acceptTnC')} /> I accept T&C
          </label>
          <div className="err">{errors.acceptTnC?.message}</div>
        </div>

        <div className="field">
          <label htmlFor="picture">Picture (png/jpeg)</label>
          <input
            id="picture"
            type="file"
            accept="image/png,image/jpeg"
            onChange={onFile}
          />
        </div>

        <button type="submit" disabled={!isValid}>
          Submit
        </button>
      </form>
    </>
  );
}
