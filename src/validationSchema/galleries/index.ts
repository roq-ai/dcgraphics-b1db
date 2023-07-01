import * as yup from 'yup';

export const galleryValidationSchema = yup.object().shape({
  image: yup.string().required(),
  organization_id: yup.string().nullable(),
});
