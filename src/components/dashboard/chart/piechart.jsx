import { useEffect, useState } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import { fetchCategories, fetchProducts } from '@/services/admin/dashboard';
import Loading from '@/components/loading/loading';

ChartJS.register(ArcElement, Tooltip, Legend);

export default function DashboardPie() {
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
          const productCount = productsData.data.products.filter(
            (product) => product.category._id === category._id
          ).length;
          return {
            name: category.name,
            count: productCount,
          };
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
    labels: categories.map((c) => c.name),
    datasets: [
      {
        label: 'تعداد محصولات به تفکیک دسته‌بندی',
        data: categories.map((c) => c.count),
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF'],
      },
    ],
  };

  const chartOptions = {
    plugins: {
      legend: {
        position: 'right',
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
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>نمودار محصولات</h1>
      <div style={{ marginTop: '100px', width: '400px', height: '300px' }}>
        <Pie data={chartData} options={chartOptions} />
      </div>
    </div>
  );
}
