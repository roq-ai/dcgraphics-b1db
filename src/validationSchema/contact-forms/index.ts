import * as yup from 'yup';

export const contactFormValidationSchema = yup.object().shape({
  message: yup.string().required(),
  organization_id: yup.string().nullable(),
  user_id: yup.string().nullable(),
});
