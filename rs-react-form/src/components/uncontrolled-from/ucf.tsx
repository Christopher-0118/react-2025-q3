import * as yup from 'yup';
import React from 'react';
import { formSchema } from '@/forms/schema';
import { type FormInputs } from '@/store/type';
import fileToBase64 from '@/forms/img';
import { useAppDispatch } from '@/hooks/useFormDispatch';
import { addForm } from '@/store/form-slice';

const UncontrolledForm = ({ onSuccess }: { onSuccess: () => void }) => {
  const formRef = React.useRef<HTMLFormElement>(null);
  const [errors, setErrors] = React.useState<Record<string, string>>({});
  const dispatch = useAppDispatch();
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrors({});

    if (!formRef.current) return;

    const fd = new FormData(formRef.current);
    const raw = {
      name: String(fd.get('name') ?? ''),
      age: Number(fd.get('age') ?? 0),
      email: String(fd.get('email') ?? ''),
      password: String(fd.get('password') ?? ''),
      confirmPassword: String(fd.get('confirmPassword') ?? ''),
      gender: fd.get('gender') as 'male' | 'female' | 'other',
      acceptTnC: fd.get('term') === 'on',
      country: String(fd.get('country') ?? ''),
    };

    let picture: string | undefined;
    const file = fd.get('picture');
    if (file instanceof File && file.size) {
      try {
        picture = await fileToBase64(file);
      } catch (err) {
        if (err instanceof Error) {
          setErrors((prev) => ({
            ...prev,
            picture: err.message || 'File error',
          }));
        }
        return;
      }
    }

    try {
      const validated: FormInputs = await formSchema.validate(
        { ...raw, picture },
        { abortEarly: false }
      );
      dispatch(addForm({ source: 'UCF', data: validated }));
      onSuccess();
    } catch (err) {
      const fieldErrors: Record<string, string> = {};

      if (err instanceof yup.ValidationError) {
        if (err.inner && err.inner.length) {
          for (const e of err.inner) {
            if (e.path && !(e.path in fieldErrors))
              fieldErrors[e.path] = e.message;
          }
        } else if (err.path) {
          fieldErrors[err.path] = err.message;
        }
      } else {
        console.error(err);
      }
      setErrors(fieldErrors);
    }
  };
  return (
    <>
      <h4>Uncontrolled Form</h4>
      <form ref={formRef} onSubmit={handleSubmit} noValidate>
        <div className="field">
          <label htmlFor="name">Name</label>
          <input id="name" name="name" data-autofocus />
          <div className="err">{errors.name}</div>
        </div>

        <div className="field">
          <label htmlFor="age">Age</label>
          <input id="age" name="age" type="number" />
          <div className="err">{errors.age}</div>
        </div>

        <div className="field">
          <label htmlFor="email">Email</label>
          <input id="email" name="email" type="email" />
          <div className="err">{errors.email}</div>
        </div>

        <div className="field">
          <label htmlFor="password">Password</label>
          <input id="password" name="password" type="password" />
          <div className="err">{errors.password}</div>
        </div>

        <div className="field">
          <label htmlFor="confirmPassword">Confirm password</label>
          <input id="confirmPassword" name="confirmPassword" type="password" />
          <div className="err">{errors.confirmPassword}</div>
        </div>

        <fieldset className="field">
          <legend>Gender</legend>
          <label>
            <input type="radio" name="gender" value="male" /> Male
          </label>
          <label>
            <input type="radio" name="gender" value="female" /> Female
          </label>
          <label>
            <input type="radio" name="gender" value="other" /> Other
          </label>
          <div className="err">{errors.gender}</div>
        </fieldset>

        <div className="field">
          <label htmlFor="country">Country</label>
          <input id="country" name="country" placeholder="Type country..." />
          <div className="err">{errors.country}</div>
        </div>

        <div className="field">
          <label>
            <input type="checkbox" name="term" /> I accept Terms & Conditions
          </label>
          <div className="err">{errors.acceptTnC}</div>
        </div>

        <div className="field">
          <label htmlFor="picture">Picture (png/jpeg)</label>
          <input
            id="picture"
            name="picture"
            type="file"
            accept="image/png,image/jpeg"
          />
          <div className="err">{errors.picture}</div>
        </div>

        <button type="submit">Submit</button>
      </form>
    </>
  );
};

export default UncontrolledForm;
