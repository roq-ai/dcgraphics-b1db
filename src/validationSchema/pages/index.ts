import * as yup from 'yup';

export const pageValidationSchema = yup.object().shape({
  content: yup.string().required(),
  organization_id: yup.string().nullable(),
});
