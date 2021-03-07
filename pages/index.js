import {
  Box,
  Container,
  VStack,
  Heading,
  CircularProgress,
} from '@chakra-ui/react';
import useSWR from 'swr';
import dynamic from 'next/dynamic';
const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });
import dayjs from 'dayjs';
import { RiEmotionSadLine } from 'react-icons/ri';

const fetcher = (...args) => fetch(...args).then(res => res.json());

export default function Home() {
  const url = `https://api.waqi.info/feed/bangkok/?token=${process.env.AQI_TOKEN}`;

  const { data, error } = useSWR(url, fetcher);

  if (error) return <div>failed to load</div>;
  if (!data)
    return (
      <Container maxW='xl' centerContent mt={6}>
        <CircularProgress isIndeterminate color='gray.300' />
      </Container>
    );

  const dataAQI = {
    series: [
      {
        name: 'High - 2021',
        data: data.data.forecast.daily.pm25.map(item => item.max),
      },
      {
        name: 'Low - 2021',
        data: data.data.forecast.daily.pm25.map(item => item.min),
      },
    ],
    options: {
      chart: {
        background: '#fff',
        height: 350,
        type: 'line',
        dropShadow: {
          color: '#000',
          top: 18,
          left: 7,
          blur: 10,
          opacity: 0.2,
        },
        toolbar: {
          show: false,
        },
      },
      colors: ['#ff3d3d', '#33bbff'],
      dataLabels: {
        enabled: true,
      },
      stroke: {
        curve: 'smooth',
      },
      grid: {
        borderColor: '#e7e7e7',
        row: {
          colors: ['#f3f3f3', 'transparent'],
          opacity: 0.5,
        },
      },
      markers: {
        size: 1,
      },
      xaxis: {
        categories: data.data.forecast.daily.pm25.map(item =>
          dayjs(item.day).format('dddd')
        ),
        title: {
          text: 'Days',
        },
      },
      yaxis: {
        title: {
          text: 'PM2.5',
        },
        min: 15,
        max: 300,
      },
      legend: {
        position: 'top',
        horizontalAlign: 'right',
        floating: true,
        offsetY: -25,
        offsetX: -5,
      },
    },
  };

  return (
    <Container maxW='6xl' centerContent mt={6}>
      <Box
        padding='4'
        bg='gray.100'
        maxW={[
          'auto', // 0-30em
          'auto', // 30em-48em
          'auto', // 48em-62em
          '1000px', // 62em+
        ]}
        width={[
          '100%', // 992px upwards
          '100%', // 768px upwards
          '85%', // 480px upwards
          '100%', // base
        ]}
        backgroundColor='teal'
      >
        <VStack maxW='6xl'>
          <Heading color='white'>How bad is it? 🤔</Heading>
          <Heading color='white'>{data?.data?.city.name} </Heading>
          <Heading color='white'>{data?.data.iaqi.pm25.v}</Heading>{' '}
          <RiEmotionSadLine size='50px' color='white' />
        </VStack>
        <Chart {...dataAQI} type='line' height={550} />
      </Box>
    </Container>
  );
}
