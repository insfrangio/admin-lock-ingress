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
  documentNumber: Yup.number()
    .nullable(true)
    .positive('Documento invalido')
    .integer('Documento invalido')
    // .min(8, 'Documento muy corto')
    // .max(10, 'Numero muy largo')
    .required('No puede estar vacio'),
  phoneNumber: Yup.number()
    .nullable(true)
    .positive('Numero invalido')
    .integer('Numero invalido')
    .min(9, 'Numero muy corto')
    // .max(10, 'Numero muy largo')
    .required('No puede estar vacio'),
  department: Yup.string()
    .min(2, 'Departamento muy corto.')
    .max(50, 'Departamento demasiado largo')
    .required('No puede estar vacio')
});
