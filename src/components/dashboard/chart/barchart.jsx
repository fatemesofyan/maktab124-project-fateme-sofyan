import { useEffect, useState } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import Loading from '@/components/loading/loading';
import { fetchCategories, fetchProducts } from '@/services/admin/dashboard';

// ثبت کامپوننت‌های مورد نیاز چارت
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function DashboardBar() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getData = async () => {
      try {
        const [categoriesData, productsData] = await Promise.all([
          fetchCategories(),
                    fetchProducts(),
        ]);

        const categoryCounts = categoriesData.data.categories.map((category) => {
          const count = productsData.data.products.filter(
            (product) => product.category._id === category._id
          ).length;

          return { name: category.name, count };
        });

        setCategories(categoryCounts);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    getData();
  }, []);

  if (loading) return <Loading/>;
  if (error) return <p>خطا: {error}</p>;

  const chartData = {
    labels: categories.map((cat) => cat.name),
    datasets: [
      {
        label: 'تعداد محصولات',
        data: categories.map((cat) => cat.count),
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF'],
      },
    ],
  };

  const chartOptions = {
    plugins: {
      legend: {
        position: 'top',
        labels: {
          usePointStyle: true,
          boxWidth: 12,
          font: {
            size: 12,
          },
        },
      },
    },
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        stacked: true,
      },
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div style={{ paddingTop: '20px' }}>
      <h1>توزیع محصولات بر اساس دسته‌بندی</h1>

      <div style={{ marginTop: '40px', width: '400px', height: '300px' }}>
        <Bar data={chartData} options={chartOptions} />
      </div>
    </div>
  );
}
