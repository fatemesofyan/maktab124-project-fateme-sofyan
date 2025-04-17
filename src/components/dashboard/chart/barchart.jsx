import { useEffect, useState } from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';

// ثبت المان‌های مورد نیاز Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export default function DashboardBar() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch categories and products data
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch categories
        const categoriesResponse = await fetch('http://localhost:8000/api/categories');
        if (!categoriesResponse.ok) {
          throw new Error('Failed to fetch categories');
        }
        const categoriesData = await categoriesResponse.json();

        // Fetch products
        const productsResponse = await fetch('http://localhost:8000/api/products?page=1&limit=100');
        if (!productsResponse.ok) {
          throw new Error('Failed to fetch products');
        }
        const productsData = await productsResponse.json();

        // Process data
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

    fetchData();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  // Prepare data for the bar chart
  const chartData = {
    labels: categories.map((category) => category.name),
    datasets: [
      {
        label: 'Product Counts by Category',
        data: categories.map((category) => category.count),
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF'],
      },
    ],
  };

  // Chart options to customize the bar chart
  const chartOptions = {
    plugins: {
      legend: {
        position: 'top', // Position the legend at the top
        labels: {
          usePointStyle: true,
          boxWidth: 12, // Width of the color box
          font: {
            size: 12, // Font size
          },
        },
      },
    },
    responsive: true,
    maintainAspectRatio: false, // Allow the chart to be responsive without maintaining aspect ratio
    scales: {
      x: {
        stacked: true, // For horizontal bars
      },
      y: {
        beginAtZero: true, // Start y-axis at zero
      },
    },
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Product Distribution by Category</h1>

      {/* Bar Chart */}
      <div style={{ marginTop: '40px', width: '800px', height: '400px' }}> {/* Adjust chart size */}
        <Bar data={chartData} options={chartOptions} />
      </div>
    </div>
  );
}