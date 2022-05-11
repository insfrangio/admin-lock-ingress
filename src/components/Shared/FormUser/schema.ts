import * as Yup from 'yup';

export const schema = Yup.object().shape({
  firstName: Yup.string()
    .min(2, 'Nombre muy corto.')
    .max(50, 'Nombre demasiado largo')
    .required('No puede estar vacio'),
  lastName: Yup.string()
    .min(3, 'Apellido muy corto.')
    .max(50, 'Apellido demasiado largo')
    .required('No puede estar vacio'),
  userName: Yup.string()
    .min(3, 'Apellido muy corto.')
    .max(50, 'Apellido demasiado largo')
    .required('No puede estar vacio'),
  password: Yup.string()
    .min(3, 'Apellido muy corto.')
    .required('No puede estar vacio'),
  documentNumber: Yup.number()
    .typeError('Debe ser de tipo numerico')
    .nullable(true)
    .positive('Documento invalido')
    .integer('Documento invalido')
    .required('No puede estar vacio'),
  phoneNumber: Yup.number()
    .nullable(true)
    .positive('Numero invalido')
    .integer('Numero invalido')
    .min(12, 'Numero muy corto')
    .required('No puede estar vacio'),
  department: Yup.string()
    .min(2, 'Departamento muy corto.')
    .max(50, 'Departamento demasiado largo')
    .required('No puede estar vacio')
});
