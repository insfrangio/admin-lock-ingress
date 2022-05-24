import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title
} from 'chart.js';
import { Doughnut, Line } from 'react-chartjs-2';
import { GET_USERS } from '@/queries/user';
import { useQuery } from '@apollo/client';
import { Typography } from 'antd';

import * as S from './style';

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,

  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const Chart = () => {
  const { loading, data: dataUsers } = useQuery(GET_USERS, {
    fetchPolicy: 'network-only'
  });

  const authTypeAdmin = dataUsers?.getUsers.filter(
    ({ authType }: any) => authType === 'Admin'
  ).length;
  const authTypeUser = dataUsers?.getUsers.filter(
    ({ authType }: any) => authType === 'User'
  ).length;
  const authTypeInvited = dataUsers?.getUsers.filter(
    ({ authType }: any) => authType === 'Invited'
  ).length;

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const
      },
      title: {
        display: true,
        text: 'Cantidad de veces abierta por mes'
      }
    }
  };

  const dataAuthType = {
    labels: ['Administrador', 'Usuario', 'Invitado'],
    datasets: [
      {
        data: [authTypeAdmin, authTypeUser, authTypeInvited],
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)'
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)'
        ],
        borderWidth: 1
      }
    ]
  };

  const labels = [
    'Enero',
    'Febrero',
    'Marzo',
    'Abril',
    'Mayo',
    'Junio',
    'Julio',
    'Agosto',
    'Septiempre',
    'Octubre',
    'Noviembre',
    'Diciembre'
  ];

  const dataOpen = {
    labels,
    datasets: [
      {
        label: 'Puerta N1',
        data: [2, 15, 3, 8, 10],
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)'
      }
    ]
  };

  return (
    <S.Wrapper>
      <S.GroupDoughnut>
        <Typography.Paragraph>Registro por privilegio</Typography.Paragraph>
        <Doughnut data={dataAuthType} />
      </S.GroupDoughnut>
      <S.GroupLine>
        <Line options={options} data={dataOpen} />
      </S.GroupLine>
    </S.Wrapper>
  );
};

export default Chart;
